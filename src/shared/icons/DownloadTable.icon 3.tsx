import React, { FC } from 'react';

interface DownloadTableIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const DownloadTableIcon: FC<DownloadTableIconProps> = ({
                                                           fill = "#B5B5B5",
                                                           width = "12",
                                                           height = "14",
                                                           opacity = 1,
                                                           ...props
                                                       }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 12 14"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6.00396 0C5.58636 0 5.29483 0.293817 5.29483 0.70675V8.72715L5.35786 10.4345L2.98622 7.81396L1.22128 6.05899C1.08733 5.93193 0.906112 5.86046 0.717008 5.86046C0.315168 5.86046 0.0315168 6.16222 0.0315168 6.55928C0.0315168 6.74986 0.110309 6.92456 0.260014 7.09132L5.47605 12.3482C5.62576 12.5071 5.80698 12.5945 6.00396 12.5945C6.19306 12.5945 6.38216 12.5071 6.53186 12.3482L11.74 7.09132C11.8976 6.92456 11.9764 6.74986 11.9764 6.55928C11.9764 6.16222 11.6849 5.86046 11.2909 5.86046C11.1018 5.86046 10.9127 5.93193 10.7866 6.05899L9.02166 7.81396L6.65006 10.4266L6.70521 8.72715V0.70675C6.70521 0.293817 6.41368 0 6.00396 0ZM0.677612 12.5786C0.275772 12.5786 0 12.8724 0 13.2853C0 13.6982 0.275772 14 0.677612 14H11.3067C11.7164 14 12 13.6982 12 13.2853C12 12.8724 11.7164 12.5786 11.3067 12.5786H0.677612Z"
            fill={fill}
        />
    </svg>
);

export default DownloadTableIcon;
