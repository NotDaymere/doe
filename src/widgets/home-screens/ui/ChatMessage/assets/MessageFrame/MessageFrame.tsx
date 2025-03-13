import React, { FC, useState } from 'react';
import './MessageFrame.less';

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
    const handleClose = () => {};
    const handleMinimize = () => setIsMinimized(!isMinimized);
    const handleMaximize = () => {};
    return (
        <div className="message-frame-layout">
            <div className={`message-frame ${isMinimized ? 'minimized' : ''}`}>
                <div className="message-frame-titlebar">
                    <div className="window-controls">
                        <span className="window-control close" onClick={handleClose} title="Close" />
                        <span className="window-control minimize" onClick={handleMinimize} title="Minimize" />
                        <span className="window-control maximize" onClick={handleMaximize} title="Maximize" />
                    </div>
                    <div className="window-title">
                        {title}
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

    );
};

export default MessageFrame;
