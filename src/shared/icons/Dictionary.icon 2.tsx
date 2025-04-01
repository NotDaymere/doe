import React, { SVGProps } from "react";

const DictionaryIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" {...props}>
            <g clipPath="url(#clip0_1969_126989)">
                <rect width="48" height="48" rx="12" fill="white" fillOpacity="0.36" />
                <g filter="url(#filter0_d_1969_126989)">
                    <rect
                        x="5"
                        y="5"
                        width="38"
                        height="38"
                        rx="8"
                        fill="white"
                        shapeRendering="crispEdges"
                    />
                    <g clipPath="url(#clip1_1969_126989)">
                        <path
                            d="M18.4048 35.8583H32.0918C32.6208 35.8583 33.0684 35.4242 33.0684 34.8816C33.0684 34.4475 32.77 34.0812 32.3766 33.9456C31.088 33.5115 30.8438 31.8157 32.1325 30.5541C32.5394 30.1743 33.0684 29.6723 33.0684 28.5871V16.4593C33.0684 14.1531 31.929 13 29.6501 13H18.4048C16.1259 13 15 14.1395 15 16.4593V32.3991C15 34.7188 16.1259 35.8583 18.4048 35.8583ZM16.9533 29.2654V16.4864C16.9533 15.5097 17.4824 14.9535 18.4997 14.9535H29.5551C30.5725 14.9535 31.1015 15.5097 31.1015 16.4864V28.3022C31.1015 28.6956 30.8573 28.9262 30.4504 28.9262H18.6218C17.9843 28.9262 17.4281 29.0483 16.9533 29.2654ZM18.4997 33.9049C17.4824 33.9049 16.9533 33.3487 16.9533 32.3855C16.9533 31.4902 17.618 30.8797 18.6218 30.8797H29.3788C29.4602 30.8797 29.528 30.8797 29.5958 30.8797C29.1753 31.9107 29.2024 32.9959 29.6365 33.9049H18.4997ZM18.1877 29.9843H19.7613V14.5058H18.1877V29.9843ZM22.515 26.1452C22.8677 26.1452 23.1389 25.9689 23.2882 25.4941L23.885 23.717H26.9913L27.5882 25.4941C27.7374 25.9689 27.9952 26.1452 28.3614 26.1452C28.8091 26.1452 29.1075 25.8603 29.1075 25.4534C29.1075 25.2906 29.0668 25.1414 28.999 24.9243L26.5709 18.3449C26.3809 17.8158 25.9876 17.5445 25.4314 17.5445C24.8752 17.5445 24.4954 17.8158 24.3055 18.3449L21.8774 24.9243C21.796 25.1414 21.7689 25.2906 21.7689 25.4398C21.7689 25.8603 22.0673 26.1452 22.515 26.1452ZM24.2784 22.5232L25.3772 19.2267H25.4857L26.598 22.5232H24.2784Z"
                            fill="#B5B5B5"
                        />
                    </g>
                </g>
            </g>
            <rect
                x="0.5"
                y="0.5"
                width="47"
                height="47"
                rx="11.5"
                stroke="white"
                strokeOpacity="0.24"
            />
            <defs>
                <filter
                    id="filter0_d_1969_126989"
                    x="-3"
                    y="1"
                    width="54"
                    height="54"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1969_126989"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1969_126989"
                        result="shape"
                    />
                </filter>
                <clipPath id="clip0_1969_126989">
                    <rect width="48" height="48" rx="12" fill="white" />
                </clipPath>
                <clipPath id="clip1_1969_126989">
                    <rect
                        width="18.2583"
                        height="22.8583"
                        fill="white"
                        transform="translate(15 13)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default DictionaryIcon;
