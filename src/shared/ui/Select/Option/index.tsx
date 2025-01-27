import React from "react";
// import css from "./option.module.scss";

interface Props {
    value: string | number | boolean | object;
    children: React.ReactNode;
    className?: string;
    selected?: boolean;
}

export const Option: React.FC<Props> = () => {
    return null;
};

Option.displayName = "SelectOption";