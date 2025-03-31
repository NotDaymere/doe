import React, { SVGProps } from "react";

const RecordBookmarkIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" {...props}>
            <g clipPath="url(#clip0_1792_30949)">
                <rect width="48" height="48" rx="12" fill="#F0F0F0" />
                <g filter="url(#filter0_d_1792_30949)">
                    <rect
                        x="5"
                        y="5"
                        width="38"
                        height="38"
                        rx="8"
                        fill="white"
                        shapeRendering="crispEdges"
                    />
                    <g clipPath="url(#clip1_1792_30949)">
                        <path
                            d="M11 23.6949C11 26.8465 13.5434 29.3898 16.6949 29.3898H31.2252C34.3768 29.3898 36.9202 26.8465 36.9202 23.6949C36.9202 20.5434 34.3768 18 31.2252 18C28.0737 18 25.5193 20.5434 25.5193 23.6949C25.5193 25.2651 26.1496 26.6806 27.1891 27.6979H20.7311C21.7706 26.6806 22.4009 25.2651 22.4009 23.6949C22.4009 20.5434 19.8575 18 16.6949 18C13.5434 18 11 20.5434 11 23.6949ZM12.7029 23.6838C12.7029 21.4722 14.4944 19.6808 16.706 19.6808C18.9176 19.6808 20.709 21.4722 20.709 23.6838C20.709 25.9066 18.9176 27.6979 16.706 27.6979C14.4944 27.6979 12.7029 25.9066 12.7029 23.6838ZM27.2112 23.6838C27.2112 21.4722 29.0026 19.6808 31.2142 19.6808C33.4258 19.6808 35.2283 21.4722 35.2283 23.6838C35.2283 25.9066 33.4258 27.6979 31.2142 27.6979C29.0026 27.6979 27.2112 25.9066 27.2112 23.6838Z"
                            fill="#B5B5B5"
                        />
                    </g>
                </g>
            </g>
            <rect x="0.5" y="0.5" width="47" height="47" rx="11.5" stroke="#DDDDDD" />
            <defs>
                <filter
                    id="filter0_d_1792_30949"
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
                        result="effect1_dropShadow_1792_30949"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1792_30949"
                        result="shape"
                    />
                </filter>
                <clipPath id="clip0_1792_30949">
                    <rect width="48" height="48" rx="12" fill="white" />
                </clipPath>
                <clipPath id="clip1_1792_30949">
                    <rect
                        width="26.075"
                        height="11.4009"
                        fill="white"
                        transform="translate(11 18)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default RecordBookmarkIcon;
