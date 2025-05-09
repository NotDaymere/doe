import clsx from "clsx";
import styles from "./ModalButton.module.less";
import React from "react";

export type ModalButtonProps = {
    variant: "primary" | "secondary" | "outline primary" | "outline secondary" | "delete";
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ModalButton = ({ children, variant, className, ...props }: ModalButtonProps) => {
    const variants = {
        primary: styles.primary,
        secondary: styles.secondary,
        "outline primary": clsx(styles.outline, styles.outline__primary),
        "outline secondary": clsx(styles.outline, styles.outline__secondary),
        delete: styles.delete,
    };
    return (
        <button className={clsx(variants[variant], className)} {...props}>
            {children}
        </button>
    );
};
