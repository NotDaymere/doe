import React, { FC } from 'react';

interface ExpandWidgetIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ExpandWidgetIcon: FC<ExpandWidgetIconProps> = ({
                                                         fill = "#5D9400",
                                                         width = "12",
                                                         height = "12",
                                                         opacity = 1,
                                                         ...props
                                                     }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 12 12"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3.96552 7.60021L7.59943 3.9663C7.78271 3.78301 7.76017 3.60551 7.64475 3.49009C7.59667 3.44201 7.53149 3.4033 7.45503 3.37974L2.40577 1.98515C2.28344 1.94975 2.16182 1.99443 2.07867 2.07757C1.99363 2.16262 1.95085 2.28234 1.98436 2.40656L3.38084 7.45394C3.40439 7.5304 3.44121 7.59746 3.48929 7.64554C3.60472 7.76097 3.78222 7.78351 3.96552 7.60021Z"
            fill={fill}
        />
        <path
            d="M8.03448 4.39979L4.40057 8.0337C4.21729 8.21698 4.23983 8.39449 4.35525 8.50991C4.40333 8.55799 4.46851 8.5967 4.54497 8.62025L9.59423 10.0148C9.71656 10.0503 9.83818 10.0056 9.92133 9.92242C10.0064 9.83738 10.0492 9.71766 10.0156 9.59344L8.61917 4.54606C8.59561 4.4696 8.55879 4.40254 8.51071 4.35446C8.39528 4.23903 8.21778 4.21649 8.03448 4.39979Z"
            fill={fill}
        />
    </svg>
);

export default ExpandWidgetIcon;
