import React, { SVGProps } from "react";

const MinusIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 2" fill="none" {...props}>
            <path
                d="M0.743688 2H11.2655C11.6603 2 12 1.54321 12 0.999999C12 0.45679 11.6603 0 11.2655 0H0.743688C0.339709 0 0 0.45679 0 0.999999C0 1.54321 0.339709 2 0.743688 2Z"
                fill="#DBD8D8"
            />
        </svg>
    );
};

export default MinusIcon;
