import React, { FC, useState } from 'react';
import './MessageFrame.less';
import NotionLogoIcon from "../../../../../../shared/icons/NotionLogo.icon";
import MessageFrameModal  from "./MessageFrameModal/MessageFrameModal"
import { useAppStore, useChatStore } from "../../../../../../shared/providers";
import ExpandWidgetIcon from "../../../../../../shared/icons/ExpandWidget.icon";
import CollapseWidgetIntoStringIcon from "../../../../../../shared/icons/CollapseWidgetIntoString.icon";
import EnterFullscreenIcon from "../../../../../../shared/icons/EnterFullscreen.icon";

interface MessageFrameData {
    title?: string;
    subTitle?: string;
    description?: string;
    iframeUrl?: string;
    backgroundImage?: string;
}

interface MessageFrameProps {
    data: MessageFrameData;
}

const MessageFrame: FC<MessageFrameProps> = ({ data }) => {
    const {
        title = 'Notion Manager Platform',
        subTitle,
        description,
        iframeUrl,
        backgroundImage
    } = data;
    const [isMinimized, setIsMinimized] = useState(false);
    const { isMaximized, setIsMaximized } = useAppStore();

    const handleMinimize = () => setIsMinimized(!isMinimized);
    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };
    return (
        <>
            <div className="message-frame-layout">
                <div className="message-frame" >
                    <div className="message-frame-titlebar">
                        <div className="window-controls">
                            <div
                                className="window-control minimize"
                                onClick={handleMinimize}
                            >
                                <CollapseWidgetIntoStringIcon stroke="currentColor"/>
                            </div>
                            <div
                                className={`window-control ${isMinimized ? 'default' : 'maximize'}`}
                                onClick={!isMinimized ? handleMaximize : undefined}
                            >
                                <ExpandWidgetIcon fill="currentColor"/>
                            </div>
                            <div className="enter-fullscreen-tooltip">
                                <div className="enter-fullscreen-icon"><EnterFullscreenIcon/></div>
                                <span>Enter Fullscreen</span>
                            </div>
                        </div>
                        <div className="window-title">
                            {title}
                        </div>
                        <div className="notion_logo">
                            <NotionLogoIcon/>
                        </div>
                    </div>
                    {!isMinimized && (
                        <div className="message-frame-content">
                            {subTitle && <h2 className="message-frame-subtitle">{subTitle}</h2>}
                            {iframeUrl && (
                                <iframe
                                    src={iframeUrl}
                                    title="Embedded Content"
                                    width="100%"
                                    height="400px"
                                    style={{ border: 'none' }}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            {isMaximized && (
                <MessageFrameModal
                    title={title}
                    iframeUrl={iframeUrl}
                    subTitle={subTitle}
                />
            )}
        </>
    );
};

export default MessageFrame;
