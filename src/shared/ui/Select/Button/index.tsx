import React from "react";

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button: React.FC<Props> = (props) => {
    return <button {...props} />;
};

Button.displayName = "SelectButton";
