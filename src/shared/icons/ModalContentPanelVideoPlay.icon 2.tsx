import React, { FC } from 'react';

interface ModalContentPanelVideoPlayIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ModalContentPanelVideoPlayIcon: FC<ModalContentPanelVideoPlayIconProps> = ({
                                               fill = "#B5B5B5",
                                               width = "21",
                                               height = "20",
                                               opacity = 1,
                                               ...props
                                           }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 21 20"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_1303_24292)">
            <path
                d="M9.96094 19.9219C15.459 19.9219 19.9219 15.459 19.9219 9.96094C19.9219 4.46289 15.459 0 9.96094 0C4.46289 0 0 4.46289 0 9.96094C0 15.459 4.46289 19.9219 9.96094 19.9219ZM9.96094 18.2617C5.37109 18.2617 1.66016 14.5508 1.66016 9.96094C1.66016 5.37109 5.37109 1.66016 9.96094 1.66016C14.5508 1.66016 18.2617 5.37109 18.2617 9.96094C18.2617 14.5508 14.5508 18.2617 9.96094 18.2617Z"
                fill={fill}
            />
            <path
                d="M8.13477 13.7793L13.6914 10.4883C14.1016 10.2539 14.0918 9.68749 13.6914 9.44335L8.13477 6.15233C7.71484 5.90819 7.1582 6.09374 7.1582 6.57226V13.3594C7.1582 13.8281 7.67578 14.0527 8.13477 13.7793Z"
                fill={fill}
            />
        </g>
        <defs>
            <clipPath id="clip0_1303_24292">
                <rect width="20.2832" height="19.9316" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default ModalContentPanelVideoPlayIcon;
