import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import css from "./VideoFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import ModalContentPanelEditIcon from "../../../../../shared/icons/ModalContentPanelEdit.icon";
import ModalContentPanelVolumeIcon from "../../../../../shared/icons/ModalContentPanelVolume.icon";
import ModalContentPanelVideoPlayIcon from "../../../../../shared/icons/ModalContentPanelVideoPlay.icon";
import ModalContentPanelScissorsIcon from "../../../../../shared/icons/ModalContentPanelScissors.icon";
import VideoPlayIcon from "../../../../../shared/icons/VideoPlay.icon";
import { videoCuttingService } from "./VideoCuttingService";

interface VideoModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt: string;
    isLoading?: boolean;
}

const VideoFilePreviewModal: React.FC<VideoModalProps> = ({ url: initialUrl, onClose, fileName, fileExt }) => {
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

        setIsProcessingCut(true);
        setCutProgress(0);
        setCutStage("Starting cut");
        setCutError(null);

        try {
            await videoCuttingService.cutVideo(
                url,
                cutStart,
                cutEnd,
                fileName,
                videoRef,
                (progress, stage) => {
                    setCutProgress(progress);
                    setCutStage(stage);
                },
                (error) => {
                    setCutError(error);
                    alert("An error occurred: " + error);
                    setTimeout(() => cancelCutting(), 3000);
                },
                (newUrl) => {
                    setUrl(newUrl);
                    setIsCutting(false);
                    setCutStart(null);
                    setCutEnd(null);
                    setProgress(0);
                    if (videoRef.current) {
                        videoRef.current.play().then(() => setIsPlaying(true)).catch((err) => {
                            console.log("[CUT] Error playing cut video:", err);
                            setIsPlaying(false);
                        });
                    }
                }
            );
        } catch (error: any) {
            console.log("[CUT] Service error:", error);
            setCutError(error.message || "Unknown error");
        } finally {
            setIsProcessingCut(false);
        }
    };

    const cancelCutting = () => {
        videoCuttingService.cancel();
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