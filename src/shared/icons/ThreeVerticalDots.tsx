import React, { SVGProps } from "react";

const ThreeVerticalDots: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="#1F1F1F" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11 15.5C11 14.6677 10.3323 14 9.5 14C8.66774 14 8 14.6677 8 15.5C8 16.3323 8.66774 17 9.5 17C10.3323 17 11 16.3323 11 15.5Z"
                 />
            <path
                d="M11 9.5C11 8.66774 10.3323 8 9.5 8C8.66774 8 8 8.66774 8 9.5C8 10.3323 8.66774 11 9.5 11C10.3323 11 11 10.3323 11 9.5Z"
                 />
            <path
                d="M11 3.50005C11 2.66772 10.3323 2 9.5 2C8.66774 2 8 2.66772 8 3.50005C8 4.32256 8.66774 5 9.5 5C10.3323 5 11 4.32256 11 3.50005Z"
                 />
        </svg>
    )
};
export default ThreeVerticalDots;