import React, { FC } from 'react';

interface TagsIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const TagsIcon: FC<TagsIconProps> = ({
                                         fill = "#B5B5B5",
                                         width = 15,
                                         height = 15,
                                         opacity = 1,
                                         ...props
                                     }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 15 15"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.62563 14.234L13.8189 8.03262C14.3235 7.52804 14.356 7.22693 14.356 6.55958V4.13437C14.356 3.41821 14.1689 3.19848 13.6806 2.71833L12.2319 1.26158C11.7518 0.781417 11.5239 0.594238 10.8159 0.594238H8.39063C7.7233 0.594238 7.42219 0.618652 6.91761 1.12322L0.716188 7.3246C-0.227861 8.26863 -0.252276 9.24522 0.724325 10.2055L4.74465 14.2258C5.72126 15.1943 6.6816 15.1861 7.62563 14.234ZM9.72532 5.82715C9.19633 5.82715 8.79755 5.41211 8.79755 4.89126C8.79755 4.37854 9.19633 3.96346 9.72532 3.96346C10.2625 3.96346 10.6613 4.37854 10.6613 4.89126C10.6613 5.41211 10.2625 5.82715 9.72532 5.82715Z"
            fill={fill}
        />
    </svg>
);

export default TagsIcon;
