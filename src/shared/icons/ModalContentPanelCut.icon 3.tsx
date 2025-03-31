import React, { FC } from 'react';

interface ModalContentPanelCutIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ModalContentPanelCutIcon: FC<ModalContentPanelCutIconProps> = ({
                                               fill = "#B5B5B5",
                                               width = "18",
                                               height = "18",
                                               opacity = 1,
                                               ...props
                                           }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_1303_24299)">
            <path
                d="M17.7014 13.5539C17.7014 13.1781 17.4512 12.9462 17.0557 12.9462H5.41615C5.23857 12.9462 5.18207 12.8902 5.18207 12.7143V1.18342C5.18207 0.783598 4.92378 0.511719 4.52826 0.511719C4.14082 0.511719 3.88252 0.783598 3.88252 1.18342V13.522C3.88252 13.9058 4.13274 14.1537 4.52019 14.1537H17.0557C17.4512 14.1537 17.7014 13.9218 17.7014 13.5539ZM0 4.95775C0 5.34158 0.250224 5.56548 0.637669 5.56548H12.2852C12.4628 5.56548 12.5193 5.62945 12.5193 5.79738V17.3283C12.5193 17.7281 12.7776 17.9999 13.165 17.9999C13.5605 17.9999 13.8189 17.7281 13.8189 17.3283V4.99773C13.8189 4.6139 13.5686 4.35802 13.1812 4.35802H0.637669C0.250224 4.35802 0 4.58991 0 4.95775Z"
                fill={fill}
            />
        </g>
        <defs>
            <clipPath id="clip0_1303_24299">
                <rect width="18" height="18" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default ModalContentPanelCutIcon;
