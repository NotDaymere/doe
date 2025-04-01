import React, { SVGProps } from "react";

const StopIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" fill="none" {...props}>
            <path
                d="M0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4Z"
                fill="white"
            />
            <path
                d="M0 6.91534C0 7.59754 0.412523 8 1.10006 8H6.89994C7.59241 8 8 7.59754 8 6.91534V1.08466C8 0.402453 7.59241 0 6.89994 0H1.10006C0.412523 0 0 0.402453 0 1.08466V6.91534Z"
                fill="#FF474A"
            />
        </svg>
    );
};

export default StopIcon;
