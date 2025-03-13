import React, { FC } from 'react';

interface CollapseWidgetIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const CollapseWidgetIcon: FC<CollapseWidgetIconProps> = ({
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
            d="M3.89483 0.259165L0.260926 3.89307C0.0776377 4.07636 0.10018 4.25386 0.215604 4.36928C0.263685 4.41737 0.328862 4.45607 0.405325 4.47963L5.45458 5.87422C5.57691 5.90963 5.69853 5.86495 5.78168 5.7818C5.86672 5.69675 5.9095 5.57703 5.87599 5.45282L4.47952 0.405437C4.45596 0.32897 4.41914 0.261912 4.37106 0.213831C4.25563 0.0984066 4.07813 0.0758629 3.89483 0.259165Z"
            fill={fill}
        />
        <path
            d="M8.10517 11.7408L11.7391 8.10693C11.9224 7.92364 11.8998 7.74614 11.7844 7.63072C11.7363 7.58263 11.6711 7.54393 11.5947 7.52037L6.54542 6.12578C6.42309 6.09037 6.30147 6.13505 6.21832 6.2182C6.13328 6.30325 6.0905 6.42297 6.12401 6.54718L7.52048 11.5946C7.54404 11.671 7.58086 11.7381 7.62894 11.7862C7.74437 11.9016 7.92187 11.9241 8.10517 11.7408Z"
            fill={fill}
        />
    </svg>
);

export default CollapseWidgetIcon;
