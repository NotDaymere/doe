import React from "react";
import css from "./PdfFilePreviewModal.module.less";
import ArrowRightButtonIcon from "../../../../../shared/icons/ArrowRightButton.icon";
import ArrowLeftButtonIcon from "../../../../../shared/icons/ArrowLeftButton.icon";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPrev, onNext }) => (
    <div className={css.modalPdfPageSlideWrapper}>
        <button onClick={onPrev} disabled={currentPage <= 1}>
            <ArrowLeftButtonIcon opacity={currentPage <= 1 ? 0.3 : 1} />
        </button>
        <span>
            {currentPage} / {totalPages}
        </span>
        <button onClick={onNext} disabled={currentPage >= totalPages}>
            <ArrowRightButtonIcon opacity={currentPage >= totalPages ? 0.3 : 1} />
        </button>
    </div>
);

export default PaginationControls;