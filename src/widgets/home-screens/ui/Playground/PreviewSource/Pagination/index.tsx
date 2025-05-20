import classNames from "classnames";
import { FC } from "react";
import ArrowLeftIcon from "src/shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "src/shared/icons/ArrowRight.icon";
import css from "./Pagination.module.less";

interface IProps {
    pageRefs: any;
    numPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<IProps> = ({ pageRefs, numPages, currentPage, onPageChange }) => {
    const handleNextPage = (e: any) => {
        e.stopPropagation();
        if (currentPage < numPages - 1) {
            onPageChange(currentPage + 1);
            pageRefs?.current[currentPage + 1]?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handlePrevPage = (e: any) => {
        e.stopPropagation();
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
            pageRefs?.current[currentPage - 1]?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
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
    );
};

export default Pagination;
