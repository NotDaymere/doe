import React from "react";
import clsx from "clsx";
import css from "./TalkModeActionsPanel.module.less";
import PanelMicrophoneIcon from "../../../../../shared/icons/PanelMicrophone.icon";
import PanelVideoIcon from "../../../../../shared/icons/PanelVideo.icon";
import PanelCloseIcon from "../../../../../shared/icons/PanelClose.icon";

interface TalkModeActionsPanelProps {
    onClose: () => void;
    isCameraOn: boolean | null;
    isMicrophoneOn: boolean | null;
    onCameraToggle: () => void;
    onMicrophoneToggle: () => void;
    noPermissionForCamera?: boolean;
    noPermissionForMicrophone?: boolean;
}

export const TalkModeActionsPanel: React.FC<TalkModeActionsPanelProps> = ({
    onClose,
    isCameraOn,
    isMicrophoneOn,
    onCameraToggle,
    onMicrophoneToggle,
    noPermissionForCamera = false,
    noPermissionForMicrophone = false,
}) => {
    return (
        <div
            className={`${isCameraOn ? css.actionsPanelCameraOnContainer : css.actionsPanelContainer}`}
        >
            <div
                className={clsx(css.panelButton, {
                    ...(!noPermissionForMicrophone && {
                        [css.microphoneActive]: isMicrophoneOn === true,
                        [css.microphoneDisabled]: isMicrophoneOn === false,
                        [css.microphoneDefault]: isMicrophoneOn === null,
                    }),
                })}
                onClick={onMicrophoneToggle}
            >
                <PanelMicrophoneIcon
                    color="currentColor"
                    active={noPermissionForMicrophone ? false : isMicrophoneOn}
                />
            </div>
            <div className={css.divider}></div>
            <div
                className={clsx(css.panelButton, {
                    ...(!noPermissionForCamera && {
                        [css.cameraActive]: isCameraOn === true,
                        [css.cameraDisabled]: isCameraOn === false,
                        [css.cameraDefault]: isCameraOn === null,
                    }),
                })}
                onClick={onCameraToggle}
            >
                <PanelVideoIcon
                    color="currentColor"
                    active={noPermissionForCamera ? false : isCameraOn}
                />
            </div>
            <div className={css.divider}></div>
            <div className={`${css.panelButton} ${css.panelButtonClose}`} onClick={onClose}>
                <PanelCloseIcon color="currentColor" />
            </div>
        </div>
    );
};
