import { FC, useState } from "react";
import { IPreviewPlayground } from "src/shared/types/Playground";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ArrowRightUpIcon from "src/shared/icons/ArrowRightUp.icon";
import usePreview from "./usePreview";
import css from "./Preview.module.less";

GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

const Preview: FC<IPreviewPlayground> = ({ type, data }) => {
    const [isHovered, setIsHovered] = useState(false);
    const content = usePreview(type, data);

    const handleOpenInNewWindowClick = (e: any) => {
        e.stopPropagation();
        window.open(data, "_blank");
    };

    const renderOpenInNewWindowButtonClick = () => (
        <>
            {isHovered && (
                <button
                    className={css.openButton}
                    rel="noreferrer"
                    onClick={(e) => handleOpenInNewWindowClick(e)}
                >
                    <ArrowRightUpIcon width={16} height={16} />
                    <span>Open in new window</span>
                </button>
            )}
        </>
    );

    return (
        <div
            onDoubleClick={() => console.log("DocsPreview")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={css.preview}
        >
            {content}
            {renderOpenInNewWindowButtonClick()}
        </div>
    );
};

export default Preview;
