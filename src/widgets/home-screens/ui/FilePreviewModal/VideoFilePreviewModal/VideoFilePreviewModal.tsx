import React from "react";
import {useRef, useState, useEffect} from "react";
import { createPortal } from "react-dom";
import css from "./VideoFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import ModalContentPanelEditIcon from "../../../../../shared/icons/ModalContentPanelEdit.icon";
import ModalContentPanelVolumeIcon from "../../../../../shared/icons/ModalContentPanelVolume.icon";
import ModalContentPanelVideoPlayIcon from "../../../../../shared/icons/ModalContentPanelVideoPlay.icon";
import ModalContentPanelCutIcon from "../../../../../shared/icons/ModalContentPanelCut.icon";
import ModalContentPanelScissorsIcon from "../../../../../shared/icons/ModalContentPanelScissors.icon";
import VideoPlayIcon from "../../../../../shared/icons/VideoPlay.icon";

interface VideoModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt: string;
}

const VideoFilePreviewModal: React.FC<VideoModalProps> = ({ url, onClose, fileName, fileExt }) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isDraggingProgress, setIsDraggingProgress] = useState(false);

    const togglePlayPause = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const { currentTime, duration } = videoRef.current;
        setProgress((currentTime / duration) * 100);
    };


    const updateVideoTime = (clientX: number) => {
        if (!videoRef.current || !progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        if (pos < 0) pos = 0;
        if (pos > 1) pos = 1;
        videoRef.current.currentTime = pos * videoRef.current.duration;
        setProgress(pos * 100);
    };

    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDraggingProgress(true);
        updateVideoTime(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDraggingProgress) return;
            updateVideoTime(e.clientX);
        };

        const handleMouseUp = () => {
            if (isDraggingProgress) {
                setIsDraggingProgress(false);
            }
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

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", () => setIsPlaying(false));

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", () => setIsPlaying(false));
        };
    }, []);

    return createPortal(
        <FilePreviewModalOverlay
            onClose={onClose}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNameVideoContainer}
            modalContentClass={css.modalContentVideo}
        >
            <div className={css.videoWrapper}>
                <video className={css.modalVideo} ref={videoRef}>
                    <source src={url} />
                    Your browser does not support the video tag.
                </video>

                <button className={css.playPauseButton} onClick={togglePlayPause}>
                    {isPlaying ? <div></div> : <VideoPlayIcon />}
                </button>

                <div  ref={progressBarRef}
                      className={css.progressBarContainer}
                      onMouseDown={handleProgressMouseDown}
                >
                    <div className={css.progressBar} style={{ width: `${progress}%` }}>
                        <div className={css.progressBarHandle}></div>
                    </div>
                </div>
            </div>

            <div className={css.modalContentEditPanel}>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelVolumeIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelVideoPlayIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelCutIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelScissorsIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelEditIcon fill="currentColor"/>
                </div>
            </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default VideoFilePreviewModal;
