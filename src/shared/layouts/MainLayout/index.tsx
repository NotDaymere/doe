import React from "react";
import css from "./MainLayout.module.less";

interface Props {
    children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
    children
}) => {
    return (
        <div className={css.root}>
            MainLayout
        </div>
    );
};