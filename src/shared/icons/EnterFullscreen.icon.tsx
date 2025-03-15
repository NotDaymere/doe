import React, { FC } from 'react';

interface EnterFullscreenIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const EnterFullscreenIcon: FC<EnterFullscreenIconProps> = ({
                                                               fill = "#5B5B5B",
                                                               width = "19",
                                                               height = "15",
                                                               opacity = 1,
                                                               ...props
                                                           }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 19 15"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M2.49023 14.246H15.625C17.2949 14.246 18.1152 13.4257 18.1152 11.7851V2.46875C18.1152 0.828125 17.2949 0.0078125 15.625 0.0078125H2.49023C0.830078 0.0078125 0 0.828125 0 2.46875V11.7851C0 13.4257 0.830078 14.246 2.49023 14.246ZM2.50977 12.83C1.80664 12.83 1.40625 12.4492 1.40625 11.7168V2.53711C1.40625 1.79493 1.80664 1.42383 2.50977 1.42383H15.6055C16.3086 1.42383 16.709 1.79493 16.709 2.53711V11.7168C16.709 12.4492 16.3086 12.83 15.6055 12.83H2.50977Z"
            fill={fill}
        />
        <path
            d="M4.91211 10.5351H13.2031C13.7109 10.5351 13.9258 10.3203 13.9258 9.79297V4.45117C13.9258 3.9336 13.7109 3.71875 13.2031 3.71875H4.91211C4.4043 3.71875 4.19922 3.9336 4.19922 4.45117V9.79297C4.19922 10.3203 4.4043 10.5351 4.91211 10.5351Z"
            fill={fill}
        />
    </svg>
);

export default EnterFullscreenIcon;
