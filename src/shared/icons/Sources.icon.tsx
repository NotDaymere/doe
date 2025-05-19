import React, { SVGProps } from "react";

const SourcesIcon: React.FC<SVGProps<SVGSVGElement> & { theme?: "light" | "dark" }> = ({
    theme = "light",
    ...props
}) => {
    return (
        <>
            {theme === "light" ? (
                <svg
                    width="137"
                    height="63"
                    viewBox="0 0 137 63"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}
                >
                    <g filter="url(#filter0_b_2659_33316)">
                        <rect
                            x="8"
                            y="5"
                            width="121"
                            height="47"
                            rx="12"
                            fill="white"
                            fillOpacity="0.3"
                        />
                        <rect
                            x="8.5"
                            y="5.5"
                            width="120"
                            height="46"
                            rx="11.5"
                            stroke="#B5B5B5"
                            strokeOpacity="0.2"
                        />
                    </g>
                    <g filter="url(#filter1_bd_2659_33316)">
                        <g clipPath="url(#clip0_2659_33316)">
                            <path
                                d="M12 17C12 12.5817 15.5817 9 20 9H117C121.418 9 125 12.5817 125 17V40C125 44.4183 121.418 48 117 48H20C15.5817 48 12 44.4183 12 40V17Z"
                                fill="url(#paint0_linear_2659_33316)"
                                fillOpacity="0.2"
                                shapeRendering="crispEdges"
                            />
                            <g filter="url(#filter2_d_2659_33316)">
                                <rect
                                    x="24"
                                    y="16"
                                    width="26"
                                    height="26"
                                    rx="6"
                                    fill="#F8F8F8"
                                    fillOpacity="0.4"
                                    shapeRendering="crispEdges"
                                />
                                <g clipPath="url(#clip1_2659_33316)">
                                    <path
                                        d="M33.9605 35.1802H40.4357C41.7479 35.1802 42.404 34.5157 42.404 33.1867V27.738C42.404 26.8781 42.3103 26.5028 41.7713 25.9478L38.5298 22.6332C38.0221 22.1094 37.6004 22 36.8505 22H33.9605C32.6483 22 32 22.6645 32 23.9934V33.1867C32 34.5235 32.6483 35.1802 33.9605 35.1802ZM34.0152 34.0545C33.4294 34.0545 33.1248 33.734 33.1248 33.1711V24.0091C33.1248 23.4462 33.4294 23.1257 34.023 23.1257H36.6552V26.6045C36.6552 27.4175 37.0692 27.8318 37.8815 27.8318H41.2714V33.1711C41.2714 33.734 40.9668 34.0545 40.381 34.0545H34.0152ZM38.0143 26.7765C37.7956 26.7765 37.7019 26.6826 37.7019 26.4638V23.3368L41.0605 26.7765H38.0143Z"
                                        fill="url(#paint1_linear_2659_33316)"
                                        fillOpacity="0.3"
                                    />
                                    <path
                                        d="M39.3808 29.3711H34.8427C34.5927 29.3711 34.4053 29.5509 34.4053 29.7854C34.4053 30.0278 34.5927 30.2154 34.8427 30.2154H39.3808C39.6229 30.2154 39.8026 30.0278 39.8026 29.7854C39.8026 29.5509 39.6229 29.3711 39.3808 29.3711ZM39.3808 31.4974H34.8427C34.5927 31.4974 34.4053 31.685 34.4053 31.9274C34.4053 32.1619 34.5927 32.3417 34.8427 32.3417H39.3808C39.6229 32.3417 39.8026 32.1619 39.8026 31.9274C39.8026 31.685 39.6229 31.4974 39.3808 31.4974Z"
                                        fill="#B5B5B5"
                                        fillOpacity="0.3"
                                    />
                                </g>
                            </g>
                            <g filter="url(#filter3_d_2659_33316)">
                                <rect
                                    x="56"
                                    y="16"
                                    width="26"
                                    height="26"
                                    rx="6"
                                    fill="#F8F8F8"
                                    fillOpacity="0.4"
                                    shapeRendering="crispEdges"
                                />
                                <path
                                    d="M69 35.6157C70.9078 35.6157 72.4657 32.7951 72.4657 29.0137C72.4657 25.2118 70.9147 22.3912 69 22.3912C67.0853 22.3912 65.5343 25.2118 65.5343 29.0137C65.5343 32.7951 67.0921 35.6157 69 35.6157ZM69 23.2216C70.3451 23.2216 71.5461 25.898 71.5461 29.0137C71.5461 32.0745 70.3451 34.7784 69 34.7784C67.6549 34.7784 66.4539 32.0745 66.4539 29.0137C66.4539 25.898 67.6549 23.2216 69 23.2216ZM68.5539 22.4873V35.4853H69.453V22.4873H68.5539ZM69 31.5804C66.8863 31.5804 65.0127 32.1362 64.052 33.0216L64.7451 33.5911C65.651 32.8706 67.1265 32.4794 69 32.4794C70.8736 32.4794 72.349 32.8706 73.2549 33.5911L73.9481 33.0216C72.9873 32.1362 71.1137 31.5804 69 31.5804ZM75.3343 28.5471H62.6657V29.4461H75.3343V28.5471ZM69 26.4539C71.1137 26.4539 72.9873 25.898 73.9481 25.0127L73.2549 24.4431C72.349 25.1569 70.8736 25.5549 69 25.5549C67.1265 25.5549 65.651 25.1569 64.7451 24.4431L64.052 25.0127C65.0127 25.898 66.8863 26.4539 69 26.4539ZM69 36C72.8637 36 76 32.8637 76 29C76 25.1363 72.8637 22 69 22C65.1363 22 62 25.1363 62 29C62 32.8637 65.1363 36 69 36ZM69 35.0667C65.651 35.0667 62.9333 32.349 62.9333 29C62.9333 25.651 65.651 22.9333 69 22.9333C72.349 22.9333 75.0667 25.651 75.0667 29C75.0667 32.349 72.349 35.0667 69 35.0667Z"
                                    fill="url(#paint2_linear_2659_33316)"
                                    fillOpacity="0.3"
                                />
                            </g>
                            <g filter="url(#filter4_d_2659_33316)">
                                <rect
                                    x="88"
                                    y="16"
                                    width="26"
                                    height="26"
                                    rx="6"
                                    fill="#F8F8F8"
                                    fillOpacity="0.4"
                                    shapeRendering="crispEdges"
                                />
                                <g clipPath="url(#clip2_2659_33316)">
                                    <path
                                        d="M97.9051 36H103.095C104.237 36 105 35.3123 105 34.2806V23.7194C105 22.6878 104.237 22 103.095 22H97.9051C96.7634 22 96 22.6878 96 23.7194V34.2806C96 35.3123 96.7634 36 97.9051 36ZM98.0521 34.9353C97.4568 34.9353 97.1276 34.6377 97.1276 34.1087V23.8914C97.1276 23.3623 97.4568 23.0647 98.0521 23.0647H102.955C103.543 23.0647 103.872 23.3623 103.872 23.8914V34.1087C103.872 34.6377 103.543 34.9353 102.955 34.9353H98.0521ZM99.0187 34.4526H101.995C102.184 34.4526 102.318 34.3269 102.318 34.1417C102.318 33.9565 102.184 33.8375 101.995 33.8375H99.0187C98.8296 33.8375 98.6895 33.9565 98.6895 34.1417C98.6895 34.3269 98.8296 34.4526 99.0187 34.4526ZM99.656 24.4667H101.351C101.624 24.4667 101.841 24.2617 101.841 23.9972C101.841 23.7393 101.624 23.5342 101.351 23.5342H99.656C99.3759 23.5342 99.1588 23.7393 99.1588 23.9972C99.1588 24.2617 99.3759 24.4667 99.656 24.4667Z"
                                        fill="url(#paint3_linear_2659_33316)"
                                        fillOpacity="0.3"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                    <path
                        opacity="0.7"
                        d="M99 9L20 9C15.5817 9 12 12.5817 12 17V26"
                        stroke="url(#paint4_linear_2659_33316)"
                        strokeLinecap="round"
                    />
                    <g opacity="0.7" filter="url(#filter5_d_2659_33316)">
                        <path
                            d="M38 48H81.5L117 48C121.418 48 125 44.4183 125 40V31"
                            stroke="url(#paint5_linear_2659_33316)"
                            strokeLinecap="round"
                            shapeRendering="crispEdges"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_b_2659_33316"
                            x="-4"
                            y="-7"
                            width="145"
                            height="71"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
                            <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect1_backgroundBlur_2659_33316"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_backgroundBlur_2659_33316"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter1_bd_2659_33316"
                            x="-8"
                            y="-11"
                            width="153"
                            height="79"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
                            <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect1_backgroundBlur_2659_33316"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="3" />
                            <feGaussianBlur stdDeviation="6" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0 0.121569 0 0 0 0.05 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="effect1_backgroundBlur_2659_33316"
                                result="effect2_dropShadow_2659_33316"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_2659_33316"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter2_d_2659_33316"
                            x="12"
                            y="4"
                            width="50"
                            height="50"
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
                            <feOffset />
                            <feGaussianBlur stdDeviation="6" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2659_33316"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2659_33316"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter3_d_2659_33316"
                            x="44"
                            y="4"
                            width="50"
                            height="50"
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
                            <feOffset />
                            <feGaussianBlur stdDeviation="6" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2659_33316"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2659_33316"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter4_d_2659_33316"
                            x="76"
                            y="4"
                            width="50"
                            height="50"
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
                            <feOffset />
                            <feGaussianBlur stdDeviation="6" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2659_33316"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2659_33316"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter5_d_2659_33316"
                            x="33.5"
                            y="30.5"
                            width="96"
                            height="26"
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
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2659_33316"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2659_33316"
                                result="shape"
                            />
                        </filter>
                        <linearGradient
                            id="paint0_linear_2659_33316"
                            x1="68.5"
                            y1="9"
                            x2="68.5"
                            y2="48"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="#F8F8F8" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_2659_33316"
                            x1="37.202"
                            y1="22"
                            x2="37.202"
                            y2="35.1802"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#B5B5B5" />
                            <stop offset="1" stopColor="#9747FF" />
                        </linearGradient>
                        <linearGradient
                            id="paint2_linear_2659_33316"
                            x1="69"
                            y1="22"
                            x2="69"
                            y2="36"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#B5B5B5" />
                            <stop offset="1" stopColor="#9747FF" />
                        </linearGradient>
                        <linearGradient
                            id="paint3_linear_2659_33316"
                            x1="100.5"
                            y1="22"
                            x2="100.5"
                            y2="36"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#B5B5B5" />
                            <stop offset="1" stopColor="#9747FF" />
                        </linearGradient>
                        <linearGradient
                            id="paint4_linear_2659_33316"
                            x1="88.375"
                            y1="-38.5"
                            x2="-4.5"
                            y2="1.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#A57ADD" stopOpacity="0" />
                            <stop offset="0.38" stopColor="#9E61EE" stopOpacity="0.495" />
                            <stop offset="0.605" stopColor="#9C57F4" stopOpacity="0.315363" />
                            <stop offset="1" stopColor="#9747FF" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient
                            id="paint5_linear_2659_33316"
                            x1="47"
                            y1="81.5"
                            x2="131.5"
                            y2="36.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#A57ADD" stopOpacity="0" />
                            <stop offset="0.38" stopColor="#9E61EE" stopOpacity="0.495" />
                            <stop offset="0.605" stopColor="#9C57F4" stopOpacity="0.315363" />
                            <stop offset="1" stopColor="#9747FF" stopOpacity="0" />
                        </linearGradient>
                        <clipPath id="clip0_2659_33316">
                            <path
                                d="M12 17C12 12.5817 15.5817 9 20 9H117C121.418 9 125 12.5817 125 17V40C125 44.4183 121.418 48 117 48H20C15.5817 48 12 44.4183 12 40V17Z"
                                fill="white"
                            />
                        </clipPath>
                        <clipPath id="clip1_2659_33316">
                            <rect
                                width="10.404"
                                height="13.188"
                                fill="white"
                                transform="translate(32 22)"
                            />
                        </clipPath>
                        <clipPath id="clip2_2659_33316">
                            <rect width="9" height="14" fill="white" transform="translate(96 22)" />
                        </clipPath>
                    </defs>
                </svg>
            ) : (
                <svg
                    width="216.000000"
                    height="157.000000"
                    viewBox="0 0 216 157"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter
                            id="filter_1969_80852_dd"
                            x="0.000000"
                            y="0.000000"
                            width="216.000000"
                            height="157.000000"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            />
                            <feGaussianBlur stdDeviation="20" result="effect_layerBlur_1" />
                        </filter>
                        <filter
                            id="filter_1969_80853_dd"
                            x="47.000000"
                            y="51.000000"
                            width="121.000000"
                            height="47.000000"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feGaussianBlur in="BackgroundImage" stdDeviation="4" />
                            <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect_backgroundBlur_1"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect_backgroundBlur_1"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="filter_1969_80854_dd"
                            x="30.500000"
                            y="37.500000"
                            width="154.000000"
                            height="80.000000"
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
                            <feOffset dx="0" dy="3" />
                            <feGaussianBlur stdDeviation="6.66667" />
                            <feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.039 0"
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
                        <filter
                            id="filter_1969_80855_dd"
                            x="51.000000"
                            y="50.000000"
                            width="50.000000"
                            height="50.000000"
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
                            <feOffset dx="0" dy="0" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.078 0"
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
                        <clipPath id="clip1969_80857">
                            <rect
                                id="text.document 1"
                                rx="0.000000"
                                width="9.404000"
                                height="12.188000"
                                transform="translate(71.500000 68.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <clipPath id="clip1969_80855">
                            <rect
                                id="ICONS"
                                rx="5.500000"
                                width="25.000000"
                                height="25.000000"
                                transform="translate(63.500000 62.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <filter
                            id="filter_1969_80862_dd"
                            x="83.000000"
                            y="50.000000"
                            width="50.000000"
                            height="50.000000"
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
                            <feOffset dx="0" dy="0" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.078 0"
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
                        <clipPath id="clip1969_80863">
                            <rect
                                id="Frame"
                                rx="0.000000"
                                width="15.000000"
                                height="15.000000"
                                transform="translate(100.500000 67.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <clipPath id="clip1969_80862">
                            <rect
                                id="ICONS"
                                rx="5.500000"
                                width="25.000000"
                                height="25.000000"
                                transform="translate(95.500000 62.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <filter
                            id="filter_1969_80865_dd"
                            x="115.000000"
                            y="50.000000"
                            width="50.000000"
                            height="50.000000"
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
                            <feOffset dx="0" dy="0" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.078 0"
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
                        <clipPath id="clip1969_80866">
                            <rect
                                id="Frame"
                                rx="0.000000"
                                width="8.000000"
                                height="13.000000"
                                transform="translate(135.500000 68.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <clipPath id="clip1969_80865">
                            <rect
                                id="ICONS"
                                rx="5.500000"
                                width="25.000000"
                                height="25.000000"
                                transform="translate(127.500000 62.500000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <clipPath id="clip1969_80854">
                            <rect
                                id="icon"
                                rx="8.000000"
                                width="113.000000"
                                height="39.000000"
                                transform="translate(51.000000 55.000000)"
                                fill="white"
                                fillOpacity="0"
                            />
                        </clipPath>
                        <linearGradient
                            x1="76.202003"
                            y1="68.000000"
                            x2="76.202003"
                            y2="81.180153"
                            id="paint_linear_1969_80860_0"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#B5B5B5" />
                            <stop offset="1.000000" stopColor="#9747FF" />
                        </linearGradient>
                        <linearGradient
                            x1="108.000000"
                            y1="68.000000"
                            x2="108.000000"
                            y2="82.000000"
                            id="paint_linear_1969_80864_0"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#B5B5B5" />
                            <stop offset="1.000000" stopColor="#9747FF" />
                        </linearGradient>
                        <linearGradient
                            x1="139.500000"
                            y1="68.000000"
                            x2="139.500000"
                            y2="82.000000"
                            id="paint_linear_1969_80867_0"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#B5B5B5" />
                            <stop offset="1.000000" stopColor="#9747FF" />
                        </linearGradient>
                        <linearGradient
                            x1="127.375031"
                            y1="7.500000"
                            x2="34.500034"
                            y2="47.499981"
                            id="paint_linear_1969_80868_0"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#A57ADD" stopOpacity="0.000000" />
                            <stop offset="0.380000" stopColor="#9E61EE" stopOpacity="0.494118" />
                            <stop offset="0.605000" stopColor="#9C57F4" stopOpacity="0.313726" />
                            <stop offset="1.000000" stopColor="#9747FF" stopOpacity="0.000000" />
                        </linearGradient>
                        <linearGradient
                            x1="85.999992"
                            y1="127.499992"
                            x2="170.500000"
                            y2="82.500008"
                            id="paint_linear_1969_80869_0"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#A57ADD" stopOpacity="0.000000" />
                            <stop offset="0.380000" stopColor="#9E61EE" stopOpacity="0.494118" />
                            <stop offset="0.605000" stopColor="#9C57F4" stopOpacity="0.313726" />
                            <stop offset="1.000000" stopColor="#9747FF" stopOpacity="0.000000" />
                        </linearGradient>
                    </defs>
                    <g opacity="0.300000" filter="url(#filter_1969_80852_dd)">
                        <rect
                            id="glow"
                            x="60.000000"
                            y="60.000000"
                            rx="18.500000"
                            width="96.000000"
                            height="37.000000"
                            fill="#9747FF"
                            fillOpacity="1.000000"
                        />
                    </g>
                    <g filter="url(#filter_1969_80853_dd)">
                        <rect
                            id="Rectangle 15"
                            x="47.000000"
                            y="51.000000"
                            rx="12.000000"
                            width="121.000000"
                            height="47.000000"
                            fill="#1F1F1F"
                            fillOpacity="1.000000"
                        />
                        <rect
                            id="Rectangle 15"
                            x="47.500000"
                            y="51.500000"
                            rx="12.000000"
                            width="120.000000"
                            height="46.000000"
                            stroke="#FFFFFF"
                            strokeOpacity="0.090000"
                            strokeWidth="1.000000"
                        />
                    </g>
                    <g filter="url(#filter_1969_80854_dd)">
                        <rect
                            id="icon"
                            rx="8.000000"
                            width="113.000000"
                            height="39.000000"
                            transform="translate(51.000000 55.000000)"
                            fill="#FFFFFF"
                            fillOpacity="0.070000"
                        />
                        <g clipPath="url(#clip1969_80854)">
                            <g filter="url(#filter_1969_80855_dd)">
                                <rect
                                    id="ICONS"
                                    rx="5.500000"
                                    width="25.000000"
                                    height="25.000000"
                                    transform="translate(63.500000 62.500000)"
                                    fill="#FFFFFF"
                                    fillOpacity="0.110000"
                                />
                                <g clipPath="url(#clip1969_80855)">
                                    <rect
                                        id="Frame"
                                        rx="0.000000"
                                        width="15.000000"
                                        height="15.000000"
                                        transform="translate(68.500000 67.500000)"
                                        fill="#FFFFFF"
                                        fillOpacity="0"
                                    />
                                    <rect
                                        id="text.document 1"
                                        rx="0.000000"
                                        width="9.404000"
                                        height="12.188000"
                                        transform="translate(71.500000 68.500000)"
                                        fill="#FFFFFF"
                                        fillOpacity="0"
                                    />
                                    <g clipPath="url(#clip1969_80857)">
                                        <g opacity="0.000000" />
                                        <path
                                            id="Vector"
                                            d="M72.96 81.17L79.43 81.17C80.74 81.17 81.4 80.51 81.4 79.18L81.4 73.73C81.4 72.87 81.31 72.5 80.77 71.94L77.53 68.63C77.02 68.1 76.6 68 75.85 68L72.96 68C71.64 68 71 68.66 71 69.99L71 79.18C71 80.52 71.64 81.17 72.96 81.17ZM73.01 80.05C72.42 80.05 72.12 79.73 72.12 79.17L72.12 70C72.12 69.44 72.42 69.12 73.02 69.12L75.65 69.12L75.65 72.6C75.65 73.41 76.06 73.83 76.88 73.83L80.27 73.83L80.27 79.17C80.27 79.73 79.96 80.05 79.38 80.05L73.01 80.05ZM77.01 72.77C76.79 72.77 76.7 72.68 76.7 72.46L76.7 69.33L80.06 72.77L77.01 72.77Z"
                                            fill="url(#paint_linear_1969_80860_0)"
                                            fillOpacity="1.000000"
                                            fillRule="nonzero"
                                        />
                                        <path
                                            id="Vector"
                                            d="M78.38 75.37L73.84 75.37C73.59 75.37 73.4 75.55 73.4 75.78C73.4 76.02 73.59 76.21 73.84 76.21L78.38 76.21C78.62 76.21 78.8 76.02 78.8 75.78C78.8 75.55 78.62 75.37 78.38 75.37ZM78.38 77.49L73.84 77.49C73.59 77.49 73.4 77.68 73.4 77.92C73.4 78.16 73.59 78.33 73.84 78.33L78.38 78.33C78.62 78.33 78.8 78.16 78.8 77.92C78.8 77.68 78.62 77.49 78.38 77.49Z"
                                            fill="#B5B5B5"
                                            fillOpacity="0.600000"
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                            </g>
                            <g filter="url(#filter_1969_80862_dd)">
                                <rect
                                    id="ICONS"
                                    rx="5.500000"
                                    width="25.000000"
                                    height="25.000000"
                                    transform="translate(95.500000 62.500000)"
                                    fill="#FFFFFF"
                                    fillOpacity="0.110000"
                                />
                                <g clipPath="url(#clip1969_80862)">
                                    <rect
                                        id="Frame"
                                        rx="0.000000"
                                        width="15.000000"
                                        height="15.000000"
                                        transform="translate(100.500000 67.500000)"
                                        fill="#FFFFFF"
                                        fillOpacity="0"
                                    />
                                    <g clipPath="url(#clip1969_80863)">
                                        <path
                                            id="Vector"
                                            d="M108 81.61C109.9 81.61 111.46 78.79 111.46 75.01C111.46 71.21 109.91 68.39 108 68.39C106.08 68.39 104.53 71.21 104.53 75.01C104.53 78.79 106.09 81.61 108 81.61ZM108 69.22C109.34 69.22 110.54 71.89 110.54 75.01C110.54 78.07 109.34 80.77 108 80.77C106.65 80.77 105.45 78.07 105.45 75.01C105.45 71.89 106.65 69.22 108 69.22ZM107.55 68.48L107.55 81.48L108.45 81.48L108.45 68.48L107.55 68.48ZM108 77.58C105.88 77.58 104.01 78.13 103.05 79.02L103.74 79.58C104.65 78.87 106.12 78.48 108 78.48C109.87 78.48 111.34 78.87 112.25 79.58L112.94 79.02C111.98 78.13 110.11 77.58 108 77.58ZM114.33 74.54L101.66 74.54L101.66 75.44L114.33 75.44L114.33 74.54ZM108 72.45C110.11 72.45 111.98 71.89 112.94 71.01L112.25 70.44C111.34 71.15 109.87 71.55 108 71.55C106.12 71.55 104.65 71.15 103.74 70.44L103.05 71.01C104.01 71.89 105.88 72.45 108 72.45ZM108 82C111.86 82 115 78.86 115 75C115 71.13 111.86 68 108 68C104.13 68 101 71.13 101 75C101 78.86 104.13 82 108 82ZM108 81.06C104.65 81.06 101.93 78.34 101.93 75C101.93 71.65 104.65 68.93 108 68.93C111.34 68.93 114.06 71.65 114.06 75C114.06 78.34 111.34 81.06 108 81.06Z"
                                            fill="url(#paint_linear_1969_80864_0)"
                                            fillOpacity="1.000000"
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                            </g>
                            <g filter="url(#filter_1969_80865_dd)">
                                <rect
                                    id="ICONS"
                                    rx="5.500000"
                                    width="25.000000"
                                    height="25.000000"
                                    transform="translate(127.500000 62.500000)"
                                    fill="#FFFFFF"
                                    fillOpacity="0.110000"
                                />
                                <g clipPath="url(#clip1969_80865)">
                                    <rect
                                        id="Frame"
                                        rx="0.000000"
                                        width="8.000000"
                                        height="13.000000"
                                        transform="translate(135.500000 68.500000)"
                                        fill="#FFFFFF"
                                        fillOpacity="0"
                                    />
                                    <g clipPath="url(#clip1969_80866)">
                                        <path
                                            id="Vector"
                                            d="M136.9 82L142.09 82C143.23 82 144 81.31 144 80.28L144 69.71C144 68.68 143.23 68 142.09 68L136.9 68C135.76 68 135 68.68 135 69.71L135 80.28C135 81.31 135.76 82 136.9 82ZM137.05 80.93C136.45 80.93 136.12 80.63 136.12 80.1L136.12 69.89C136.12 69.36 136.45 69.06 137.05 69.06L141.95 69.06C142.54 69.06 142.87 69.36 142.87 69.89L142.87 80.1C142.87 80.63 142.54 80.93 141.95 80.93L137.05 80.93ZM138.01 80.45L140.99 80.45C141.18 80.45 141.31 80.32 141.31 80.14C141.31 79.95 141.18 79.83 140.99 79.83L138.01 79.83C137.82 79.83 137.68 79.95 137.68 80.14C137.68 80.32 137.82 80.45 138.01 80.45ZM138.65 70.46L140.35 70.46C140.62 70.46 140.84 70.26 140.84 69.99C140.84 69.73 140.62 69.53 140.35 69.53L138.65 69.53C138.37 69.53 138.15 69.73 138.15 69.99C138.15 70.26 138.37 70.46 138.65 70.46Z"
                                            fill="url(#paint_linear_1969_80867_0)"
                                            fillOpacity="1.000000"
                                            fillRule="nonzero"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                        <rect
                            id="icon"
                            rx="8.000000"
                            width="113.000000"
                            height="39.000000"
                            transform="translate(51.000000 55.000000)"
                            stroke="#FFFFFF"
                            strokeOpacity="0.110000"
                            strokeWidth="1.000000"
                        />
                    </g>
                    <path
                        id="Line 58"
                        d="M138 55.5L59 55.5Q57.47 55.5 56.08 56.08Q54.73 56.66 53.69 57.69Q52.65 58.73 52.08 60.08Q51.5 61.47 51.5 63L51.5 72L50.5 72L50.5 63Q50.5 61.26 51.16 59.69Q51.81 58.16 52.98 56.98Q54.16 55.81 55.69 55.16Q57.27 54.5 59 54.5L138 54.5L138 55.5ZM137.98 54.51L138 54.5C138.28 54.5 138.5 54.71 138.5 55C138.5 55.28 138.28 55.5 138 55.5L137.98 55.48L137.98 54.51ZM51.48 71.98L51.5 72C51.5 72.28 51.28 72.5 51 72.5C50.71 72.5 50.5 72.28 50.5 72L50.51 71.98L51.48 71.98Z"
                        fill="url(#paint_linear_1969_80868_0)"
                        fillOpacity="1.000000"
                        fillRule="evenodd"
                    />
                    <path
                        id="Line 59"
                        d="M77 93.5L156 93.5Q157.52 93.5 158.91 92.91Q160.26 92.33 161.3 91.3Q162.34 90.26 162.91 88.91Q163.5 87.52 163.5 86L163.5 77L164.5 77L164.5 86Q164.5 87.73 163.83 89.3Q163.18 90.83 162.01 92.01Q160.83 93.18 159.3 93.83Q157.72 94.5 156 94.5L77 94.5L77 93.5ZM77.01 94.48L77 94.5C76.71 94.5 76.5 94.28 76.5 94C76.5 93.71 76.71 93.5 77 93.5L77.01 93.51L77.01 94.48ZM163.52 77.01L163.5 77C163.5 76.71 163.72 76.5 164 76.5C164.28 76.5 164.5 76.71 164.5 77L164.48 77.01L163.52 77.01Z"
                        fill="url(#paint_linear_1969_80869_0)"
                        fillOpacity="1.000000"
                        fillRule="evenodd"
                    />
                </svg>
            )}
        </>
    );
};

export default SourcesIcon;
