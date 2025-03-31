import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import MP4Box from "mp4box";
import css from "./VideoFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import ModalContentPanelEditIcon from "../../../../../shared/icons/ModalContentPanelEdit.icon";
import ModalContentPanelVolumeIcon from "../../../../../shared/icons/ModalContentPanelVolume.icon";
import ModalContentPanelVideoPlayIcon from "../../../../../shared/icons/ModalContentPanelVideoPlay.icon";
import ModalContentPanelScissorsIcon from "../../../../../shared/icons/ModalContentPanelScissors.icon";
import VideoPlayIcon from "../../../../../shared/icons/VideoPlay.icon";

declare global {
    interface HTMLVideoElement {
        captureStream(): MediaStream;
    }
    class MediaStreamTrackProcessor {
        constructor(options: { track: MediaStreamTrack });
        readonly readable: ReadableStream<VideoFrame>;
    }
}

interface VideoModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt: string;
    isLoading?: boolean;
}

interface EncodedSample {
    data: Uint8Array;
    duration: number;
    timestamp: number;
    is_sync: boolean;
}

const formatMapping: Record<string, { codec: string; mimeType: string }> = {
    mp4: { codec: "avc1.42001f", mimeType: "video/mp4" },
    webm: { codec: "avc1.42001f", mimeType: "video/mp4" },
};

function getUint32BE(data: Uint8Array, offset: number): number {
    return (data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3];
}

function validateVideoParameters(width: number, height: number): void {
    if (width % 2 !== 0 || height % 2 !== 0) {
        throw new Error("Video dimensions must be even");
    }
    if (width > 4096 || height > 2160) {
        throw new Error("Maximum resolution is 4096x2160");
    }
}

function isAnnexB(data: Uint8Array): boolean {
    return data.length >= 4 && data[0] === 0x00 && data[1] === 0x00 && data[2] === 0x00 && data[3] === 0x01;
}

function parseAvcC(config: Uint8Array): { sps: Uint8Array | null; pps: Uint8Array | null } {
    let offset = 0;
    if (config.length < 7) return { sps: null, pps: null };
    offset += 5; // Skip version, profile, compatibility, level, reserved
    const numSPS = config[offset] & 0x1F;
    offset += 1;

    let sps: Uint8Array | null = null;
    for (let i = 0; i < numSPS; i++) {
        if (offset + 2 > config.length) break;
        const spsLength = (config[offset] << 8) | config[offset + 1];
        offset += 2;
        if (offset + spsLength > config.length) break;
        sps = config.subarray(offset, offset + spsLength);
        offset += spsLength;
    }

    if (offset >= config.length) return { sps, pps: null };

    const numPPS = config[offset];
    offset += 1;

    let pps: Uint8Array | null = null;
    for (let i = 0; i < numPPS; i++) {
        if (offset + 2 > config.length) break;
        const ppsLength = (config[offset] << 8) | config[offset + 1];
        offset += 2;
        if (offset + ppsLength > config.length) break;
        pps = config.subarray(offset, offset + ppsLength);
        offset += ppsLength;
    }

    return { sps, pps };
}

function extractSpsPps(samples: EncodedSample[], metadata?: VideoDecoderConfig): { sps: Uint8Array | null; pps: Uint8Array | null } {
    if (metadata?.description) {
        try {
            const bufferSource = metadata.description;
            if (!bufferSource) return { sps: null, pps: null };
            let buffer: ArrayBuffer;
            if (bufferSource instanceof ArrayBuffer || bufferSource instanceof SharedArrayBuffer) {
                buffer = bufferSource;
            } else if ('buffer' in bufferSource) {
                buffer = bufferSource.buffer;
            } else {
                throw new Error('Unsupported bufferSource type');
            }
            const config = new Uint8Array(buffer);
            const { sps, pps } = parseAvcC(config);
            if (sps && pps) return { sps, pps };
        } catch (e) {
            console.log("[EXTRACT SPS/PPS] Error parsing metadata:", e);
        }
    }

    for (const sample of samples.filter(s => s.is_sync)) {
        const data = sample.data;
        let offset = 0;
        while (offset + 4 < data.length) {
            const size = getUint32BE(data, offset);
            if (size <= 0 || offset + 4 + size > data.length) break;
            const nalType = data[offset + 4] & 0x1F;
            if (nalType === 7) {
                const sps = data.subarray(offset + 4, offset + 4 + size);
                const pps = findPps(data, offset + 4 + size);
                if (sps && pps) return { sps, pps };
            }
            offset += 4 + size;
        }
    }
    return { sps: null, pps: null };
}

function findPps(data: Uint8Array, start: number): Uint8Array | null {
    let offset = start;
    while (offset + 4 < data.length) {
        const size = getUint32BE(data, offset);
        if (size <= 0 || offset + 4 + size > data.length) break;
        const nalType = data[offset + 4] & 0x1F;
        if (nalType === 8) {
            return data.subarray(offset + 4, offset + 4 + size);
        }
        offset += 4 + size;
    }
    return null;
}

function convertAnnexBToAvcC(data: Uint8Array, sps?: Uint8Array, pps?: Uint8Array): Uint8Array {
    const declaredSize = getUint32BE(data, 0);
    if (!isAnnexB(data) && declaredSize > 0 && declaredSize <= data.length - 4) {
        return data;
    }

    const result: number[] = [];

    if (sps && pps) {
        result.push(
            (sps.length >> 24) & 0xFF,
            (sps.length >> 16) & 0xFF,
            (sps.length >> 8) & 0xFF,
            sps.length & 0xFF
        );
        result.push(...sps);
        result.push(
            (pps.length >> 24) & 0xFF,
            (pps.length >> 16) & 0xFF,
            (pps.length >> 8) & 0xFF,
            pps.length & 0xFF
        );
        result.push(...pps);
    }

    let i = 0;
    while (i < data.length) {
        if (i + 3 < data.length && data[i] === 0x00 && data[i + 1] === 0x00 && data[i + 2] === 0x00 && data[i + 3] === 0x01) {
            const start = i + 4;
            let end = start;
            while (end < data.length - 3) {
                if (data[end] === 0x00 && data[end + 1] === 0x00 && data[end + 2] === 0x00 && data[end + 3] === 0x01) {
                    break;
                }
                end++;
            }
            const nalUnit = data.subarray(start, end);
            const size = nalUnit.length;
            result.push(
                (size >> 24) & 0xFF,
                (size >> 16) & 0xFF,
                (size >> 8) & 0xFF,
                size & 0xFF
            );
            result.push(...Array.from(nalUnit));
            i = end;
        } else {
            i++;
        }
    }
    return new Uint8Array(result);
}

function createAvcCBox(sps: Uint8Array, pps: Uint8Array): Uint8Array {
    return new Uint8Array([
        0x01,          // Version
        sps[1],        // Profile
        sps[2],        // Profile compatibility
        sps[3],        // Level
        0xFC | 3,      // LengthSizeMinusOne (4 bytes)
        0xE0 | 1,      // Num of SPS (1)
        (sps.length >> 8) & 0xFF,
        sps.length & 0xFF,
        ...sps,
        1,             // Num of PPS (1)
        (pps.length >> 8) & 0xFF,
        pps.length & 0xFF,
        ...pps
    ]);
}

function validateSample(data: Uint8Array): boolean {
    let offset = 0;
    while (offset < data.length) {
        if (offset + 4 > data.length) return false;
        const size = getUint32BE(data, offset);
        if (size <= 0) return false;
        const end = offset + 4 + size;
        if (end > data.length) return false;
        offset = end;
    }
    return true;
}

async function getVideoMetadata(videoUrl: string): Promise<{ width: number; height: number; frameRate: number; duration: number }> {
    return new Promise((resolve, reject) => {
        const tempVideo = document.createElement("video");
        tempVideo.src = videoUrl;
        tempVideo.muted = true;
        tempVideo.preload = "metadata";
        tempVideo.style.display = "none";
        document.body.appendChild(tempVideo);

        tempVideo.addEventListener("loadedmetadata", () => {
            const width = tempVideo.videoWidth;
            const height = tempVideo.videoHeight;
            const duration = tempVideo.duration;

            const stream = tempVideo.captureStream();
            const [videoTrack] = stream.getVideoTracks();
            const settings = videoTrack?.getSettings();
            const frameRate = settings?.frameRate || 30;
            videoTrack?.stop();

            document.body.removeChild(tempVideo);
            console.log("[METADATA] Extracted: width=", width, "height=", height, "frameRate=", frameRate, "duration=", duration);
            resolve({ width, height, frameRate, duration });
        });

        tempVideo.addEventListener("error", () => {
            document.body.removeChild(tempVideo);
            reject(new Error("Failed to load video metadata"));
        });
    });
}

async function muxWithMP4Box(samples: EncodedSample[], encoderConfig: VideoEncoderConfig, metadata?: VideoDecoderConfig): Promise<Blob> {
    return new Promise((resolve, reject) => {
        if (samples.length === 0) {
            console.log("[MUX] No samples provided for multiplexing");
            reject(new Error("No samples to multiplex"));
            return;
        }
        console.log("[MUX] Starting multiplexing with", samples.length, "samples");

        const mp4boxFile = MP4Box.createFile();

        const { sps, pps } = extractSpsPps(samples, metadata);
        if (!sps || !pps) {
            console.log("[MUX] Failed to extract SPS or PPS");
            reject(new Error("Failed to extract SPS or PPS for avcC creation"));
            return;
        }

        const avcProfile = sps[1].toString(16).padStart(2, '0');
        const avcLevel = sps[3].toString(16).padStart(2, '0');
        const avcCArray = createAvcCBox(sps, pps);
        const avcCBuffer = avcCArray.buffer.slice(
            avcCArray.byteOffset,
            avcCArray.byteOffset + avcCArray.byteLength
        );

        const timescale = 90000;
        const totalDurationMicroseconds = samples[samples.length - 1].timestamp + samples[samples.length - 1].duration - samples[0].timestamp;
        const totalDurationTimescale = Math.round((totalDurationMicroseconds / 1000000) * timescale);
        console.log("[MUX] Total duration (microseconds):", totalDurationMicroseconds, "timescale:", totalDurationTimescale);

        const trackOptions = {
            timescale: timescale,
            width: encoderConfig.width,
            height: encoderConfig.height,
            codec: `avc1.${avcProfile}00${avcLevel}`,
            duration: totalDurationTimescale,
            avcDecoderConfigRecord: avcCBuffer
        };

        let trackId;
        try {
            trackId = mp4boxFile.addTrack(trackOptions);
            console.log("[MUX] Track added with ID:", trackId);
        } catch (e) {
            console.log("[MUX] Error adding track:", e);
            reject(new Error("Track creation error: " + (e.message || "unknown error")));
            return;
        }

        mp4boxFile.onError = (e) => {
            console.log("[MUX] MP4Box error:", e);
            reject(new Error(`MP4Box error: ${e}`));
        };

        samples.forEach((sample, i) => {
            if (!validateSample(sample.data)) {
                console.log("[MUX] Invalid sample at index:", i);
                reject(new Error(`Invalid sample at index ${i}`));
                return;
            }
            const dts = Math.round((sample.timestamp / 1000000) * timescale);
            const duration = Math.round((sample.duration / 1000000) * timescale);
            console.log(`[MUX] Adding sample ${i}: dts=${dts}, duration=${duration}, is_sync=${sample.is_sync}, data length=${sample.data.length}`);
            mp4boxFile.addSample(trackId, sample.data, {
                duration: duration,
                dts: dts,
                cts: dts,
                is_sync: sample.is_sync,
            });
        });
        console.log("[MUX] All samples added");

        try {
            mp4boxFile.flush();
            console.log("[MUX] MP4Box flushed");
            const buffer = mp4boxFile.getBuffer();
            console.log("[MUX] Buffer retrieved, size:", buffer.byteLength);
            if (buffer.byteLength === 0) {
                throw new Error("Generated buffer is empty");
            }
            const blob = new Blob([buffer], { type: "video/mp4" });
            console.log("[MUX] Blob created, size:", blob.size);
            resolve(blob);
        } catch (e) {
            console.log("[MUX] Error during flush or buffer retrieval:", e);
            reject(new Error(`Completion error: ${e.message}`));
        }
    });
}

async function fallbackExtractFrames(startTime: number, endTime: number, videoUrl: string, frameRate: number): Promise<VideoFrame[]> {
    const frames: VideoFrame[] = [];
    const tempVideo = document.createElement("video");
    tempVideo.src = videoUrl;
    tempVideo.muted = true;
    tempVideo.playsInline = true;
    tempVideo.crossOrigin = "anonymous";
    tempVideo.style.display = "none";
    document.body.appendChild(tempVideo);

    return new Promise((resolve, reject) => {
        let baseTimestamp = 0;

        tempVideo.addEventListener("loadedmetadata", async () => {
            console.log("[EXTRACT] Metadata loaded, duration:", tempVideo.duration);
            tempVideo.currentTime = startTime;
            await new Promise<void>((res) => (tempVideo.onseeked = () => res()));
        });

        tempVideo.addEventListener("seeked", async () => {
            try {
                const stream = tempVideo.captureStream();
                const [videoTrack] = stream.getVideoTracks();
                if (!videoTrack) throw new Error("No video track");

                console.log("[EXTRACT] Using frame rate:", frameRate);

                const processor = new MediaStreamTrackProcessor({ track: videoTrack });
                const reader = processor.readable.getReader();
                baseTimestamp = startTime * 1e6;
                await tempVideo.play();

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    if (!value) continue;

                    const frameTime = (value.timestamp + baseTimestamp) / 1e6;
                    if (frameTime >= startTime && frameTime <= endTime) {
                        frames.push(value);
                    } else {
                        value.close();
                        if (frameTime > endTime) break;
                    }

                    if (tempVideo.currentTime > endTime) break;
                }

                reader.releaseLock();
                videoTrack.stop();
                tempVideo.pause();
                document.body.removeChild(tempVideo);
                console.log("[EXTRACT] Extraction completed, total frames:", frames.length);
                resolve(frames);
            } catch (e) {
                console.log("[EXTRACT] Error:", e);
                frames.forEach(frame => frame.close());
                document.body.removeChild(tempVideo);
                reject(e);
            }
        });

        tempVideo.addEventListener("error", () => {
            console.log("[EXTRACT] Video loading error");
            frames.forEach(frame => frame.close());
            document.body.removeChild(tempVideo);
            reject(new Error("Video loading error"));
        });
    });
}

const VideoFilePreviewModal: React.FC<VideoModalProps> = ({ url: initialUrl, onClose, fileName, fileExt }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const encoderRef = useRef<VideoEncoder | null>(null);
    const isProcessingRef = useRef(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDraggingProgress, setIsDraggingProgress] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null);
    const [scaledDimensions, setScaledDimensions] = useState<{ width: number; height: number } | null>(null);
    const [showSpeedPopup, setShowSpeedPopup] = useState(false);
    const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];

    const [isCutting, setIsCutting] = useState(false);
    const [cutStart, setCutStart] = useState<number | null>(null);
    const [cutEnd, setCutEnd] = useState<number | null>(null);
    const [isProcessingCut, setIsProcessingCut] = useState(false);
    const [cutProgress, setCutProgress] = useState<number>(0);
    const [cutStage, setCutStage] = useState<string>("");
    const [cutError, setCutError] = useState<string | null>(null);
    const [currentBlobUrl, setCurrentBlobUrl] = useState<string | null>(null);
    const [url, setUrl] = useState(initialUrl);

    useEffect(() => {
        console.log("VideoEncoder supported:", 'VideoEncoder' in window);
        return () => {
            if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
            if (encoderRef.current) {
                encoderRef.current.close();
                encoderRef.current = null;
            }
            console.log("[CLEANUP] Component unmounted, resources cleaned");
        };
    }, [currentBlobUrl]);

    const togglePlayPause = () => {
        if (!videoRef.current || isProcessingCut) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const { currentTime, duration } = videoRef.current;
        if (!isNaN(duration)) setProgress((currentTime / duration) * 100);
    };

    const updateVideoTime = (clientX: number) => {
        if (!videoRef.current || !progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(pos, 1));
        videoRef.current.currentTime = pos * videoRef.current.duration;
        setProgress(pos * 100);
    };

    const handleProgressMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !progressBarRef.current) return;
        if (isCutting) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const time = pos * videoRef.current.duration;
            if (cutStart === null || cutEnd === null) {
                setCutStart(0);
                setCutEnd(videoRef.current.duration);
            }
            if (time < cutStart!) {
                setCutStart(time);
            } else if (time > cutEnd!) {
                setCutEnd(time);
            } else {
                const diffStart = Math.abs(time - cutStart!);
                const diffEnd = Math.abs(time - cutEnd!);
                if (diffStart < diffEnd) setCutStart(time);
                else setCutEnd(time);
            }
            return;
        }
        setIsDraggingProgress(true);
        updateVideoTime(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: Event) => {
            if (!isDraggingProgress) return;
            updateVideoTime((e as unknown as MouseEvent).clientX);
        };
        const handleMouseUp = () => {
            if (isDraggingProgress) setIsDraggingProgress(false);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDraggingProgress]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleLoadedMetadata = () => {
            setVideoDimensions({ width: video.videoWidth, height: video.videoHeight });
            if (isCutting) {
                setCutStart(0);
                setCutEnd(video.duration);
            }
        };
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", () => setIsPlaying(false));
        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", () => setIsPlaying(false));
        };
    }, [isCutting]);

    useEffect(() => {
        if (videoDimensions) {
            const maxWidth = window.innerWidth * 0.5;
            const maxHeight = window.innerHeight * 0.7;
            const widthScale = maxWidth / videoDimensions.width;
            const heightScale = maxHeight / videoDimensions.height;
            const scale = Math.min(widthScale, heightScale, 1);
            setScaledDimensions({
                width: videoDimensions.width * scale,
                height: videoDimensions.height * scale,
            });
        }
    }, [videoDimensions]);

    const updatePlaybackRate = (rate: number) => {
        if (videoRef.current) videoRef.current.playbackRate = rate;
        setShowSpeedPopup(false);
    };

    const handleCutVideo = async () => {
        if (cutStart === null || cutEnd === null || cutEnd <= cutStart) {
            console.log("[CUT] Invalid cut times: cutStart=", cutStart, "cutEnd=", cutEnd);
            alert("Please set valid start and end times for cutting.");
            return;
        }

        let frames: VideoFrame[] = [];
        let encoder: VideoEncoder | null = null;

        isProcessingRef.current = true;
        setIsProcessingCut(true);
        setCutProgress(0);
        setCutError(null);
        setCutStage("Starting cut");
        console.log("[CUT] Starting cut from", cutStart, "to", cutEnd);

        try {
            // Получение метаданных видео
            setCutStage("Extracting metadata");
            const { width, height, frameRate, duration } = await getVideoMetadata(url);
            console.log("[CUT] Metadata extracted: width=", width, "height=", height, "frameRate=", frameRate, "duration=", duration);

            setCutStage("Extracting frames");
            console.log("[CUT] Calling fallbackExtractFrames with frameRate:", frameRate);
            frames = await fallbackExtractFrames(cutStart, cutEnd, url, frameRate);
            if (frames.length === 0) {
                console.log("[CUT] No frames extracted");
                throw new Error("No frames found in the selected range.");
            }
            console.log("[CUT] Frames extracted:", frames.length);
            validateVideoParameters(frames[0].codedWidth, frames[0].codedHeight);
            setCutProgress(30);

            const frameDuration = 1e6 / frameRate;
            console.log("[CUT] Calculated frame duration:", frameDuration);

            setCutStage("Encoding");
            const encodedSamplesOut: EncodedSample[] = [];
            let encoderMetadata: VideoDecoderConfig & { sps?: Uint8Array; pps?: Uint8Array } | undefined;

            const encoderConfig: VideoEncoderConfig = {
                codec: "avc1.42001f", // Используем кодек из formatMapping
                width: frames[0].codedWidth,
                height: frames[0].codedHeight,
                bitrate: 2_000_000,
                framerate: frameRate,
                latencyMode: "quality",
                hardwareAcceleration: "prefer-hardware",
                avc: { format: "avc" },
            };

            const support = await VideoEncoder.isConfigSupported(encoderConfig);
            console.log("[CUT] Encoder support:", support.supported);
            if (!support.supported) {
                throw new Error("H.264 encoding not supported");
            }

            await new Promise<void>((resolve, reject) => {
                encoder = new VideoEncoder({
                    output: (chunk, metadata) => {
                        if (metadata?.decoderConfig) {
                            const { sps, pps } = extractSpsPps([], metadata.decoderConfig);
                            encoderMetadata = { ...metadata.decoderConfig, sps, pps };
                            console.log("[ENCODE] Metadata received:", encoderMetadata);
                        }

                        const data = new Uint8Array(chunk.byteLength);
                        chunk.copyTo(data);
                        const convertedData = convertAnnexBToAvcC(data, encoderMetadata?.sps, encoderMetadata?.pps);

                        const frameIndex = encodedSamplesOut.length;
                        const timestamp = frameIndex === 0 ? 0 : encodedSamplesOut[frameIndex - 1].timestamp + encodedSamplesOut[frameIndex - 1].duration;
                        const duration = frames[frameIndex]?.duration || frameDuration;

                        encodedSamplesOut.push({
                            data: convertedData,
                            duration: duration,
                            timestamp: timestamp,
                            is_sync: chunk.type === "key",
                        });
                        console.log(`[ENCODE] Sample encoded ${frameIndex}: timestamp=${timestamp}, duration=${duration}, is_sync=${chunk.type === "key"}, data length=${convertedData.length}`);
                    },
                    error: (e) => {
                        console.log("[ENCODE] Encoder error:", e);
                        reject(e);
                    },
                });

                encoderRef.current = encoder;
                encoder.configure(encoderConfig);
                console.log("[ENCODE] Encoder configured:", encoderConfig);

                (async () => {
                    let processedFrames = 0;
                    try {
                        for (let i = 0; i < frames.length; i++) {
                            if (!isProcessingRef.current) {
                                console.log("[ENCODE] Encoding aborted");
                                throw new Error("Encoding aborted");
                            }
                            const frame = frames[i];
                            encoder.encode(frame);
                            frame.close();
                            processedFrames = i + 1;
                            console.log(`[ENCODE] Frame ${i} encoded, total processed: ${processedFrames}`);
                            setCutProgress(30 + Math.round((i / frames.length) * 70));
                            await new Promise((res) => setTimeout(res, 5));
                        }
                        await encoder.flush();
                        console.log("[ENCODE] Encoder flushed");
                    } catch (e) {
                        console.log("[ENCODE] Error during encoding loop:", e);
                        frames.slice(processedFrames).forEach(f => f.close());
                        throw e;
                    } finally {
                        if (encoder) {
                            encoder.close();
                            encoderRef.current = null;
                            console.log("[ENCODE] Encoder closed");
                        }
                    }
                    console.log("[ENCODE] Encoding completed, total samples:", encodedSamplesOut.length);
                    resolve();
                })();
            });

            setCutStage("Multiplexing");
            console.log("[CUT] Starting multiplexing with", encodedSamplesOut.length, "samples");
            const outputBlob = await muxWithMP4Box(encodedSamplesOut, encoderConfig, encoderMetadata);
            console.log("[CUT] Multiplexing completed, Blob size:", outputBlob.size);
            const fragmentUrl = URL.createObjectURL(outputBlob);
            if (currentBlobUrl) {
                URL.revokeObjectURL(currentBlobUrl);
            }
            setCurrentBlobUrl(fragmentUrl);
            setUrl(fragmentUrl);

            if (videoRef.current) {
                while (videoRef.current.firstChild) {
                    videoRef.current.removeChild(videoRef.current.firstChild);
                }
                const source = document.createElement("source");
                source.src = fragmentUrl;
                source.type = "video/mp4";
                videoRef.current.appendChild(source);
                await new Promise<void>((resolve) => {
                    videoRef.current!.onloadedmetadata = () => {
                        console.log("[CUT] Cut video metadata loaded");
                        resolve();
                    };
                    videoRef.current!.load();
                });
                videoRef.current.currentTime = 0;
                setProgress(0);
                try {
                    await videoRef.current.play();
                    setIsPlaying(true);
                    console.log("[CUT] Cut video playing");
                } catch (err) {
                    console.log("[CUT] Error playing cut video:", err);
                    setIsPlaying(false);
                }
            }

            setCutStage("Completed");
            setCutProgress(100);
            setIsCutting(false);
            setCutStart(null);
            setCutEnd(null);
            console.log("[CUT] Cutting completed successfully");
        } catch (error: any) {
            console.log("[CUT] Cutting error:", error);
            setCutError(error.message || "Unknown error");
            alert("An error occurred: " + (error.message || "Unknown error"));
            setTimeout(() => {
                cancelCutting();
                setCutError(null);
            }, 3000);
        } finally {
            frames.forEach(frame => frame.close());
            if (encoder) {
                encoderRef.current = null;
            }
            isProcessingRef.current = false;
            setIsProcessingCut(false);
            console.log("[CUT] Cleanup completed");
        }
    };

    const cancelCutting = () => {
        isProcessingRef.current = false;
        setIsCutting(false);
        setCutStart(null);
        setCutEnd(null);
        setCutProgress(0);
        setCutStage("");
        setCutError(null);
        console.log("[CUT] Cutting cancelled");
    };

    return createPortal(
        <FilePreviewModalOverlay
            onClose={onClose}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNameVideoContainer}
            modalContentClass={css.modalContentVideo}
        >
            <div
                className={css.videoWrapper}
                style={scaledDimensions ? { width: `${scaledDimensions.width}px`, height: `${scaledDimensions.height}px` } : {}}
            >
                <video className={css.modalVideo} ref={videoRef}>
                    <source src={currentBlobUrl || url} />
                    Your browser does not support video.
                </video>
                {isProcessingCut && (
                    <div className={css.processingOverlay}>
                        {cutError ? (
                            <span>Error: {cutError}</span>
                        ) : (
                            <span>{cutStage}... {cutProgress}%</span>
                        )}
                    </div>
                )}
                {!isProcessingCut && (
                    <button className={css.playPauseButton} onClick={togglePlayPause}>
                        {isPlaying ? <div></div> : <VideoPlayIcon />}
                    </button>
                )}
                <div ref={progressBarRef} className={css.progressBarContainer} onMouseDown={handleProgressMouseDown}>
                    <div className={css.progressBar} style={{ width: `${progress}%` }}>
                        <div className={css.progressBarHandle}></div>
                    </div>
                    {isCutting && videoRef.current && videoRef.current.duration && (
                        <>
                            {cutStart !== null && (
                                <div
                                    className={css.cutMarker}
                                    style={{ left: `${(cutStart / videoRef.current.duration) * 100}%` }}
                                />
                            )}
                            {cutEnd !== null && (
                                <div
                                    className={css.cutMarker}
                                    style={{ left: `${(cutEnd / videoRef.current.duration) * 100}%` }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className={css.modalContentEditPanel}>
                <div className={css.modalContentEditPanelItem} onClick={toggleMute}>
                    <ModalContentPanelVolumeIcon fill={isMuted ? "#B5B5B5" : "#3D3D3D"} />
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem} onClick={togglePlayPause}>
                    <ModalContentPanelVideoPlayIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div
                    className={css.modalContentEditPanelItem}
                    onClick={() => {
                        if (isCutting) cancelCutting();
                        else {
                            if (videoRef.current) {
                                setCutStart(0);
                                setCutEnd(videoRef.current.duration);
                            }
                            setIsCutting(true);
                        }
                    }}
                    title="Cut video"
                >
                    <ModalContentPanelScissorsIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem} onClick={() => setShowSpeedPopup(!showSpeedPopup)}>
                    <ModalContentPanelEditIcon fill="currentColor" />
                </div>
            </div>
            {showSpeedPopup && (
                <div className={css.speedPopup}>
                    {speedOptions.map((option) => (
                        <button key={option} onClick={() => updatePlaybackRate(option)}>
                            {option}x
                        </button>
                    ))}
                </div>
            )}
            {isCutting && (
                <div className={css.cutControls}>
                    <button
                        className={css.cutButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleCutVideo();
                        }}
                        disabled={isProcessingCut || cutStart === null || cutEnd === null}
                    >
                        {isProcessingCut ? "Processing..." : "Apply"}
                    </button>
                    <button
                        className={css.cutButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            cancelCutting();
                        }}
                        disabled={isProcessingCut}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default VideoFilePreviewModal;