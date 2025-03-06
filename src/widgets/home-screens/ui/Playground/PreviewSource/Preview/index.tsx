import { SourceType } from "src/shared/types/Playground";
import { useState, useEffect, FC, useRef } from "react";
import PdfDocument from "../PdfDocument";
import classNames from "classnames";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Pagination from "../Pagination";
import ZoomButton from "../ZoomButton";
import Title from "../Title";
import DocxDocument from "../DocxDocument";
import DocxDocumentWithPagination from "../DocxDocument/DocxDocumentWithPagination";
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
    const [docxScale, setDocxScale] = useState(1);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(0);
    const [pagesDocsNum, setPagesDocsNum] = useState<number>(0);
    const [currentDocxPage, setCurrentDocxPage] = useState<number>(0);
    const pageRefs = useRef<any>({});

    useEffect(() => {
        if (fileType === "txt") {
            fetch(url)
                .then((response) => response.text())
                .then((data) => setContent(data))
                .catch((error) => console.error(error));
        }
    }, [url, fileType]);

    useEffect(() => {
        const element = document.querySelector("#pdf_viewer");
        element && element?.addEventListener("wheel", onWheelEvent);

        return () => {
            window.removeEventListener("wheel", onWheelEvent);
        };
    }, [scale]);

    const onWheelEvent = (event: any) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            setScale(scale + 0.01);
        } else if (event.deltaY < 0) {
            setScale(scale - 0.01);
        }
    };

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
                        isModalView={false}
                    />
                );
            case "txt":
                return <pre>{content}</pre>;
            case "docx":
                return <DocxDocument url={url} />;
            default:
                return null;
        }
    };

    if (type === "apps" || type === "web")
        return <iframe className={classNames({ [css.iframeModal]: isModalView })} src={url} />;

    if (isModalView && fileType === "pdf")
        return (
            <div className={css.pdfViewerWithPagination} id="pdf_viewer">
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
                    isModalView={true}
                />
            </div>
        );

    if (isModalView && fileType === "docx")
        return (
            <div className={css.docxPreview}>
                <div className={css.docxTitle}>
                    <Title title={title} />
                </div>
                <div className={css.pagination}>
                    <Pagination
                        pageRefs={pageRefs}
                        numPages={pagesDocsNum}
                        currentPage={currentDocxPage}
                        onPageChange={setCurrentDocxPage}
                    />
                </div>
                <div className={css.zoom}>
                    <ZoomButton onZoomClick={() => setDocxScale(scale + 0.1)} />
                </div>
                <DocxDocumentWithPagination
                    url={url}
                    scale={docxScale}
                    pageRefs={pageRefs}
                    onSetPages={setPagesDocsNum}
                    onPageChange={setCurrentDocxPage}
                />
            </div>
        );

    return renderPreviewContent(fileType);
};

export default Preview;
