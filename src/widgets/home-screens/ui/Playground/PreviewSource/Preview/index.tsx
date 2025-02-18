import mammoth from "mammoth";
import { SourceType } from "src/shared/types/Playground";
import { useState, useEffect, FC, useRef } from "react";
import PdfDocument from "../PdfDocument";
import classNames from "classnames";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Pagination from "../Pagination";
import ZoomButton from "../ZoomButton";
import Title from "../Title";
import css from "./Preview.module.less";

interface IProps {
    type: SourceType | null;
    url: string;
    title?: string;
    isModalView?: boolean;
}

const Preview: FC<IProps> = ({ type, url, title, isModalView }) => {
    const fileType = url?.split(".").pop() || "";
    const [content, setContent] = useState<any>(null);
    const [scale, setScale] = useState(0.7);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(0);
    const pageRefs = useRef<any>({});

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
                return (
                    <PdfDocument
                        url={url}
                        scale={scale}
                        numPages={numPages}
                        onDocumentLoad={setNumPages}
                        onPageChange={setCurrentPage}
                        pageRefs={pageRefs}
                    />
                );
            case "txt":
            case "docx":
                return <pre style={{ display: "contents", whiteSpace: "pre-wrap" }}>{content}</pre>;
            default:
                return null;
        }
    };

    if (type === "apps" || type === "web")
        return <iframe className={classNames({ [css.iframeModal]: isModalView })} src={url} />;

    if (isModalView && fileType === "pdf")
        return (
            <div className={css.pdfViewerWithPagination}>
                <div className={css.title}>
                    <Title title={title} />
                </div>
                <div className={css.pagination}>
                    <Pagination
                        pageRefs={pageRefs}
                        numPages={numPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
                <div className={css.zoom}>
                    <ZoomButton onZoomClick={() => setScale(scale + 0.1)} />
                </div>
                <PdfDocument
                    url={url}
                    scale={scale}
                    numPages={numPages}
                    onDocumentLoad={setNumPages}
                    onPageChange={setCurrentPage}
                    pageRefs={pageRefs}
                />
            </div>
        );

    return renderPreviewContent(fileType);
};

export default Preview;
