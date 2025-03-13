import React, { FC, useState } from 'react';
import './MessageFrame.less';
import NotionLogoIcon from "../../../../../../shared/icons/NotionLogo.icon";
import MessageFrameModal  from "./MessageFrameModal/MessageFrameModal"
import { useChatStore } from "../../../../../../shared/providers";
import ExpandWidgetIcon from "../../../../../../shared/icons/ExpandWidget.icon";
import CollapseWidgetIntoStringIcon from "../../../../../../shared/icons/CollapseWidgetIntoString.icon";

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
    const { isMaximized, setIsMaximized } = useChatStore();

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
                                onClick={handleMinimize} title="Minimize"
                            >
                                <CollapseWidgetIntoStringIcon stroke="currentColor"/>
                            </div>
                            <div
                                className={`window-control ${isMinimized ? 'default' : 'maximize'}`}
                                onClick={!isMinimized ? handleMaximize : undefined}
                                title="Maximize"
                            >
                                <ExpandWidgetIcon fill="currentColor"/>
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
