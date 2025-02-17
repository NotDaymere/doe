import mammoth from "mammoth";
import { SourceType } from "src/shared/types/Playground";
import { useState, useEffect, FC } from "react";
import { pdfjs } from "react-pdf";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import PdfViewerWithPagination from "../PDFViewerWithPagination";
import classNames from "classnames";
import css from "./Preview.module.less";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

interface IProps {
    type: SourceType | null;
    url: string;
    isModalView?: boolean;
}

const Preview: FC<IProps> = ({ type, url, isModalView }) => {
    const fileType = url?.split(".").pop() || "";
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        if (fileType === "txt") {
            fetch(url)
                .then((response) => response.text())
                .then((data) => setContent(data))
                .catch((error) => console.error(error));
        } else if (fileType === "docx") {
            setContent(null);
            fetch(url)
                .then((response) => response.arrayBuffer())
                .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
                .then((result) => {
                    setContent(result.value);
                })
                .catch((error) => console.error(error));
        }
    }, [url, fileType]);

    const renderPreviewContent = (fileType: string) => {
        switch (fileType) {
            case "pdf":
                return <Viewer fileUrl={url || ""} />;
            case "txt":
            case "docx":
                return <pre style={{ display: "contents", whiteSpace: "pre-wrap" }}>{content}</pre>;
            default:
                return null;
        }
    };

    if (type === "apps" || type === "web")
        return <iframe className={classNames({ [css.iframeModal]: isModalView })} src={url} />;

    if (isModalView && fileType === "pdf") return <PdfViewerWithPagination url={url} />;

    return renderPreviewContent(fileType);
};

export default Preview;
