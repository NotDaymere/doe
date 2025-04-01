import React, { FC, SVGProps } from "react";

interface CloseSearchInputIconProps extends SVGProps<SVGSVGElement> {
    stroke?: string;
    strokeWidth?: number | string;
    width?: number | string;
    height?: number | string;
}

const CloseSearchInputIcon: FC<CloseSearchInputIconProps> = ({
                                                                 stroke = "#DDDDDD",
                                                                 strokeWidth = 1.5,
                                                                 width = 12,
                                                                 height = 12,
                                                                 ...props
                                                             }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3.51562 3.1709L9.17248 8.82775"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
        />
        <path
            d="M9.17188 3.1709L3.51502 8.82775"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
        />
    </svg>
);

export default CloseSearchInputIcon;