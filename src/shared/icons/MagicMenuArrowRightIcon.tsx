import React, { FC } from 'react';

interface MagicMenuArrowRightIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const MagicMenuArrowRightIcon: FC<MagicMenuArrowRightIconProps> = ({
                                                                       fill = "#1F1F1F",
                                                                       width = "6",
                                                                       height = "9",
                                                                       opacity = 1,
                                                                       ...props
                                                                   }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 6 9"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_123_1850)">
            <path
                d="M5.99992 4.49741C5.99992 4.36787 5.94977 4.2487 5.8545 4.15544L1.88462 0.134715C1.79439 0.0466321 1.68412 0 1.55379 0C1.29816 0 1.09766 0.202072 1.09766 0.471502C1.09766 0.601035 1.14778 0.720206 1.22798 0.808291L4.87709 4.49741L1.22798 8.18653C1.14778 8.27461 1.09766 8.38857 1.09766 8.52334C1.09766 8.79276 1.29816 8.9948 1.55379 8.9948C1.68412 8.9948 1.79439 8.94816 1.88462 8.85494L5.8545 4.83937C5.94977 4.74093 5.99992 4.62694 5.99992 4.49741Z"
                fill={fill}
            />
        </g>
        <defs>
            <clipPath id="clip0_123_1850">
                <rect width="6" height="9" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default MagicMenuArrowRightIcon;
