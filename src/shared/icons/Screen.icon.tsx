import React, { SVGProps } from "react";

const ScreenIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 13" fill="none" {...props}>
            <g clipPath="url(#clip0_929_9573)">
                <path
                    d="M1.79654 9.67526C1.51267 9.67526 1.33203 9.49457 1.33203 9.2107V1.50748C1.33203 1.21716 1.51267 1.04297 1.79654 1.04297H14.1708C14.4546 1.04297 14.6353 1.21716 14.6353 1.50748V9.2107C14.6353 9.49457 14.4546 9.67526 14.1708 9.67526H1.79654Z"
                    fill="#B5B5B5"
                    fillOpacity="0.2"
                />
                <path
                    d="M1.77782 10.7097H14.1843C15.1133 10.7097 15.6746 10.1484 15.6746 9.21939V1.48387C15.6746 0.554841 15.1133 0 14.1843 0H1.77782C0.855236 0 0.293945 0.554841 0.293945 1.48387V9.21939C0.293945 10.1484 0.855236 10.7097 1.77782 10.7097ZM1.79717 9.671C1.5133 9.671 1.33266 9.49032 1.33266 9.20644V1.50323C1.33266 1.2129 1.5133 1.03871 1.79717 1.03871H14.1714C14.4552 1.03871 14.6359 1.2129 14.6359 1.50323V9.20644C14.6359 9.49032 14.4552 9.671 14.1714 9.671H1.79717ZM5.94557 12.2452H10.023V10.6258H5.94557V12.2452ZM5.90685 13H10.0617C10.3455 13 10.5778 12.7678 10.5778 12.4774C10.5778 12.1871 10.3455 11.9549 10.0617 11.9549H5.90685C5.62299 11.9549 5.38428 12.1871 5.38428 12.4774C5.38428 12.7678 5.62299 13 5.90685 13Z"
                    fill="#B5B5B5"
                />
            </g>
            <defs>
                <clipPath id="clip0_929_9573">
                    <rect width="16" height="13" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default ScreenIcon;
