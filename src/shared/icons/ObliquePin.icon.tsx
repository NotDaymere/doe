import React, { FC } from 'react';

interface ObliquePinIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ObliquePinIcon: FC<ObliquePinIconProps> = ({
                                                     fill = "#DDDDDD",
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
        <g clipPath="url(#clip0_1657_31044)">
            <path
                d="M5.07762 7.26516C4.77624 7.56653 4.77978 7.96722 5.09891 8.28635L7.01723 10.2047L5.36129 11.8606C4.81878 12.4031 4.5954 13.0804 4.68405 13.169C4.76915 13.2541 5.4464 13.0307 5.98891 12.4882L7.64486 10.8323L9.56319 12.7506C9.88231 13.0698 10.283 13.0733 10.5844 12.7719C11.3326 12.0237 11.524 10.6337 10.8893 9.27567L12.3999 7.53108C13.2119 7.75448 13.9707 7.84668 14.3927 7.79349C14.6054 7.76512 14.7721 7.69063 14.8784 7.58426C15.0947 7.36796 15.0877 7.04177 14.8395 6.79355L11.0595 3.01363C10.8078 2.76187 10.4851 2.75833 10.2688 2.97462C10.1624 3.081 10.0844 3.24411 10.056 3.45687C10.0029 3.87883 10.0951 4.63765 10.3184 5.44966L8.57387 6.9602C7.21579 6.32549 5.82582 6.51696 5.07762 7.26516Z"
                fill={fill}
            />
        </g>
        <defs>
            <clipPath id="clip0_1657_31044">
                <rect
                    width="9.30212"
                    height="14"
                    fill="white"
                    transform="translate(10.6611 0.761719) rotate(45)"
                />
            </clipPath>
        </defs>
    </svg>
);

export default ObliquePinIcon;
