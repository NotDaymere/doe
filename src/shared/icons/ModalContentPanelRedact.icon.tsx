import React, { FC } from 'react';

interface ModalContentPanelRedactIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ModalContentPanelRedactIcon: FC<ModalContentPanelRedactIconProps> = ({
                                             fill = "#B5B5B5",
                                             width = "16",
                                             height = "16",
                                             opacity = 1,
                                             ...props
                                         }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M3.2693 14.3725L13.1271 4.45943L11.546 2.85879L1.67903 12.7719L0.820644 14.7999C0.730288 15.0182 0.965215 15.2728 1.18207 15.1818L3.2693 14.3725ZM13.9223 3.6773L14.8349 2.77694C15.2957 2.31312 15.3228 1.81293 14.9072 1.39458L14.5999 1.08536C14.1934 0.67611 13.6964 0.712489 13.2356 1.16721L12.323 2.07667L13.9223 3.6773Z"
            fill={fill}
        />
    </svg>
);

export default ModalContentPanelRedactIcon;
