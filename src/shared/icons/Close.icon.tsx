import React, { FC } from 'react';

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;      // Цвет заливки фона (по умолчанию "#F8F8F8")
    stroke?: string;    // Цвет обводки (по умолчанию "#DDDDDD")
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const CloseIcon: FC<CloseIconProps> = ({
                                                       fill = "#F8F8F8",
                                                       stroke = "#DDDDDD",
                                                       width = "24",
                                                       height = "24",
                                                       opacity = 1,
                                                       ...props
                                                   }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12Z"
            fill={fill}
        />
        <path
            d="M0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12Z"
            stroke={stroke}
        />
        <path
            d="M8 8L15.7782 15.7782"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M8 16L15.7782 8.22182"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export default CloseIcon;

