import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./VideoFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import ModalContentPanelVolumeIcon from "../../../../../shared/icons/ModalContentPanelVolume.icon";
import ModalContentPanelVideoPlayIcon from "../../../../../shared/icons/ModalContentPanelVideoPlay.icon";
import ModalContentPanelScissorsIcon from "../../../../../shared/icons/ModalContentPanelScissors.icon";
import VideoPlayIcon from "../../../../../shared/icons/VideoPlay.icon";
import ModalContentPanelCutIcon from "../../../../../shared/icons/ModalContentPanelCut.icon";
import { videoStreamCuttingService } from "./VideoStreamCuttingService";

interface VideoModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt: string;
    isLoading?: boolean;
    onUpdateUrl?: (newUrl: string) => void;
}

const VideoFilePreviewModal: React.FC<VideoModalProps> = ({
                                                              url: initialUrl,
                                                              onClose,
                                                              fileName,
                                                              fileExt,
                                                              onUpdateUrl,
                                                          }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

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
    const [url, setUrl] = useState(initialUrl);
    const [expectedDuration, setExpectedDuration] = useState<number | null>(null);
    const [draggingMarker, setDraggingMarker] = useState<"start" | "end" | null>(null);

    const handleMarkerMouseDown = (marker: "start" | "end", e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingMarker(marker);
    };

    useEffect(() => {
        if (!draggingMarker) return;

        const handleMarkerMouseMove = (e: Event) => {
            const mouseEvent = e as unknown as MouseEvent;
            if (!videoRef.current || !progressBarRef.current) return;
            const rect = progressBarRef.current.getBoundingClientRect();
            let pos = (mouseEvent.clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(pos, 1));
            const duration = videoRef.current && isFinite(videoRef.current.duration)
                ? videoRef.current.duration
                : (expectedDuration || 0);
            if (!duration) return;
            const newTime = pos * duration;

            if (draggingMarker === "start") {
                if (cutEnd !== null && newTime > cutEnd) {
                    setCutStart(cutEnd);
                } else {
                    setCutStart(newTime);
                }
            } else if (draggingMarker === "end") {
                if (cutStart !== null && newTime < cutStart) {
                    setCutEnd(cutStart);
                } else {
                    setCutEnd(newTime);
                }
            }
        };

        const handleMarkerMouseUp = () => {
            setDraggingMarker(null);
        };

        window.addEventListener("mousemove", handleMarkerMouseMove);
        window.addEventListener("mouseup", handleMarkerMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMarkerMouseMove);
            window.removeEventListener("mouseup", handleMarkerMouseUp);
        };
    }, [draggingMarker, cutStart, cutEnd, expectedDuration]);




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
        const currentTime = videoRef.current.currentTime;
        let duration = videoRef.current.duration;

        if (!isFinite(duration)) {
            if (expectedDuration !== null && expectedDuration > 0) {
                duration = expectedDuration;
                console.warn("[TimeUpdate] Using expectedDuration:", duration);
            } else {
                console.warn("[TimeUpdate] No valid duration available, skipping update");
                return;
            }
        }

        if (!isNaN(duration) && duration > 0) {
            const newProgress = Math.min((currentTime / duration) * 100, 100);
            setProgress(newProgress);
        } else {
            console.error("[TimeUpdate] Invalid duration:", duration);
            setProgress(0);
        }
    };

    const updateVideoTime = (clientX: number) => {
        if (!videoRef.current || !progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(pos, 1));
        const duration = isFinite(videoRef.current.duration) ? videoRef.current.duration : (expectedDuration || 0);
        if (duration) {
            videoRef.current.currentTime = pos * duration;
            const newProgress = pos * 100;
            setProgress(newProgress);
        } else {
            console.warn("[UpdateVideoTime] Invalid duration:", duration);
        }
    };

    const handleProgressMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !progressBarRef.current) return;
        if (isCutting) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            const duration = isFinite(videoRef.current.duration)
                ? videoRef.current.duration
                : expectedDuration !== null && expectedDuration > 0
                    ? expectedDuration
                    : 0;
            if (!duration) {
                console.warn("[CUT] Invalid duration for marker placement:", videoRef.current.duration, expectedDuration);
                return;
            }
            const time = pos * duration;
            if (cutStart === null || cutEnd === null) {
                setCutStart(0);
                setCutEnd(duration);
            } else {
                if (time < cutStart) {
                    setCutStart(time);
                } else if (time > cutEnd) {
                    setCutEnd(time);
                } else {
                    const diffStart = Math.abs(time - cutStart);
                    const diffEnd = Math.abs(time - cutEnd);
                    if (diffStart < diffEnd) setCutStart(time);
                    else setCutEnd(time);
                }
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
            if (isFinite(video.duration)) {
                setExpectedDuration(video.duration);
                localStorage.setItem("expectedDuration-" + fileName, video.duration.toString());
                if (isCutting) {
                    setCutStart(0);
                    setCutEnd(video.duration);
                }
            } else {
                console.warn("[LoadedMetadata] Invalid duration:", video.duration);
                if (expectedDuration !== null && expectedDuration > 0) {
                    if (isCutting) {
                        setCutStart(0);
                        setCutEnd(expectedDuration);
                    }
                }
            }
            setProgress(0);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", () => setIsPlaying(false));
        video.addEventListener("error", () => {
            console.error("[Video] Error loading video:", video.error);
        });

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", () => setIsPlaying(false));
            video.removeEventListener("error", () => {});
        };
    }, [isCutting, fileName, expectedDuration]);

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

    useEffect(() => {
        const savedDuration = localStorage.getItem("expectedDuration-" + fileName);
        if (savedDuration !== null) {
            const parsedDuration = Number(savedDuration);
            if (isFinite(parsedDuration) && parsedDuration > 0) {
                setExpectedDuration(parsedDuration);
            }
        }
    }, [fileName]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = url;
            videoRef.current.load();
            setProgress(0);
        }
    }, [url]);

    useEffect(() => {
        if (!isPlaying || !videoRef.current) return;
        const interval = setInterval(() => {
            handleTimeUpdate();
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const updatePlaybackRate = (rate: number) => {
        if (videoRef.current) videoRef.current.playbackRate = rate;
        setShowSpeedPopup(false);
    };

    const handleCutVideo = async () => {
        if (cutStart === null || cutEnd === null || cutEnd <= cutStart) {
            alert("Please set valid start and end times for cutting.");
            return;
        }

        let duration: number;
        if (videoRef.current && isFinite(videoRef.current.duration)) {
            duration = videoRef.current.duration;
        } else if (expectedDuration !== null && expectedDuration > 0) {
            duration = expectedDuration;
            console.warn("[CUT] Using expectedDuration:", expectedDuration);
        } else {
            console.warn("[CUT] Cannot cut video: duration unavailable");
            alert("Video duration is not available. Please try again.");
            return;
        }

        setIsProcessingCut(true);
        setCutProgress(0);
        setCutStage("Starting cut");
        setCutError(null);

        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }

        const minOverlayTime = 2000;
        const startTime = Date.now();

        try {
            await videoStreamCuttingService.cutVideo(
                url,
                cutStart,
                cutEnd,
                fileName,
                (progress, stage) => {
                    setCutProgress(Math.round(progress));
                    setCutStage(stage);
                },
                (error) => {
                    console.error("[CUT] Error from service:", error);
                    setCutError(error);
                    alert("An error occurred: " + error);
                    setTimeout(() => cancelCutting(), 3000);
                },
                (newUrl) => {
                    setUrl(newUrl);
                    const newExpected = cutEnd - cutStart;
                    setExpectedDuration(newExpected);
                    localStorage.setItem("expectedDuration-" + fileName, newExpected.toString());
                    if (onUpdateUrl) onUpdateUrl(newUrl);
                    setIsCutting(false);
                    setCutStart(null);
                    setCutEnd(null);
                    setProgress(0);
                    if (videoRef.current) {
                        videoRef.current.src = newUrl;
                        videoRef.current.preload = "auto";
                        videoRef.current.currentTime = 0;
                        videoRef.current.load();

                        const metadataHandler = () => {
                            if (videoRef.current && isFinite(videoRef.current.duration)) {
                                setExpectedDuration(videoRef.current.duration);
                                localStorage.setItem("expectedDuration-" + fileName, videoRef.current.duration.toString());
                                setProgress(0);
                            } else {
                                console.warn("[CUT] Invalid duration after load:", videoRef.current?.duration);
                            }
                            videoRef.current?.play()
                                .then(() => setIsPlaying(true))
                                .catch((err) => {
                                    console.error("[CUT] Error playing cut video:", err);
                                    setIsPlaying(false);
                                });
                        };

                        videoRef.current.addEventListener("loadedmetadata", metadataHandler, { once: true });

                        videoRef.current.addEventListener(
                            "error",
                            () => {
                                console.error("[CUT] Video load error:", videoRef.current?.error);
                            },
                            { once: true }
                        );
                    }
                }
            );
        } catch (error: any) {
            console.error("[CUT] Service error:", error);
            setCutError(error.message || "Unknown error");
            alert("An error occurred: " + error.message);
        } finally {
            const elapsed = Date.now() - startTime;
            const remaining = minOverlayTime - elapsed;
            if (remaining > 0) {
                await new Promise((resolve) => setTimeout(resolve, remaining));
            }
            setIsProcessingCut(false);
        }
    };

    const cancelCutting = () => {
        videoStreamCuttingService.cancel();
        setIsCutting(false);
        setCutStart(null);
        setCutEnd(null);
        setCutProgress(0);
        setCutStage("");
        setCutError(null);
        setIsProcessingCut(false);
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
                    <source src={url} />
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
                    {isCutting && (
                        <>
                            {cutStart !== null && (
                                <div
                                    className={css.cutMarker}
                                    style={{
                                        left: `${
                                            (cutStart /
                                                (videoRef.current && typeof videoRef.current.duration === "number" && isFinite(videoRef.current.duration)
                                                    ? videoRef.current.duration
                                                    : expectedDuration || 1)) *
                                            100
                                        }%`,
                                    }}
                                    onMouseDown={(e) => handleMarkerMouseDown("start", e)}
                                />
                            )}
                            {cutEnd !== null && (
                                <div
                                    className={css.cutMarker}
                                    style={{
                                        left: `${
                                            (cutEnd /
                                                (videoRef.current && typeof videoRef.current.duration === "number" && isFinite(videoRef.current.duration)
                                                    ? videoRef.current.duration
                                                    : (expectedDuration && expectedDuration > 0 ? expectedDuration : 1))) *
                                            100
                                        }%`,
                                    }}
                                    onMouseDown={(e) => handleMarkerMouseDown("end", e)}
                                />
                            )}
                        </>
                    )}

                </div>
            </div>
            <div className={css.modalContentEditPanel}>
                <div className={css.modalContentEditPanelItem} onClick={toggleMute} data-active={!isMuted}>
                    <ModalContentPanelVolumeIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem} onClick={togglePlayPause} data-active={isPlaying}>
                    <ModalContentPanelVideoPlayIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelCutIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div
                    className={css.modalContentEditPanelItem}
                    onClick={() => {
                        if (isCutting) {
                            cancelCutting();
                        } else {
                            let duration: number | null = null;
                            if (videoRef.current && isFinite(videoRef.current.duration)) {
                                duration = videoRef.current.duration;
                            } else if (expectedDuration !== null && expectedDuration > 0) {
                                duration = expectedDuration;
                                console.warn("[CUT] Using expectedDuration for cutting:", expectedDuration);
                            } else {
                                console.warn("[CUT] Cannot start cutting: no duration available");
                                return;
                            }
                            setCutStart(0);
                            setCutEnd(duration);
                            setIsCutting(true);
                        }
                    }}
                    title="Cut video"
                    data-active={isCutting}
                    style={
                        !videoRef.current || (!isFinite(videoRef.current.duration) && expectedDuration === null)
                            ? { opacity: 0.5, cursor: "not-allowed" }
                            : {}
                    }
                >
                    <ModalContentPanelScissorsIcon fill="currentColor" />
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
            {isCutting && !isProcessingCut && (
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
                        Apply
                    </button>
                    <button
                        className={css.cutButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            cancelCutting();
                        }}
                        disabled={false}
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