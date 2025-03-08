import { FC, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import PageInView from "../PageInView";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { PDFDocumentProxy } from "pdfjs-dist";
import css from "./PdfDocument.module.less";
import classNames from "classnames";

interface IProps {
    url: string;
    scale: number;
    numPages: number;
    pageRefs: any;
    isModalView?: boolean;
    onPageChange: (page: number) => void;
    onDocumentLoad: (number: number) => void;
}

const PdfDocument: FC<IProps> = ({
    url,
    scale,
    numPages,
    pageRefs,
    isModalView,
    onDocumentLoad,
    onPageChange,
}) => {
    const [pdfInstance, setPdfInstance] = useState<PDFDocumentProxy | null>(null);
    const [viewerWidth, setViewerWidth] = useState(400);

    const onDocumentLoadSuccess = (pdf: any) => {
        onDocumentLoad(pdf.numPages);
        setPdfInstance(pdf);
    };

    const handleResize = () => {
        const viewer = document.querySelector("#previewSource");
        if (viewer) {
            setViewerWidth(viewer?.getBoundingClientRect().width);
        }
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        return () => {
            if (pdfInstance) {
                pdfInstance.destroy();
            }
        };
    }, [pdfInstance]);

    return (
        <div
            className={classNames(css.viewer, {
                [css.viewerModal]: isModalView,
            })}
        >
            <div className={css.document} style={{ transform: `scale(${scale})` }}>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages)).map((_, index) => {
                        const pageIndex = index;

                        const refCallback = (el: any) => {
                            pageRefs.current[pageIndex] = el;
                        };

                        return (
                            <div key={`page_${pageIndex + 1}`} ref={refCallback}>
                                <PageInView pageNumber={pageIndex + 1} onPageChange={onPageChange}>
                                    {isModalView ? (
                                        <Page pageNumber={pageIndex + 1} scale={0.7} />
                                    ) : (
                                        <Page width={viewerWidth} pageNumber={pageIndex + 1} />
                                    )}
                                    <span style={{ color: "transparent" }}>// </span>
                                </PageInView>
                            </div>
                        );
                    })}
                </Document>
            </div>
        </div>
    );
};

export default PdfDocument;
