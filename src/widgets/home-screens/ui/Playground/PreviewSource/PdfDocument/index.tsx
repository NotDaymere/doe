import { FC } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./PdfDocument.module.less";

interface PDFPreviewProps {
    url: string;
    scale: number;
    pageRefs: any;
    onDocumentLoad: (number: number) => void;
}

const PdfDocument: FC<PDFPreviewProps> = ({ url, scale, pageRefs, onDocumentLoad }) => {
    const onDocumentLoadSuccess = (pdf: any) => {
        onDocumentLoad(pdf.numPages);
    };

    return (
        <div className={css.viewer}>
            <div className={css.document}>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(4), (_, index) => (
                        <div key={`page_${index + 1}`} ref={(el) => (pageRefs.current[index] = el)}>
                            <Page scale={scale} pageNumber={index + 1} />
                            <span style={{ color: "transparent" }}>// </span>
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    );
};

export default PdfDocument;
