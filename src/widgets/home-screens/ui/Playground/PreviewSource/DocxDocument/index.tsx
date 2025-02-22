import React, { useState, useEffect } from "react";
import mammoth from "mammoth";
import css from "./DocxDocument.module.less";

interface DocxReaderProps {
    url: string; // The URL of the DOCX file
    itemsPerPage?: number; // Optional: How many characters per "page" (you can adjust this)
}

const DocxReader: React.FC<DocxReaderProps> = ({ url, itemsPerPage = 1000 }) => {
    const [docxContent, setDocxContent] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState<string[]>([]);
    // const pages: string[] = [];

    // Function to fetch and convert DOCX to HTML
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
        fetchDocxContent(url); // Load the DOCX file when the component mounts
    }, [url]);

    // Pagination logic: split the content into smaller chunks
    useEffect(() => {
        if (docxContent) {
            const contentChunks = [];
            for (let i = 0; i < docxContent.length; i += itemsPerPage) {
                contentChunks.push(docxContent.slice(i, i + itemsPerPage));
            }
            setPages(contentChunks); // Store the content in "pages"
            console.log("contentChunks", pages);
        }
    }, [docxContent, itemsPerPage]);

    // Handle navigation
    // const nextPage = () => {
    //     if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    // };

    // const prevPage = () => {
    //     if (currentPage > 0) setCurrentPage(currentPage - 1);
    // };

    return (
        <>
            {pages?.map((page) => (
                <div className={css.page} dangerouslySetInnerHTML={{ __html: page }} />
            ))}
        </>
    );
};

export default DocxReader;
