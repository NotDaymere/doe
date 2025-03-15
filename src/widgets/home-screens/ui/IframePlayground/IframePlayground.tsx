import React, { FC, useEffect, useRef, useState } from "react";
import "./IframePlayground.less";
import { useChatStore, usePlaygroundStore } from "src/shared/providers";
import { App } from "src/types";

const IframePlayground: FC<Partial<App.Playground>> = ({ id = null }) => {
    const {
        playground,
    } = useChatStore();
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("Playground data:", playground.data);
    }, [playground.data]);
    return (
        <div
            className="iframe-playground"
            ref={divRef}
        >
            {playground.data && (
                <iframe
                    src={playground.data}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                />
            )}
        </div>
    );
};

export default IframePlayground;
