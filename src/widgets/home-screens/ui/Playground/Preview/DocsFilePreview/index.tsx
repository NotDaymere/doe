import { useState, useEffect } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./DocsFilePreview.module.less";

GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

interface IProps {
    url: string;
}

const DocsPreview: React.FC<IProps> = ({ url }) => {
    console.log("url", url);

    const fileType = url?.split(".").pop();
    const [textContent, setTextContent] = useState<any>(null);

    useEffect(() => {
        if (fileType === "txt") {
            fetch(url)
                .then((response) => response.text())
                .then((data) => setTextContent(data))
                .catch((error) => console.error(error));
        }
        // else if (fileType === "docx") {
        //     // Fetch and render DOCX file content
        //     fetch(url)
        //         .then((response) => response.arrayBuffer())
        //         .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
        //         .then((result) => setDocContent(result.value))
        //         .catch((error) => console.error(error));
        // }
    }, [url, fileType]);

    return (
        <>
            {fileType === "pdf" && <Viewer fileUrl={url || ""} />}
            {fileType === "txt" && <pre className={css.txtPreview}>{textContent}</pre>}
            {fileType === "doc" && <div className={css.txtPreview}>{url}</div>}
        </>
    );
};

export default DocsPreview;
