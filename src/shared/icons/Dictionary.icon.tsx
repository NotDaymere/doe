import React, { SVGProps } from "react";

const DictionaryIcon: React.FC<SVGProps<SVGSVGElement> & { theme?: "light" | "dark" }> = ({
    theme,
    ...props
}) => {
    return (
        <>
            {theme === "light" || !theme ? (
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
                            id="filter_78_16579_dd"
                            x="-3.000000"
                            y="1.000000"
                            width="54.000000"
                            height="54.000000"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                        <clipPath id="clip78_16578">
                            <rect
                                id="character.book.closed 1"
                                rx="0.000000"
                                width="17.258333"
                                height="21.858334"
                                transform="translate(15.500000 13.500000)"
                                fill="white"
                                fill-opacity="0"
                            />
                        </clipPath>
                        <clipPath id="clip1969_91515">
                            <rect
                                id="bookmarks [dark theme]"
                                rx="11.500000"
                                width="47.000000"
                                height="47.000000"
                                transform="translate(0.500000 0.500000)"
                                fill="white"
                                fill-opacity="0"
                            />
                        </clipPath>
                    </defs>
                    <rect
                        id="bookmarks [dark theme]"
                        rx="11.500000"
                        width="47.000000"
                        height="47.000000"
                        transform="translate(0.500000 0.500000)"
                        fill="#1F1F1F"
                        fill-opacity="1.000000"
                    />
                    <g clip-path="url(#clip1969_91515)">
                        <g filter="url(#filter_78_16579_dd)">
                            <rect
                                id="icon"
                                rx="7.500000"
                                width="37.000000"
                                height="37.000000"
                                transform="translate(5.500000 5.500000)"
                                fill="#FFFFFF"
                                fill-opacity="0.160000"
                            />
                            <rect
                                id="character.book.closed 1"
                                rx="0.000000"
                                width="17.258333"
                                height="21.858334"
                                transform="translate(15.500000 13.500000)"
                                fill="#FFFFFF"
                                fill-opacity="0"
                            />
                            <g clip-path="url(#clip78_16578)">
                                <g opacity="0.000000" />
                                <path
                                    id="Vector"
                                    d="M18.4 35.85L32.09 35.85C32.62 35.85 33.06 35.42 33.06 34.88C33.06 34.44 32.76 34.07 32.37 33.94C31.08 33.5 30.84 31.81 32.13 30.55C32.53 30.17 33.06 29.67 33.06 28.58L33.06 16.46C33.06 14.15 31.92 13 29.65 13L18.4 13C16.12 13 15 14.14 15 16.46L15 32.39C15 34.71 16.12 35.85 18.4 35.85ZM16.95 29.26L16.95 16.48C16.95 15.5 17.48 14.95 18.5 14.95L29.55 14.95C30.57 14.95 31.1 15.5 31.1 16.48L31.1 28.3C31.1 28.69 30.85 28.92 30.45 28.92L18.62 28.92C17.98 28.92 17.42 29.04 16.95 29.26ZM18.5 33.9C17.48 33.9 16.95 33.35 16.95 32.38C16.95 31.49 17.61 30.88 18.62 30.88L29.37 30.88C29.46 30.88 29.52 30.88 29.59 30.88C29.17 31.91 29.2 32.99 29.63 33.9L18.5 33.9ZM18.18 29.98L19.76 29.98L19.76 14.5L18.18 14.5L18.18 29.98ZM22.51 26.14C22.86 26.14 23.13 25.96 23.28 25.49L23.88 23.71L26.99 23.71L27.58 25.49C27.73 25.96 27.99 26.14 28.36 26.14C28.8 26.14 29.1 25.85 29.1 25.45C29.1 25.28 29.06 25.14 28.99 24.92L26.57 18.34C26.38 17.81 25.98 17.54 25.43 17.54C24.87 17.54 24.49 17.81 24.3 18.34L21.87 24.92C21.79 25.14 21.76 25.28 21.76 25.43C21.76 25.85 22.06 26.14 22.51 26.14ZM24.27 22.52L25.37 19.22L25.48 19.22L26.59 22.52L24.27 22.52Z"
                                    fill="#FFFFFF"
                                    fill-opacity="0.600000"
                                    fill-rule="nonzero"
                                />
                            </g>
                        </g>
                    </g>
                    <rect
                        id="bookmarks [dark theme]"
                        rx="11.500000"
                        width="47.000000"
                        height="47.000000"
                        transform="translate(0.500000 0.500000)"
                        stroke="#FFFFFF"
                        stroke-opacity="0.090000"
                        stroke-width="1.000000"
                    />
                </svg>
            )}
        </>
    );
};

export default DictionaryIcon;
