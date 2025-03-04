import React from 'react';

interface PanelVideoIconProps {
    opacity?: number;
    height?: number | string;
    width?: number | string;
    color?: string;
}

const PanelVideoIcon: React.FC<PanelVideoIconProps> = ({
                                                           opacity = 1,
                                                           height = 12,
                                                           width = 18,
                                                           color = '#B5B5B5'
                                                       }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
    >
        <path
            d="M3.14777 11.2809H10.5122C11.8914 11.2809 12.7313 10.4765 12.7313 9.09723V2.1837C12.7313 0.804519 11.971 0 10.6006 0H3.14777C1.84817 0 0.928711 0.804519 0.928711 2.1837V9.09723C0.928711 10.4765 1.76859 11.2809 3.14777 11.2809ZM13.7568 7.69155L16.2853 9.91065C16.524 10.1228 16.8157 10.2554 17.0633 10.2554C17.6292 10.2554 18.0004 9.83985 18.0004 9.25638V2.02456C18.0004 1.44106 17.6292 1.02554 17.0633 1.02554C16.8157 1.02554 16.524 1.15816 16.2853 1.37033L13.7568 3.58939V7.69155Z"
            fill={color}
        />
    </svg>
);

export default PanelVideoIcon;
