import React, { FC } from 'react';

interface IndividualChatsMarkerIconProps extends React.SVGProps<SVGSVGElement> {
    stroke?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const IndividualChatsMarkerIcon: FC<IndividualChatsMarkerIconProps> = ({
                                                                           stroke = "#F8F8F8",
                                                                           width = "7",
                                                                           height = "26",
                                                                           opacity = 1,
                                                                           ...props
                                                                       }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 7 26"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M1 0L1 19C1 22.3137 3.68629 25 7 25V25"
            stroke={stroke}
        />
    </svg>
);

export default IndividualChatsMarkerIcon;