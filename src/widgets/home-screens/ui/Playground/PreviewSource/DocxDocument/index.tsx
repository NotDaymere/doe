import React, { useState, useEffect } from "react";
import mammoth from "mammoth";
import classNames from "classnames";
import css from "./DocxDocument.module.less";

interface DocxReaderProps {
    url: string;
    itemsPerPage?: number;
}

const ITEMS_PER_PAGES = 3000;

const DocxDocument: React.FC<DocxReaderProps> = ({ url, itemsPerPage = ITEMS_PER_PAGES }) => {
    const [docxContent, setDocxContent] = useState<string | null>(null);
    const [pages, setPages] = useState<string[]>([]);

    const fetchDocxContent = async (url: string) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setDocxContent(result.value); // Set converted HTML content
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
        }
    }, [docxContent, itemsPerPage]);

    return (
        <div className={css.document}>
            {pages?.map((page, index) => (
                <div
                    key={`page_${index}`}
                    className={classNames(css.page, css.modalView)}
                    dangerouslySetInnerHTML={{ __html: page }}
                />
            ))}
        </div>
    );
};

export default DocxDocument;
