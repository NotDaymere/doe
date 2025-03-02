import React from "react";
import css from "./TalkModeActionsPanel.module.less";
import PanelMicrophoneIcon from "../../../../../shared/icons/PanelMicrophone.icon";
import PanelVideoIcon from "../../../../../shared/icons/PanelVideo.icon";
import PanelCloseIcon from "../../../../../shared/icons/PanelClose.icon";

interface TalkModeActionsPanelProps {
    onClose: () => void;
}

export const TalkModeActionsPanel: React.FC<TalkModeActionsPanelProps> = ({ onClose }) => {
    return (
        <div className={css.actionsPanelContainer}>
            <div className={css.panelButton}>
                <PanelMicrophoneIcon />
            </div>
            <svg
                width="2"
                height="30"
                viewBox="0 0 1 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="0.5" y1="30" x2="0.5" stroke="#F8F8F8" />
            </svg>
            <div className={css.panelButton}>
                <PanelVideoIcon />
            </div>
            <svg
                width="2"
                height="30"
                viewBox="0 0 1 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="0.5" y1="30" x2="0.5" stroke="#F8F8F8" />
            </svg>
            <div className={`${css.panelButton} ${css.panelButtonClose}`} onClick={onClose}>
                <PanelCloseIcon color="currentColor" />
            </div>
        </div>
    );
};
