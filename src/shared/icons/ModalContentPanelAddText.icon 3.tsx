import React, { FC } from 'react';

interface ModalContentPanelAddTextIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const ModalContentPanelAddTextIcon: FC<ModalContentPanelAddTextIconProps> = ({
                                               fill = "#B5B5B5",
                                               width = "13",
                                               height = "15",
                                               opacity = 1,
                                               ...props
                                           }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 13 15"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0.820312 14.4238C1.33789 14.4238 1.5918 14.2285 1.77734 13.6816L3.03711 10.2344H8.79883L10.0586 13.6816C10.2441 14.2285 10.498 14.4238 11.0059 14.4238C11.5234 14.4238 11.8555 14.1113 11.8555 13.623C11.8555 13.457 11.8262 13.3008 11.748 13.0957L7.16797 0.898438C6.94336 0.302734 6.54297 0 5.91797 0C5.3125 0 4.90234 0.292969 4.6875 0.888672L0.107422 13.1055C0.0292969 13.3105 0 13.4668 0 13.6328C0 14.1211 0.3125 14.4238 0.820312 14.4238ZM3.51562 8.75L5.88867 2.17773H5.9375L8.31055 8.75H3.51562Z"
            fill={fill}
        />
    </svg>
);

export default ModalContentPanelAddTextIcon;
