import React, { FC, useState } from "react";
import ReactDOM from 'react-dom';
import NotionLogoIcon from "../../../../../../../shared/icons/NotionLogo.icon";
import "./MessageFrameModal.less"
import { useAppStore, useChatStore } from "../../../../../../../shared/providers";
import CollapseWidgetIcon from "../../../../../../../shared/icons/CollapseWidget.icon";

interface MessageFrameModalProps {
    title: string;
    subTitle?: string;
    iframeUrl?: string;
}

const MessageFrameModal: FC<MessageFrameModalProps> = ({
                                                           title,
                                                           subTitle,
                                                           iframeUrl,

                                                       }) => {
    const { isMaximized, setIsMaximized } = useAppStore();

    const handleCloseModal = () => {
        setIsMaximized(!isMaximized);
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="message-frame">
                <div className="message-frame-titlebar">
                    <div className="window-controls">
                        <div
                            className="window-control modal_minimize"
                        >
                        </div>
                        <div
                            className="window-control maximize"
                            onClick={handleCloseModal}
                        >
                            <CollapseWidgetIcon fill="currentColor"/>
                        </div>
                    </div>
                    <div className="window-title">
                        {title}
                    </div>
                    <div className="notion_logo">
                        <NotionLogoIcon />
                    </div>
                </div>

                    <div className="message-frame-content">
                        {subTitle && <h2 className="message-frame-subtitle">{subTitle}</h2>}
                        {iframeUrl && (
                            <iframe
                                src={iframeUrl}
                                title="Embedded Content"
                                width="100%"
                                height="720px"
                                style={{ border: 'none' }}
                            />
                        )}
                    </div>
                </div>
            </div>,
            document.body,
    );
};

export default MessageFrameModal;
