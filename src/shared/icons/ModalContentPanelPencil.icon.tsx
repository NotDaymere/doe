import React, { FC } from 'react';

interface ModalContentPanelPencilIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ModalContentPanelPencilIcon: FC<ModalContentPanelPencilIconProps> = ({
                                               fill = "#B5B5B5",
                                               width = "18",
                                               height = "20",
                                               opacity = 1,
                                               ...props
                                           }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 18 20"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_150_1581)">
            <path
                d="M12.5521 2.36819L11.6572 3.27015C10.286 2.45343 8.74036 1.97808 7.2112 1.97808C3.54161 1.97808 1.33985 4.59672 1.33985 7.98054C1.33985 12.019 4.40206 16.6867 10.4253 17.5623C10.8133 17.6133 10.9989 17.8939 10.9989 18.1744C10.9989 18.4806 10.7543 18.8036 10.2819 18.7441C4.89977 18.217 0.150391 13.6089 0.150391 8.01454C0.150391 3.91656 2.89204 0.779297 7.24495 0.779297C9.07423 0.779297 10.9312 1.35838 12.5521 2.36819Z"
                fill={fill}
            />
            <path
                d="M17.5451 10.7522C17.5451 13.745 15.5036 15.7684 12.6102 15.7684C10.6639 15.7684 8.53814 14.8561 6.89021 13.3776L8.18505 12.7999C9.50727 13.9191 11.1124 14.6291 12.5933 14.6291C14.66 14.6291 16.3809 13.1583 16.3809 10.7437C16.3809 9.13012 15.8142 7.57549 14.8759 6.24009L15.7561 5.35634C16.8668 6.90108 17.5451 8.75149 17.5451 10.7522Z"
                fill={fill}
            />
            <path
                d="M7.59127 11.7307L15.1667 4.10435L13.9097 2.84605L6.34276 10.4639L5.64259 12.0878C5.57509 12.2663 5.75225 12.4534 5.93783 12.3854L7.59127 11.7307Z"
                fill={fill}
            />
            <path
                d="M15.7825 3.4922L16.4573 2.81204C16.7779 2.48896 16.7947 2.01285 16.4658 1.70677L16.2465 1.50272C15.9596 1.23065 15.5041 1.23065 15.2004 1.53673L14.534 2.2254L15.7825 3.4922Z"
                fill={fill}
            />
        </g>
        <defs>
            <clipPath id="clip0_150_1581">
                <rect width="18" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default ModalContentPanelPencilIcon;
