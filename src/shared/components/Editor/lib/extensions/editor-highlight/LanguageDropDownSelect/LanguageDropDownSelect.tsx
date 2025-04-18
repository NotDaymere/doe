import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom";
import css from "./LanguageDropDownSelect.module.less"
import ArrowDownIcon from "../../../../../../icons/ArrowDown.icon";

interface LanguageDropDownSelectProps {
    options: { value: string; label: string }[];
    defaultValue: string;
    onChange: (value: string) => void;
}

interface LanguageDropDownListProps {
    options: { value: string; label: string }[];
    onSelect: (value: string) => void;
    triggerRef: React.RefObject<HTMLDivElement>;
}

const LanguageDropDownList: React.FC<LanguageDropDownListProps> = ({ options, onSelect, triggerRef }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const listRef = useRef<HTMLUListElement>(null);
    const [isPositionSet, setIsPositionSet] = useState(false);

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: (rect.top + window.scrollY - rect.height) - 160,
                left: rect.left + window.scrollX,
            });
            setIsPositionSet(true);
        }
    }, [triggerRef]);

    if (!isPositionSet) {
        return null;
    }

    return ReactDOM.createPortal(
        <ul
            ref={listRef}
            className={css.language_select_list}
            style={{
                position: 'absolute',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 1000
            }}
        >
            {options.map((option) => (
                <li
                    className={css.language_select_list_item}
                    key={option.value}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(option.value);
                    }}
                >
                    {option.label}
                </li>
            ))}
        </ul>,
        document.body
    );
};

export const LanguageDropDownSelect: React.FC<LanguageDropDownSelectProps> = ({ options, defaultValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !document.querySelector(`.${css.language_select_list}`)?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
    };

    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || 'Auto';

    return (
        <div ref={dropdownRef} className={css.language_select_menu}>
            <div className={css.language_select_container}>
                <div
                    className={css.language_select_name}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedLabel}
                    <span className={css.arrow}>
                        {isOpen
                            ? <ArrowDownIcon fill="currentColor" className={css.partial_loaded_files_up_btn} />
                            : <ArrowDownIcon fill="currentColor" className={css.partial_loaded_files_down_btn} />}
                    </span>
                </div>
                {isOpen && (
                    <LanguageDropDownList
                        options={options}
                        onSelect={handleSelect}
                        triggerRef={dropdownRef}
                    />
                )}
            </div>
        </div>
    );
};