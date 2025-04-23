import MP4Box from "mp4box";
declare global {
    interface HTMLVideoElement {
        captureStream(): MediaStream;
    }
}
interface EncodedSample {
    data: Uint8Array;
    duration: number;
    timestamp: number;
    is_sync: boolean;
}

interface VideoMetadata {
    width: number;
    height: number;
    frameRate: number;
    duration: number;
}

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
    offset += 5;
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
        0x01,
        sps[1],
        sps[2],
        sps[3],
        0xFC | 3,
        0xE0 | 1,
        (sps.length >> 8) & 0xFF,
        sps.length & 0xFF,
        ...sps,
        1,
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

async function getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
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

async function muxWithMP4Box(
    samples: EncodedSample[],
    encoderConfig: VideoEncoderConfig,
    metadata?: VideoDecoderConfig
): Promise<Blob> {
    const log = (msg: string) => console.log(`[MUX] ${msg}`);

    if (!samples?.length) {
        log("No samples provided for multiplexing");
        throw new Error("No samples to multiplex");
    }
    log(`Starting multiplexing with ${samples.length} samples`);

    const mp4boxFile = MP4Box.createFile();

    const { sps, pps } = extractSpsPps(samples, metadata);
    if (!sps || !pps) {
        log("Failed to extract SPS or PPS");
        throw new Error("Failed to extract SPS or PPS for avcC creation");
    }

    const avcProfile = sps[1].toString(16).padStart(2, "0");
    const avcLevel = sps[3].toString(16).padStart(2, "0");
    const avcCArray = createAvcCBox(sps, pps);
    const avcCBuffer = avcCArray.buffer.slice(
        avcCArray.byteOffset,
        avcCArray.byteOffset + avcCArray.byteLength
    );

    const timescale = 90000;
    const totalDurationMicroseconds =
        samples[samples.length - 1].timestamp +
        samples[samples.length - 1].duration -
        samples[0].timestamp;
    if (totalDurationMicroseconds < 0) {
        throw new Error("Invalid total duration: negative value");
    }
    const totalDurationTimescale = Math.round(
        (totalDurationMicroseconds / 1_000_000) * timescale
    );
    log(`Total duration (microseconds): ${totalDurationMicroseconds}, timescale: ${totalDurationTimescale}`);

    const trackOptions = {
        timescale,
        width: encoderConfig.width,
        height: encoderConfig.height,
        codec: `avc1.${avcProfile}00${avcLevel}`,
        duration: totalDurationTimescale,
        avcDecoderConfigRecord: avcCBuffer,
    };

    let trackId: number;
    try {
        trackId = mp4boxFile.addTrack(trackOptions);
        log(`Track added with ID: ${trackId}`);
    } catch (e) {
        log(`Error adding track: ${e instanceof Error ? e.message : String(e)}`);
        throw new Error(`Track creation error: ${e instanceof Error ? e.message : "unknown error"}`);
    }

    mp4boxFile.onError = (e: string) => {
        log(`MP4Box error: ${e}`);
        throw new Error(`MP4Box error: ${e}`);
    };

    let lastDts = -Infinity;
    for (let i = 0; i < samples.length; i++) {
        const sample = samples[i];
        if (!validateSample(sample.data)) {
            log(`Invalid sample at index: ${i}`);
            throw new Error(`Invalid sample at index ${i}`);
        }

        const dts = Math.round((sample.timestamp / 1_000_000) * timescale);
        const duration = Math.round((sample.duration / 1_000_000) * timescale);

        if (dts <= lastDts) {
            log(`Non-monotonic DTS at index ${i}: ${dts} <= ${lastDts}`);
            throw new Error(`Non-monotonic DTS at index ${i}`);
        }
        if (duration <= 0) {
            log(`Invalid duration at index ${i}: ${duration}`);
            throw new Error(`Invalid duration at index ${i}`);
        }

        lastDts = dts;
        log(`Adding sample ${i}: dts=${dts}, duration=${duration}, is_sync=${sample.is_sync}, data length=${sample.data.length}`);
        mp4boxFile.addSample(trackId, sample.data, {
            duration,
            dts,
            cts: dts,
            is_sync: sample.is_sync,
        });
    }
    log("All samples added");

    try {
        mp4boxFile.flush();
        log("MP4Box flushed");
        const buffer = mp4boxFile.getBuffer();
        log(`Buffer retrieved, size: ${buffer.byteLength}`);
        if (buffer.byteLength === 0) {
            throw new Error("Generated buffer is empty");
        }
        const blob = new Blob([buffer], { type: "video/mp4" });
        log(`Blob created, size: ${blob.size}`);
        return blob;
    } catch (e) {
        log(`Error during flush or buffer retrieval: ${e instanceof Error ? e.message : String(e)}`);
        throw new Error(`Completion error: ${e instanceof Error ? e.message : "unknown error"}`);
    }
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

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    return new Promise((resolve, reject) => {
        tempVideo.addEventListener("loadedmetadata", async () => {
            console.log("[EXTRACT] Metadata loaded, duration:", tempVideo.duration);
            canvas.width = tempVideo.videoWidth;
            canvas.height = tempVideo.videoHeight;

            const frameInterval = 1 / frameRate;
            let currentTime = startTime;
            let timestamp = 0;

            while (currentTime <= endTime) {
                tempVideo.currentTime = currentTime;
                await new Promise<void>((res) => (tempVideo.onseeked = () => res()));

                ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
                const frame = new VideoFrame(canvas, {
                    timestamp: timestamp * 1e6,
                    duration: frameInterval * 1e6,
                });

                frames.push(frame);
                console.log(`[EXTRACT] Frame added: timestamp=${frame.timestamp}, time=${currentTime}`);
                currentTime += frameInterval;
                timestamp += frameInterval;
            }

            document.body.removeChild(tempVideo);
            console.log("[EXTRACT] Extraction completed, total frames:", frames.length);
            resolve(frames);
        });

        tempVideo.addEventListener("error", () => {
            console.log("[EXTRACT] Video loading error");
            frames.forEach(frame => frame.close());
            document.body.removeChild(tempVideo);
            reject(new Error("Video loading error"));
        });
    });
}

// VideoCuttingService class
export class VideoCuttingService {
    private isProcessing: boolean = false;

    async cutVideo(
        url: string,
        cutStart: number,
        cutEnd: number,
        fileName: string,
        videoRef: React.RefObject<HTMLVideoElement>,
        onProgress: (progress: number, stage: string) => void,
        onError: (error: string) => void,
        onComplete: (newUrl: string) => void
    ): Promise<void> {
        if (cutEnd <= cutStart) {
            console.log("[CUT] Invalid cut times: cutStart=", cutStart, "cutEnd=", cutEnd);
            throw new Error("Invalid cut times: end must be greater than start");
        }

        let frames: VideoFrame[] = [];
        let encoder: VideoEncoder | null = null;

        this.isProcessing = true;
        onProgress(0, "Starting cut");
        console.log("[CUT] Starting cut from", cutStart, "to", cutEnd);

        try {
            onProgress(10, "Extracting metadata");
            const { width, height, frameRate, duration } = await getVideoMetadata(url);
            console.log("[CUT] Metadata extracted: width=", width, "height=", height, "frameRate=", frameRate, "duration=", duration);

            onProgress(20, "Extracting frames");
            console.log("[CUT] Calling fallbackExtractFrames with frameRate:", frameRate);
            frames = await fallbackExtractFrames(cutStart, cutEnd, url, frameRate);
            if (frames.length === 0) {
                console.log("[CUT] No frames extracted");
                throw new Error("No frames found in the selected range.");
            }
            console.log("[CUT] Frames extracted:", frames.length);
            validateVideoParameters(frames[0].codedWidth, frames[0].codedHeight);
            onProgress(30, "Frames extracted");

            const frameDuration = 1e6 / frameRate;
            console.log("[CUT] Calculated frame duration:", frameDuration);

            onProgress(40, "Encoding");
            const encodedSamplesOut: EncodedSample[] = [];
            let encoderMetadata: VideoDecoderConfig & { sps?: Uint8Array; pps?: Uint8Array } | undefined;

            const encoderConfig: VideoEncoderConfig = {
                codec: "avc1.42001f",
                width: frames[0].codedWidth,
                height: frames[0].codedHeight,
                bitrate: 5_000_000,
                framerate: frameRate,
                latencyMode: "quality",
                hardwareAcceleration: "no-preference",
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

                encoder.configure(encoderConfig);
                console.log("[ENCODE] Encoder configured:", encoderConfig);

                (async () => {
                    let processedFrames = 0;
                    try {
                        for (let i = 0; i < frames.length; i++) {
                            if (!this.isProcessing) {
                                console.log("[ENCODE] Encoding aborted");
                                throw new Error("Encoding aborted");
                            }
                            const frame = frames[i];
                            const isKeyFrame = i % 30 === 0;
                            console.log(`[ENCODE] Encoding frame ${i}: timestamp=${frame.timestamp}, isKeyFrame=${isKeyFrame}`);
                            encoder.encode(frame, { keyFrame: isKeyFrame });
                            frame.close();
                            processedFrames = i + 1;
                            onProgress(40 + Math.round((i / frames.length) * 50), "Encoding");
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
                            console.log("[ENCODE] Encoder closed");
                        }
                    }
                    console.log("[ENCODE] Encoding completed, total samples:", encodedSamplesOut.length);
                    resolve();
                })();
            });

            onProgress(90, "Multiplexing");
            console.log("[CUT] Starting multiplexing with", encodedSamplesOut.length, "samples");
            const outputBlob = await muxWithMP4Box(encodedSamplesOut, encoderConfig, encoderMetadata);
            console.log("[CUT] Multiplexing completed, Blob size:", outputBlob.size);
            const fragmentUrl = URL.createObjectURL(outputBlob);

            const downloadLink = document.createElement("a");
            downloadLink.href = fragmentUrl;
            downloadLink.download = `${fileName}_cut_${cutStart}-${cutEnd}.mp4`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            console.log("[DOWNLOAD] Cut video downloaded as", downloadLink.download);

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
            }

            onProgress(100, "Completed");
            onComplete(fragmentUrl);
            console.log("[CUT] Cutting completed successfully");
        } catch (error: any) {
            console.log("[CUT] Cutting error:", error);
            onError(error.message || "Unknown error");
        } finally {
            frames.forEach(frame => frame.close());
            this.isProcessing = false;
            console.log("[CUT] Cleanup completed");
        }
    }

    cancel(): void {
        this.isProcessing = false;
        console.log("[CUT] Cutting cancelled by service");
    }
}

export const videoCuttingService = new VideoCuttingService();