import ArrowLeftIcon from "src/shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "src/shared/icons/ArrowRight.icon";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import css from "./Pagination.module.less";

interface IProps {
    pageRefs: any;
    numPages: number;
}

const Pagination: FC<IProps> = ({ pageRefs, numPages }) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        pageRefs?.current[currentPage]?.scrollIntoView({ behavior: "smooth" });
    }, [currentPage]);

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
