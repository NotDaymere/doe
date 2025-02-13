import ArrowRightUpIcon from "src/shared/icons/ArrowRightUp.icon";
import { GlobalWorkerOptions } from "pdfjs-dist";
import mammoth from "mammoth";
import { useState, useEffect } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./DocsFilePreview.module.less";

GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

interface IProps {
    url: string;
}

const DocsPreview: React.FC<IProps> = ({ url }) => {
    const fileType = url?.split(".").pop() || "";
    const [textContent, setTextContent] = useState<any>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (fileType === "txt") {
            fetch(url)
                .then((response) => response.text())
                .then((data) => setTextContent(data))
                .catch((error) => console.error(error));
        } else if (fileType === "docx") {
            setTextContent(null);
            fetch(url)
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
                .then((result) => {
                    setTextContent(result.value);
                })
                .catch((error) => console.error(error));
        }
    }, [url, fileType]);

    const handleOpenInNewWindowClick = (e: any) => {
        e.stopPropagation();
        window.open(url, "_blank");
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

    const renderPreviewContent = (fileType: string) => {
        switch (fileType) {
            case "pdf":
                return (
                    <div
                        onDoubleClick={() => console.log("DocsPreview")}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={css.preview}
                    >
                        <Viewer fileUrl={url || ""} />
                        {renderOpenInNewWindowButtonClick()}
                    </div>
                );
            case "txt":
                return (
                    <pre
                        className={css.preview}
                        onDoubleClick={() => console.log("DocsPreview")}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {textContent}
                        {renderOpenInNewWindowButtonClick()}
                    </pre>
                );
            case "docx":
                return (
                    <pre
                        onDoubleClick={() => console.log("DocsPreview")}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={css.preview}
                    >
                        {textContent}
                        {renderOpenInNewWindowButtonClick()}
                    </pre>
                );
            default:
                return null;
        }
    };

    return <>{renderPreviewContent(fileType)}</>;
};

export default DocsPreview;
