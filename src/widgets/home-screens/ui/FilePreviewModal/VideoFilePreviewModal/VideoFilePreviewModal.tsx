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
}

const VideoFilePreviewModal: React.FC<VideoModalProps> = ({ url, onClose, fileName }) => {


    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

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

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = clickPos * videoRef.current.duration;
    };

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

                <div className={css.progressBarContainer} onClick={handleProgressClick}>
                    <div className={css.progressBar} style={{ width: `${progress}%` }} />
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
