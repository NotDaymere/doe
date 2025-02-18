import { FC, useEffect, useState } from "react";
import { Document } from "react-pdf";
import PageInView from "../PageInView";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { PDFDocumentProxy } from "pdfjs-dist";
import css from "./PdfDocument.module.less";

interface IProps {
    url: string;
    scale: number;
    numPages: number;
    pageRefs: any;
    onPageChange: (page: number) => void;
    onDocumentLoad: (number: number) => void;
}

const PdfDocument: FC<IProps> = ({
    url,
    scale,
    numPages,
    pageRefs,
    onDocumentLoad,
    onPageChange,
}) => {
    const [pdfInstance, setPdfInstance] = useState<PDFDocumentProxy | null>(null);

    const onDocumentLoadSuccess = (pdf: any) => {
        onDocumentLoad(pdf.numPages);
        setPdfInstance(pdf);
    };

    useEffect(() => {
        return () => {
            if (pdfInstance) {
                pdfInstance.destroy();
            }
        };
    }, [pdfInstance]);

    return (
        <div className={css.viewer}>
            <div className={css.document}>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages)).map((_, index) => {
                        const pageIndex = index;

                        const refCallback = (el: any) => {
                            pageRefs.current[pageIndex] = el;
                        };

                        return (
                            <div key={`page_${pageIndex + 1}`} ref={refCallback}>
                                <PageInView
                                    scale={scale}
                                    pageNumber={pageIndex + 1}
                                    onPageChange={onPageChange}
                                />
                            </div>
                        );
                    })}
                </Document>
            </div>
        </div>
    );
};

export default PdfDocument;
