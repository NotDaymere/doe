import React, { useEffect, useRef, useState } from "react";
import css from "./CustomDropdownSelect.module.less";
import ArrowDownIcon from "../../../../../../shared/icons/ArrowDown.icon";

interface DropdownOption {
    value: string | number;
    label: string;
}

interface CustomDropdownProps {
    value: string | number;
    options: DropdownOption[];
    onChange: (value: string | number) => void;
    dropdownClass?: string;
    name: string;
}

export const CustomDropdownSelect: React.FC<CustomDropdownProps> = ({
                                                           value,
                                                           options,
                                                           onChange,
                                                           dropdownClass = "",
                                                            name
                                                       }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className={`${css.customDropdown} ${dropdownClass}`}>
            <div
                className={css.dropdownHeader}
                onClick={() => setOpen(!open)}
                data-active={open}>
                <span>{name}</span>
                <span className={css.arrow}>{open
                                                ? <ArrowDownIcon className={css.partial_loaded_files_up_btn} />
                                                : <ArrowDownIcon className={css.partial_loaded_files_down_btn} />}</span>
            </div>
            {open && (
                <ul className={css.dropdownList}>
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            className={css.dropdownItem}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                            <span className={css.selector}></span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};