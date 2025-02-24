import React, { SVGProps } from "react";

const SearchIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 13 14"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1406_25931)">
                <path
                    d="M0 6.25798C0 9.15708 2.33751 11.5159 5.21044 11.5159C6.34655 11.5159 7.3847 11.147 8.24005 10.5276L11.4525 13.7759C11.6027 13.9275 11.7986 14 12.0075 14C12.4515 14 12.7584 13.6639 12.7584 13.2225C12.7584 13.0116 12.68 12.8205 12.5429 12.6822L9.35007 9.44046C10.0226 8.55754 10.4208 7.45716 10.4208 6.25798C10.4208 3.35884 8.08333 1 5.21044 1C2.33751 1 0 3.35884 0 6.25798ZM1.11652 6.25798C1.11652 3.9782 2.95127 2.12671 5.21044 2.12671C7.46961 2.12671 9.30434 3.9782 9.30434 6.25798C9.30434 8.53777 7.46961 10.3892 5.21044 10.3892C2.95127 10.3892 1.11652 8.53777 1.11652 6.25798Z"
                    stroke="none"
                />
            </g>
            <defs>
                <clipPath id="clip0_1406_25931">
                    <rect width="13" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default SearchIcon;
