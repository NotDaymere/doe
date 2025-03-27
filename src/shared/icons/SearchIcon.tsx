import React, { FC } from 'react';

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const SearchIcon: FC<SearchIconProps> = ({
                                             fill = "#5B5B5B",
                                             width = "13",
                                             height = "13",
                                             opacity = 1,
                                             ...props
                                         }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 13 13"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0.599609 5.56836C0.599609 8.31055 2.82617 10.5293 5.56836 10.5293C6.62305 10.5293 7.59179 10.2012 8.39648 9.63865L11.3027 12.5527C11.4668 12.709 11.6699 12.7793 11.8809 12.7793C12.334 12.7793 12.6621 12.4355 12.6621 11.9824C12.6621 11.7637 12.5762 11.5683 12.4434 11.4199L9.55273 8.52148C10.1699 7.69336 10.5293 6.67774 10.5293 5.56836C10.5293 2.82617 8.31055 0.599609 5.56836 0.599609C2.82617 0.599609 0.599609 2.82617 0.599609 5.56836ZM1.80274 5.56836C1.80274 3.48243 3.48243 1.80274 5.56836 1.80274C7.64648 1.80274 9.33401 3.48243 9.33401 5.56836C9.33401 7.64648 7.64648 9.33401 5.56836 9.33401C3.48243 9.33401 1.80274 7.64648 1.80274 5.56836Z"
            fill={fill}
        />
    </svg>
);

export default SearchIcon;
