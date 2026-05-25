import { SourceType } from "src/shared/types/Playground";
import { useState, useEffect, FC, useRef } from "react";
import PdfDocument from "../PdfDocument";
import classNames from "classnames";
import Pagination from "../Pagination";
import ZoomButton from "../ZoomButton";
import Title from "../Title";
import DocxDocument from "../DocxDocument";
import DocxDocumentWithPagination from "../DocxDocument/DocxDocumentWithPagination";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./Preview.module.less";

interface IProps {
    type: SourceType | null;
    url: string;
    title?: string;
    isModalView?: boolean;
    pageRefs: any;
    setPagesDocsNum: any;
    setCurrentDocxPage: any;
    docxScale: any;
    setScale: any;
    scale: any;
}

const throttle = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
    let isWaiting = false;

    return (...args: T) => {
        if (isWaiting) {
            return;
        }

        callback(...args);
        isWaiting = true;

        setTimeout(() => {
            isWaiting = false;
        }, delay);
    };
};

const Preview: FC<IProps> = ({
    type,
    url,
    title,
    isModalView,
    pageRefs,
    setPagesDocsNum,
    setCurrentDocxPage,
    docxScale,
    setScale,
    scale,
}) => {
    const fileType = url?.split(".").pop() || "";
    const [content, setContent] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(0);
    const [showDocumentInfo, setShowDocumentInfo] = useState(false);

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
            element && element?.removeEventListener("wheel", onWheelEvent);
        };
    }, [scale]);

    const onWheelEvent = throttle((event: any) => {
        event.preventDefault();

        if (event.ctrlKey) {
            if (event instanceof WheelEvent) {
                if (event.deltaY > 0) {
                    if (scale - 0.05 <= 0) return;
                    setScale(scale - 0.05);
                } else if (event.deltaY < 0) {
                    setScale(scale + 0.05);
                }
            }
        }
    }, 100);

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
                return (
                    <div className={css.txtPreview}>
                        <pre>{content}</pre>
                    </div>
                );
            case "docx":
                return <DocxDocument url={url} />;
            default:
                return null;
        }
    };

    const renderDocumentInfo = () => (
        <>
            <div className={classNames(css.title, { [css.showTitle]: showDocumentInfo })}>
                <Title title={title} />
            </div>

            <div
                className={classNames(css.pagination, {
                    [css.showPagination]: showDocumentInfo,
                })}
            >
                <Pagination
                    pageRefs={pageRefs}
                    numPages={numPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
            <div className={classNames(css.zoom, { [css.showZoom]: showDocumentInfo })}>
                <ZoomButton onZoomClick={() => setScale(scale + 0.1)} />
            </div>
        </>
    );

    if (type === "apps" || type === "web")
        return <iframe className={classNames({ [css.iframeModal]: isModalView })} src={url} />;

    if (isModalView && fileType === "pdf")
        return (
            <div
                className={css.pdfViewerWithPagination}
                id="pdf_viewer"
                onMouseEnter={() => setShowDocumentInfo(true)}
                onMouseLeave={() => setShowDocumentInfo(false)}
            >
                {renderDocumentInfo()}
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
            <div
                className={css.docxDocument}
                onMouseEnter={() => setShowDocumentInfo(true)}
                onMouseLeave={() => setShowDocumentInfo(false)}
            >
                <div className={css.docxPreview}>
                    {renderDocumentInfo()}
                    <DocxDocumentWithPagination
                        url={url}
                        scale={docxScale}
                        pageRefs={pageRefs}
                        onSetPages={setPagesDocsNum}
                        onPageChange={setCurrentDocxPage}
                    />
                </div>
            </div>
        );

    return renderPreviewContent(fileType);
};

export default Preview;
