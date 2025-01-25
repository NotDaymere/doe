import React, { SVGProps } from "react";

const ArrowUpIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.78775 5.18385L6.49983 1.89594L3.21191 5.18385"
                fill="none"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.5 11.1042V1.98798"
                fill="none"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowUpIcon;
