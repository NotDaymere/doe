import React, { FC } from 'react';

interface StraightPinProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const StraightPin: FC<StraightPinProps> = ({
                                               fill = "#5B5B5B",
                                               width = "8",
                                               height = "12",
                                               opacity = 1,
                                               ...props
                                           }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 8 12"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0 7.54668C0 7.97289 0.285834 8.25372 0.737153 8.25372H3.45007V10.5956C3.45007 11.3628 3.77101 11.9996 3.89637 11.9996C4.01672 11.9996 4.33766 11.3628 4.33766 10.5956L4.33766 8.25372H7.05059C7.50191 8.25372 7.78772 7.97289 7.78772 7.54668C7.78772 6.48857 6.94024 5.37032 5.53115 4.85882L5.36565 2.5571C6.0978 2.14089 6.69956 1.66951 6.96032 1.33353C7.0907 1.16303 7.15586 0.992535 7.15586 0.842095C7.15586 0.536204 6.92022 0.310547 6.56919 0.310547L1.22357 0.310547C0.86753 0.310547 0.636856 0.536204 0.636856 0.842095C0.636856 0.992535 0.697033 1.16303 0.827416 1.33353C1.08818 1.66951 1.68993 2.14089 2.42207 2.5571L2.25658 4.85882C0.847473 5.37032 0 6.48857 0 7.54668Z"
            fill={fill}
        />
    </svg>
);

export default StraightPin;