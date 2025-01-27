import React from "react";
import css from "./InputDynamicWidth.module.less";
import clsx from "clsx";

interface Props {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string
}

export const InputDynamicWidth: React.FC<Props> = ({
    onChange,
    value,
    className,
    placeholder
}) => {
    const ref = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const element = ref.current;

        if(element) {
            element.style.width = "";
            element.style.width = element.scrollWidth + "px";
        }
    }, [value]);

    return (
        <input 
            ref={ref}
            value={value}
            onChange={(ev) => onChange(ev.target.value)}
            placeholder={placeholder}
            className={clsx(css.input, className)}
        />
    );
};