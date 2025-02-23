import React, { SVGProps } from "react";

const SendIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.72216 11.9993C7.10872 11.9993 7.38252 11.6628 7.58122 11.1418L11.0979 1.8555C11.1946 1.60584 11.2483 1.38331 11.2483 1.19878C11.2483 0.846005 11.0336 0.628906 10.6846 0.628906C10.502 0.628906 10.2819 0.683182 10.0349 0.780875L0.8 4.35754C0.348993 4.53122 0 4.80801 0 5.20421C0 5.70355 0.375839 5.87178 0.891272 6.02917L4.76778 7.17978L5.89532 11.0495C6.05635 11.5977 6.22283 11.9993 6.72216 11.9993ZM5.00939 6.3548L1.3047 5.20964C1.21879 5.1825 1.19195 5.16079 1.19195 5.1228C1.19195 5.08481 1.21342 5.05767 1.29396 5.02511L8.55299 2.24628C8.98254 2.08345 9.39594 1.86636 9.79328 1.68182C9.43893 1.97491 8.99865 2.32226 8.70336 2.62077L5.00939 6.3548ZM6.80804 10.8053C6.7651 10.8053 6.7436 10.7673 6.71677 10.6805L5.58386 6.93557L9.27784 3.2015C9.56775 2.90842 9.92748 2.45252 10.2121 2.08345C10.0295 2.49594 9.80939 2.91385 9.64829 3.35347L6.8993 10.6913C6.86709 10.7728 6.84564 10.8053 6.80804 10.8053Z"
                fill="white" />
        </svg>
    );
};

export default SendIcon;
