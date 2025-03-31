import React from "react";

interface SvgIconProps {
    opacity?: number;
    width?: number;
    height?: number;
}

export const TalkModeIcon: React.FC<SvgIconProps> = ({
                                                    opacity = 0.4,
                                                    width = 26,
                                                    height = 27,
                                                }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 26 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g opacity={opacity} filter="url(#filter0_f_1141_16276)">
                <path
                    d="M18.7706 1.39733C16.3816 2.04358 15.2997 3.69173 15.2347 6.79721L15.1958 8.59717L11.807 8.61885L8.41829 8.64054L8.39665 12.0366L8.37501 15.4327L6.57893 15.4717C3.57969 15.5368 2.04328 16.4866 1.27291 18.755C-0.345726 23.513 5.6138 27.2604 9.19731 23.7385C10.3961 22.5588 10.6255 21.8822 10.6515 19.423L10.6688 17.7488L12.941 17.7271L15.2131 17.7011V19.2451C15.2174 21.5656 15.4858 22.4764 16.4985 23.5477C20.3114 27.5857 26.8119 23.1356 24.3796 18.1521C23.4491 16.2437 21.8781 15.4544 19 15.45H17.4636V13.2077V10.961L19.2164 10.9219C21.5968 10.8612 22.5143 10.5316 23.5746 9.35185C26.8206 5.73458 23.4361 0.130848 18.7706 1.39733ZM21.0514 3.6874C23.0163 4.51147 22.6902 7.34942 21.1683 8.33259C20.8405 8.54435 20.4394 8.59717 20.0491 8.59717H19.052H17.4636V7.309C17.4636 5.69555 17.5502 5.21411 17.9483 4.63292C18.6321 3.63535 19.9608 3.23198 21.0514 3.6874ZM15.2131 13.1947V15.4544L12.941 15.4283L10.6688 15.4067L10.6472 13.173L10.6212 10.9393H12.9193H15.2131V13.1947ZM8.37501 19.2972V20.8889L8.10668 21.4268C6.90352 23.8383 3.32867 22.9665 3.32001 20.2644C3.31568 19.5357 3.5191 19.0499 4.05143 18.5121C4.72225 17.8312 5.10744 17.7314 7.01172 17.7141L8.37501 17.7054V19.2972ZM21.0558 17.9526C21.9646 18.3647 22.4883 19.115 22.5532 20.0952C22.7393 22.9968 18.9005 23.9207 17.693 21.2663C17.5112 20.8673 17.3597 18.1868 17.4982 17.8268C17.5891 17.5883 20.4802 17.6881 21.0558 17.9526Z"
                    fill="url(#paint0_linear_1141_16276)"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_1141_16276"
                    x="0"
                    y="0.214844"
                    width="25.9102"
                    height="25.9102"
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
                    <feGaussianBlur
                        stdDeviation="0.5"
                        result="effect1_foregroundBlur_1141_16276"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_1141_16276"
                    x1="12.9552"
                    y1="1.21459"
                    x2="12.9552"
                    y2="25.125"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF8B12" />
                    <stop offset="1" stopColor="white" stopOpacity="0.51" />
                </linearGradient>
            </defs>
        </svg>
    );
};
