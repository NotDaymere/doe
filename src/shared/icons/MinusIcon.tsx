import React, { SVGProps } from "react";

const MinusIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z" fill="white"/>
            <path d="M5 10H15" stroke="#8D8D8D" stroke-linecap="round"/>
        </svg>
    )
};
export default MinusIcon;