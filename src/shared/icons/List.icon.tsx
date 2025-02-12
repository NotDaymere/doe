import React, { SVGProps } from "react";

const ListIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="12"
            height="56"
            viewBox="0 0 12 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0.499997 -5.02681e-07L0.499998 4.5C0.499998 8.36599 3.63401 11.5 7.5 11.5L12 11.5"
                stroke="#F8F8F8"
            />
            <path
                d="M0.499997 22L0.499998 26.5C0.499998 30.366 3.63401 33.5 7.5 33.5L12 33.5"
                stroke="#F8F8F8"
            />
            <path
                d="M0.499997 44L0.499998 48.5C0.499998 52.366 3.63401 55.5 7.5 55.5L12 55.5"
                stroke="#F8F8F8"
            />
            <line x1="0.5" y1="2.18557e-08" x2="0.499998" y2="48" stroke="#F8F8F8" />
        </svg>
    );
};

export default ListIcon;
