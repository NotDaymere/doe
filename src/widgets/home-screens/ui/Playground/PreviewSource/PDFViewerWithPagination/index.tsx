import classNames from "classnames";
import { useState, FC, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import ArrowLeftIcon from "src/shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "src/shared/icons/ArrowRight.icon";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./PDFViewerWithPagination.module.less";

interface PDFPreviewProps {
    url: string;
}

const PdfViewerWithPagination: FC<PDFPreviewProps> = ({ url }) => {
    const pageRefs = useRef<any>({});
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numPages, setNumPages] = useState<number>(0);

    useEffect(() => {
        pageRefs.current[currentPage]?.scrollIntoView({ behavior: "smooth" });
    }, [currentPage]);

    const onDocumentLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
    };

    const handleNextPage = (e: any) => {
        e.stopPropagation();
        if (currentPage < numPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = (e: any) => {
        e.stopPropagation();
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className={css.pagination}>
                <button onClick={handlePrevPage}>
                    <ArrowLeftIcon
                        width={10}
                        height={8}
                        className={classNames(css.icon, {
                            [css.disabled]: currentPage === 0,
                        })}
                    />
                </button>
                <div>
                    {currentPage + 1}/<span className={css.numPages}>{numPages}</span>
                </div>
                <button onClick={handleNextPage}>
                    <ArrowRightIcon
                        width={10}
                        height={8}
                        className={classNames(css.icon, {
                            [css.disabled]: currentPage === numPages - 1,
                        })}
                    />
                </button>
            </div>
            <div className={css.document}>
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <div key={`page_${index + 1}`} ref={(el) => (pageRefs.current[index] = el)}>
                            <Page scale={0.7} pageNumber={index + 1} />
                        </div>
                    ))}
                </Document>
            </div>
        </>
    );
};

export default PdfViewerWithPagination;
