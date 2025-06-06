import React, { SVGProps } from "react";

const RecordBookmarkIcon: React.FC<SVGProps<SVGSVGElement> & { theme?: "light" | "dark" }> = ({
    theme,
    ...props
}) => {
    return (
        <>
            {theme === "light" || !theme ? (
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
            ) : (
                <svg
                    width="48.000000"
                    height="48.000000"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}
                >
                    <defs>
                        <filter
                            id="filter_87_16587_dd"
                            x="-3.000000"
                            y="1.000000"
                            width="54.000000"
                            height="54.000000"
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
                            <feOffset dx="0" dy="4" />
                            <feGaussianBlur stdDeviation="2.66667" />
                            <feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect_dropShadow_1"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect_dropShadow_1"
                                result="shape"
                            />
                        </filter>
                        <clipPath id="clip87_16586">
                            <rect
                                id="recordingtape 4"
                                rx="0.000000"
                                width="25.075001"
                                height="10.400893"
                                transform="translate(11.500000 18.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <clipPath id="clip1969_57023">
                            <rect
                                id="recording"
                                rx="11.500000"
                                width="47.000000"
                                height="47.000000"
                                transform="translate(0.500000 0.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                    </defs>
                    <rect
                        id="recording"
                        rx="11.500000"
                        width="47.000000"
                        height="47.000000"
                        transform="translate(0.500000 0.500000)"
                        fill="#1F1F1F"
                        fillOpacity="1.000000"
                    />
                    <g clipPath="url(#clip1969_57023)">
                        <g filter="url(#filter_87_16587_dd)">
                            <rect
                                id="icon"
                                rx="7.500000"
                                width="37.000000"
                                height="37.000000"
                                transform="translate(5.500000 5.500000)"
                                fill="#FFFFFF"
                                fillOpacity="0.160000"
                            />
                            <rect
                                id="recordingtape 4"
                                rx="0.000000"
                                width="25.075001"
                                height="10.400893"
                                transform="translate(11.500000 18.500000)"
                                fill="#FFFFFF"
                                fillOpacity="0"
                            />
                            <g clipPath="url(#clip87_16586)">
                                <g opacity="0.000000">
                                    <path
                                        id="Vector"
                                        d="M11 18L37.07 18L37.07 29.39L11 29.39L11 18Z"
                                        fill="#FFFFFF"
                                        fillOpacity="0.600000"
                                        fillRule="evenodd"
                                    />
                                </g>
                                <path
                                    id="Vector"
                                    d="M11 23.69C11 26.84 13.54 29.39 16.69 29.39L31.22 29.39C34.37 29.39 36.91 26.84 36.91 23.69C36.91 20.54 34.37 18 31.22 18C28.07 18 25.51 20.54 25.51 23.69C25.51 25.26 26.14 26.67 27.18 27.69L20.73 27.69C21.77 26.67 22.4 25.26 22.4 23.69C22.4 20.54 19.85 18 16.69 18C13.54 18 11 20.54 11 23.69ZM12.7 23.68C12.7 21.46 14.49 19.67 16.7 19.67C18.91 19.67 20.7 21.46 20.7 23.68C20.7 25.9 18.91 27.69 16.7 27.69C14.49 27.69 12.7 25.9 12.7 23.68ZM27.21 23.68C27.21 21.46 29 19.67 31.21 19.67C33.42 19.67 35.22 21.46 35.22 23.68C35.22 25.9 33.42 27.69 31.21 27.69C29 27.69 27.21 25.9 27.21 23.68Z"
                                    fill="#FFFFFF"
                                    fillOpacity="0.600000"
                                    fillRule="nonzero"
                                />
                            </g>
                        </g>
                    </g>
                    <rect
                        id="recording"
                        rx="11.500000"
                        width="47.000000"
                        height="47.000000"
                        transform="translate(0.500000 0.500000)"
                        stroke="#FFFFFF"
                        strokeOpacity="0.090000"
                        strokeWidth="1.000000"
                    />
                </svg>
            )}
        </>
    );
};

export default RecordBookmarkIcon;
