import React, { FC } from 'react';

interface CollapseWidgetIntoStringIconProps extends React.SVGProps<SVGSVGElement> {
    stroke?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const CollapseWidgetIntoStringIcon: FC<CollapseWidgetIntoStringIconProps> = ({
                                                                                 stroke = "#AD9201",
                                                                                 width = "10",
                                                                                 height = "2",
                                                                                 opacity = 1,
                                                                                 ...props
                                                                             }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 10 2"
        fill={"black"}
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M1 0.996094L9 0.996094"
            strokeWidth="2"
            strokeLinecap="round"
            stroke={stroke}
        />
    </svg>
);

export default CollapseWidgetIntoStringIcon;
