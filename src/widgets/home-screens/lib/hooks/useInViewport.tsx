import { type MutableRefObject, useEffect, useState } from "react";

export const useInViewport = (elementRef: MutableRefObject<HTMLElement | null>) => {
    const [isInViewport, setIsInViewport] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);
        elementRef?.current && observer.observe(elementRef?.current);

        return () => {
            elementRef?.current && observer.unobserve(elementRef?.current);
        };
    }, [elementRef]);

    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
        setIsInViewport(entry.isIntersecting);
    };

    return { isInViewport };
};
