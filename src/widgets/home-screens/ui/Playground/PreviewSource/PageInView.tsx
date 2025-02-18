import { FC, useEffect, useRef } from "react";
import { Page } from "react-pdf";
import { useInViewport } from "../../../lib/hooks/useInViewport";

interface IProps {
    scale: number;
    pageNumber: number;
    onPageChange: (page: number) => void;
}

export const PageInView: FC<IProps> = ({ scale, pageNumber, onPageChange }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isInViewport } = useInViewport(ref);

    useEffect(() => {
        if (isInViewport) {
            onPageChange(pageNumber - 1);
        }
    }, [isInViewport]);

    return (
        <div ref={ref}>
            <Page scale={scale} pageNumber={pageNumber} />
            <span style={{ color: "transparent" }}>// </span>
        </div>
    );
};

export default PageInView;
