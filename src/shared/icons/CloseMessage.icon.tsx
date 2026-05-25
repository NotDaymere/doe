import React from "react";

interface CloseMessageIconProps {
    size?: number;
    color?: string;
}

export const CloseMessageIcon: React.FC<CloseMessageIconProps> = ({
    size = 24,
    color = "#cdcdcd",
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12Z"
            fill={color}
            fillOpacity="0.2"
        />
        <path
            d="M0.5 12C0.5 5.64873 5.64873 0.5 12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12Z"
            stroke={color}
        />
        <path d="M8 8L15.7782 15.7782" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 16L15.7782 8.22182" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);
