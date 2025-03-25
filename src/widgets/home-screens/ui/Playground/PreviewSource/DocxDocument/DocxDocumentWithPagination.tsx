import React, { useState, useEffect } from "react";
import mammoth from "mammoth";
import PageInView from "../PageInView";
import classNames from "classnames";
import css from "./DocxDocument.module.less";

interface DocxReaderProps {
    url: string;
    scale: number;
    onSetPages: (pages: number) => void;
    pageRefs: any;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
}

const ITEMS_PER_PAGES = 3000;

const DocxDocumentWithPagination: React.FC<DocxReaderProps> = ({
    url,
    scale,
    pageRefs,
    onSetPages,
    onPageChange,
    itemsPerPage = ITEMS_PER_PAGES,
}) => {
    const [docxContent, setDocxContent] = useState<string | null>(null);
    const [pages, setPages] = useState<string[]>([]);

    const fetchDocxContent = async (url: string) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setDocxContent(result.value);
        } catch (error) {
            console.error("Error loading DOCX file:", error);
        }
    };

    useEffect(() => {
        fetchDocxContent(url);
    }, [url]);

    useEffect(() => {
        if (docxContent) {
            const contentChunks = [];
            for (let i = 0; i < docxContent.length; i += itemsPerPage) {
                contentChunks.push(docxContent.slice(i, i + itemsPerPage));
            }
            setPages(contentChunks);
            onSetPages(contentChunks.length);
        }
    }, [docxContent, itemsPerPage]);

    return (
        <div className={css.document}>
            {Array.from(new Array(pages.length)).map((_, index) => {
                const pageIndex = index;

                const refCallback = (el: any) => {
                    if (pageRefs.current) pageRefs.current[pageIndex] = el;
                };

                return (
                    <div
                        key={`page_${pageIndex + 1}`}
                        ref={refCallback}
                        className={classNames(css.page, css.modalView)}
                    >
                        <PageInView pageNumber={pageIndex + 1} onPageChange={onPageChange}>
                            <div
                                className={classNames(css.page, css.modalView)}
                                dangerouslySetInnerHTML={{ __html: pages[index] }}
                                style={{ transform: `scale(${scale})` }}
                            />
                        </PageInView>
                    </div>
                );
            })}
        </div>
    );
};

export default DocxDocumentWithPagination;
