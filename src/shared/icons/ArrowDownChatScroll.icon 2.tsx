import React, { FC } from 'react';

interface ArrowDownChatScrollIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ArrowDownChatScrollIcon: FC<ArrowDownChatScrollIconProps> = ({
                                                       fill = "#5B5B5B",
                                                       width = "12",
                                                       height = "16",
                                                       opacity = 1,
                                                       ...props
                                                   }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 12 16"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0.941928 10.0257L6.00026 15.084L11.0586 10.0257"
            stroke={fill}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6 0.916407L6 14.9414"
            stroke={fill}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ArrowDownChatScrollIcon;
