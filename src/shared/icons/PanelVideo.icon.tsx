import React from 'react';

interface PanelVideoIconProps {
    opacity?: number;
    height?: number | string;
    width?: number | string;
    color?: string;
    active?: boolean | null;
}

const PanelVideoIcon: React.FC<PanelVideoIconProps> = ({
                                                           opacity = 1,
                                                           height,
                                                           width,
                                                           color = '#B5B5B5',
                                                           active,
                                                       }) => {
    if (active === false) {
        const altWidth = width !== undefined ? width : 22;
        const altHeight = height !== undefined ? height : 19;
        return (
            <svg
                width={altWidth}
                height={altHeight}
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity }}
            >
                <path
                    d="M12.1779 15.3551H4.98697C3.56995 15.3551 2.70703 14.5285 2.70703 13.1114V6.00825C2.70703 5.97151 2.70766 5.93517 2.71156 5.90094L12.1779 15.3551ZM20.2471 5.84475V13.275C20.2471 13.8745 19.8656 14.3014 19.2842 14.3014C19.0299 14.3014 18.7302 14.1652 18.4849 13.9472L15.8871 11.6672V7.45251L18.4849 5.17258C18.7302 4.95457 19.0299 4.81832 19.2842 4.81832C19.8656 4.81832 20.2471 5.24524 20.2471 5.84475ZM14.8334 6.00825V13.1114C14.8334 13.1509 14.8327 13.1898 14.829 13.2265L5.36097 3.76465H12.6443C14.0522 3.76465 14.8334 4.59124 14.8334 6.00825Z"
                    fill={color}
                />
                <path
                    d="M15.4147 17.0812C15.6599 17.3265 16.0595 17.3265 16.2957 17.0812C16.5319 16.836 16.541 16.4454 16.2957 16.2002L2.13469 2.0482C1.88944 1.80295 1.48976 1.80295 1.24451 2.0482C1.00834 2.28437 1.00834 2.69312 1.24451 2.92929L15.4147 17.0812Z"
                    fill={color}
                />
            </svg>
        );
    }

    return (
        <svg
            width={width !== undefined ? width : 18}
            height={height !== undefined ? height : 12}
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
};

export default PanelVideoIcon;
