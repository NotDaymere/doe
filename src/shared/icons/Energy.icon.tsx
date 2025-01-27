import React, { SVGProps } from "react";

const EnergyIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 18 18"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 9.5216C3 9.8052 3.23765 10.0161 3.57035 10.0161H8.04602L5.6854 15.9056C5.37646 16.6545 6.22407 17.0544 6.75481 16.4436L13.9555 8.18379C14.0902 8.03108 14.1615 7.88565 14.1615 7.71842C14.1615 7.44212 13.9238 7.22399 13.5911 7.22399H9.11542L11.476 1.33446C11.785 0.585546 10.9374 0.185639 10.4066 0.803677L3.20596 9.05625C3.07129 9.21626 3 9.36167 3 9.5216Z"
                stroke="none"
            />
        </svg>
    );
};

export default EnergyIcon;
