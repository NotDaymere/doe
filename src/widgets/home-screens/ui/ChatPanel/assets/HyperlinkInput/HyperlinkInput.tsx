import React, { FC, useRef, useState, useEffect } from "react";
import { Input } from "antd";
import css from "./HyperlinkInput.module.css"

type Props = {
    inputPosition: { top: number; left: number | null } | null;
};

export const HyperlinkInput: FC<Props> = ({ inputPosition }) => {
    const [isVisible, setIsVisible] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!inputPosition || !isVisible) return null;

    return (
        <div ref={wrapperRef}>
            <Input
                type="text"
                placeholder="Enter URL"
                style={{
                    position: "fixed",
                    top: `${inputPosition.top}px`,
                    left: `${inputPosition.left}px`,
                    width: "fit-content"
                }}
                className={css.link_input}
            />
        </div>
    );
};
