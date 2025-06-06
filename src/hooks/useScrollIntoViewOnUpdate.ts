import { ForwardedRef, useEffect } from "react";

export function useScrollIntoViewOnUpdate<T extends HTMLElement>(
    ref: React.RefObject<T> | ForwardedRef<HTMLDivElement>,
    deps: unknown[]
) {
    useEffect(() => {
        if (ref && typeof ref !== "function" && ref.current) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, deps);
}
