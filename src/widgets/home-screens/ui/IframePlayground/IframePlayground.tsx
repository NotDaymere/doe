import React, { FC,  useRef} from "react";
import "./IframePlayground.less";
import { useAppStore } from "src/shared/providers";
import { App } from "src/types";

const IframePlayground: FC<Partial<App.Playground>> = ({ id = null }) => {
    const { citationPlaygroundRef } = useAppStore();
    const divRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="iframe-playground"
            ref={divRef}
        >
            { citationPlaygroundRef && (
                <iframe
                    src={citationPlaygroundRef}
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
