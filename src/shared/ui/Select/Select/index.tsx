import React from 'react';
import clsx from 'clsx';
import { useClickOut } from 'src/shared/hooks/useClickOut';
import css from './select.module.scss';
// import ArrowDownIcon from 'shared/icons/ArrowDown.icon';

interface Props<T> {
    children: React.ReactNode;
    placeholder?: string;
    className?: string;
    classNameButton?: string;
    classNameOption?: string;
    classNameDropdown?: string;
    onChange?: (value: T | null) => void;
    nullable?: boolean;
    maxSize?: boolean;
}

interface SelectedItem<T> {
    value: T;
    selected: true;
    children: React.ReactNode;
}

export function Select<T>({
    children,
    onChange,
    placeholder,
    className,
    classNameButton,
    classNameOption,
    classNameDropdown,
    nullable,
    maxSize,
}: Props<T>) {
    const [active, setActive] = React.useState(false);
    const ref = useClickOut({
        handler: () => setActive(false)
    });

    const options = React.Children.toArray(children).filter(
        (option) => (option as any).type.displayName === 'SelectOption'
    );

    const button = React.Children.toArray(children).find(
        (option) => (option as any).type.displayName === 'SelectButton'
    ) as any;

    const selected = (
        options.find((option) => (option as any).props.selected) as any
    )?.props as SelectedItem<T> | undefined;

    const toggleActive = () => setActive(!active);

    const handleChange = (value: T) => {
        if (onChange) {
            const nextValue = value === selected?.value ? null : value;
            if (nextValue === null && !nullable) {
                return;
            }
            onChange(nextValue);
            setActive(false);
        }
    };

    return (
        <div
            className={clsx(css.select, active && css._active, className)}
            ref={ref}
        >
            {button ? (
                React.cloneElement(button, {
                    ...button.props,
                    onClick: (ev: any) => {
                        button.props.onClick?.(ev);
                        toggleActive();
                    },
                    className: clsx(
                        button.props.className,
                        active && '_select_active'
                    ),
                })
            ) : (
                <button
                    className={clsx(css.select_btn, classNameButton)}
                    onClick={toggleActive}
                >
                    <span className={css.select_value}>
                        {maxSize && (
                            <span className={css.select_hidden} data-hidden>
                                {options.map((item, id) => (
                                    <span key={id}>
                                        {(item as any).props.children}{' '}
                                    </span>
                                ))}
                            </span>
                        )}
                        {selected?.children || placeholder || 'Select'}
                    </span>
                    {/* <ArrowDownIcon className={css.select_btn_icon} /> */}
                </button>
            )}
            {active && (
                <ul className={clsx(css.select_dropdown, classNameDropdown)}>
                    {options.map((option, id) => {
                        const data = (option as any).props as SelectedItem<T>;
                        return (
                            <li
                                className={clsx(
                                    css.select_dropdown_item,
                                    data.selected && css._active,
                                    nullable && css._nullable,
                                    classNameOption
                                )}
                                onClick={() => handleChange(data.value)}
                                key={id}
                            >
                                {data.children}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
