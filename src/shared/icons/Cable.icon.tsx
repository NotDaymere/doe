import React, { SVGProps } from "react";

const CableIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 6" fill="none" {...props}>
            <path
                d="M0 3.58017H8.68937V2.4128H0V3.58017ZM8.33811 5.5H15.5054C16.2413 5.5 16.534 5.24684 16.534 4.63502V1.35795C16.534 0.746132 16.2413 0.5 15.5054 0.5H8.33811C7.60214 0.5 7.30944 0.746132 7.30944 1.35795V4.63502C7.30944 5.24684 7.60214 5.5 8.33811 5.5Z"
                fill="#FF8B12"
            />
            <path
                d="M17.5039 4.49657H19.67C20.3976 4.49657 20.6903 4.2434 20.6903 3.62455V2.3728C20.6903 1.76098 20.3976 1.50781 19.67 1.50781H17.5039V4.49657Z"
                fill="#FF8B12"
            />
        </svg>
    );
};

export default CableIcon;
