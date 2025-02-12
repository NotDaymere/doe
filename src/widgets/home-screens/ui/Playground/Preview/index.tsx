import { FC } from "react";
import { IPreviewPlayground } from "src/shared/types/Playground";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DocsPreview from "./DocsFilePreview";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";

GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

const Preview: FC<IPreviewPlayground> = ({ type, data }) => {
    if (type === "docs") return <DocsPreview url={data} />;

    return null;
};

export default Preview;
