import { GlobalWorkerOptions } from "pdfjs-dist";
import mammoth from "mammoth";
import { SourceType } from "src/shared/types/Playground";
import { useState, useEffect } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

const usePreview = (type: SourceType | null, url: string) => {
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

    if (type === "apps" || type === "web") return <iframe src={url} />;

    return renderPreviewContent(fileType);
};

export default usePreview;
