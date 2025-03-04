import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import css from "./TalkModeVideoSection.module.less";
import { TalkModeActionsPanel } from "../TalkModeActionsPanel/TalkModeActionsPanel";

interface TalkModeVideoSectionProps {
    onClose: () => void;
    isCameraOn: boolean | null;
    isMicrophoneOn: boolean | null;
    onCameraToggle: () => void;
    onMicrophoneToggle: () => void;
    isNeedToShowActionsPanel: boolean;
    noPermissionForCamera?: boolean;
    noPermissionForMicrophone?: boolean;
}

export const TalkModeVideoSection: React.FC<TalkModeVideoSectionProps> = ({
                                                                              onClose,
                                                                              isCameraOn,
                                                                              isMicrophoneOn,
                                                                              onCameraToggle,
                                                                              onMicrophoneToggle,
                                                                              isNeedToShowActionsPanel,
                                                                              noPermissionForCamera = false,
                                                                              noPermissionForMicrophone = false,
                                                                          }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isVisible, setIsVisible] = useState(isCameraOn);
    const [height, setHeight] = useState(isCameraOn ? 280 : 0);

    useEffect(() => {
        if (isCameraOn) {
            setIsVisible(true);
            requestAnimationFrame(() => setHeight(280));
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    setStream(mediaStream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                    }
                })
                .catch((error) => console.error("Error accessing camera:", error));
        } else {
            setHeight(0);
            setTimeout(() => setIsVisible(false), 500);
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                setStream(null);
            }
        }
    }, [isCameraOn]);

    return (
        isVisible && (
            <div className={clsx(css.talkModeVideoContainer, { [css.hidden]: !isCameraOn })} style={{ height: `${height}px` }}>
                <video ref={videoRef} autoPlay playsInline muted className={css.video} />
                {isCameraOn === true &&
                    <div className={clsx(css.hoverPanel, { [css._visible]: isNeedToShowActionsPanel })}>
                        <TalkModeActionsPanel
                            onClose={onClose}
                            isCameraOn={isCameraOn}
                            isMicrophoneOn={isMicrophoneOn}
                            onCameraToggle={onCameraToggle}
                            onMicrophoneToggle={onMicrophoneToggle}
                            noPermissionForCamera={noPermissionForCamera}
                            noPermissionForMicrophone={noPermissionForMicrophone}
                        />
                    </div>
                }
            </div>
        )
    );
};
