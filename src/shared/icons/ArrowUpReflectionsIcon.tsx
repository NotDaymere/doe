import React, { FC, SVGProps } from "react";

interface ArrowUpReflectionsIconProps extends SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ArrowUpReflectionsIcon: FC<ArrowUpReflectionsIconProps> = ({
                                                                     fill = "#FF8B12",
                                                                     width = 9,
                                                                     height = 10,
                                                                     opacity = 1,
                                                                     ...props
                                                                 }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 9 10"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_1657_30916)">
            <path
                d="M4.40234 10C4.67763 10 4.87349 9.8094 4.87349 9.53413V2.5622L4.82056 0.984648L4.51881 1.09052L6.41926 3.17098L7.62626 4.35679C7.71099 4.4415 7.83274 4.48384 7.95975 4.48384C8.22445 4.48384 8.41505 4.28268 8.41505 4.02329C8.41505 3.89623 8.37271 3.78506 8.2721 3.67919L4.75703 0.158814C4.65645 0.0529379 4.53469 0 4.40234 0C4.270 0 4.14824 0.0529379 4.04766 0.158814L0.537875 3.67919C0.437293 3.78506 0.389648 3.89623 0.389648 4.02329C0.389648 4.28268 0.580225 4.48384 0.844915 4.48384C0.971967 4.48384 1.09902 4.4415 1.17843 4.35679L2.38541 3.17098L4.28059 1.09052L3.98414 0.984648L3.9312 2.5622V9.53413C3.9312 9.8094 4.12707 10 4.40234 10Z"
                fill={fill}
            />
        </g>
        <defs>
            <clipPath id="clip0_1657_30916">
                <rect width="8.22126" height="10" fill="white" transform="translate(0.389648)" />
            </clipPath>
        </defs>
    </svg>
);

export default ArrowUpReflectionsIcon;