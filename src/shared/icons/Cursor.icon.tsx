import React, { SVGProps } from "react";

const CursorIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="12"
            height="21"
            viewBox="0 0 12 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1978_54464)">
                <path
                    d="M9.54111 18.5066L6.02548 10.3132L5.5665 11.114L10.4298 11.3874C11.0841 11.4265 11.3966 10.7234 10.9278 10.2449L1.25986 0.362032C0.830172 -0.077421 0.16611 0.16672 0.156344 0.781954L9.41851e-05 14.532C-0.00967144 15.2058 0.742282 15.4792 1.18173 14.9812L4.3165 11.5046L3.4083 11.2703L6.80673 19.6492C6.93369 19.9812 7.27548 20.1374 7.57822 20.0007L9.26767 19.3074C9.58017 19.1902 9.68759 18.8289 9.54111 18.5066Z"
                    fill="black"
                    fillOpacity="0.6"
                />
            </g>
            <defs>
                <clipPath id="clip0_1978_54464">
                    <rect width="11.4553" height="20.0501" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default CursorIcon;
