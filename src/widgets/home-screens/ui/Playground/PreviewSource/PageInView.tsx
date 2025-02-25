import { FC, ReactNode, useEffect, useRef } from "react";
import { useInViewport } from "../../../lib/hooks/useInViewport";

interface IProps {
    pageNumber: number;
    onPageChange: (page: number) => void;
    children: ReactNode;
}

export const PageInView: FC<IProps> = ({ pageNumber, onPageChange, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isInViewport } = useInViewport(ref);

    useEffect(() => {
        if (isInViewport) {
            onPageChange(pageNumber - 1);
        }
    }, [isInViewport]);

    return <div ref={ref}>{children}</div>;
};

export default PageInView;
