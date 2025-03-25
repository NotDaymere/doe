import { useRef, type ReactNode, useLayoutEffect } from "react";
import { clsx } from "clsx";
import css from "./ScalableContainer.module.less";

type ScalableContainerProps = {
    children: ReactNode;
    isContentCentered?: boolean;
    className?: string;
};

const setCssVar = (element: HTMLElement | null, name: string, value: string) => {
    element?.style.setProperty(name, value);
};

export const SCALABLE_CONTAINER_FACTOR = "--scalable-container-factor";

export const ScalableContainer = ({
    children,
    isContentCentered = true,
    className,
}: ScalableContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const containerHeight = containerRef.current?.clientHeight || 0;
            const innerContainerHeight = innerContainerRef.current?.clientHeight || 0;
            const scaleHeight = containerHeight / innerContainerHeight;

            const containerWidth = containerRef.current?.clientWidth || 0;
            const innerContainerWidth = innerContainerRef.current?.clientWidth || 0;
            const scaleWidth = containerWidth / innerContainerWidth;

            const scale = Math.min(scaleHeight, scaleWidth);

            setCssVar(
                containerRef.current,
                SCALABLE_CONTAINER_FACTOR,
                String(scale < 1 ? scale : 1)
            );
        });

        containerRef.current && resizeObserver.observe(containerRef.current);
        innerContainerRef.current && resizeObserver.observe(innerContainerRef.current);

        return () => resizeObserver.disconnect();
    }, [containerRef.current, innerContainerRef.current]);

    return (
        <div
            ref={containerRef}
            className={clsx(css.container, { [css.centered]: isContentCentered })}
        >
            <div ref={innerContainerRef} className={clsx(css.innerContainer, className)}>
                {children}
            </div>
        </div>
    );
};
