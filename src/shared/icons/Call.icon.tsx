import React, { SVGProps } from "react";

const CallIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.84796 13.9866C8.63175 16.8308 11.9647 18.9904 14.6444 18.9904C15.9037 18.9904 17.0021 18.4794 17.7217 17.6599C18.4129 16.8693 18.6496 16.2812 18.6496 15.7606C18.6496 15.3557 18.4034 14.9797 17.7785 14.5361L15.4682 12.849C14.8906 12.4344 14.6349 12.3573 14.294 12.3573C14.0005 12.3573 13.7543 12.4151 13.262 12.685L11.747 13.5335C11.567 13.6395 11.4913 13.6589 11.3587 13.6589C11.1788 13.6589 11.0557 13.6106 10.8758 13.5335C10.1562 13.196 9.14306 12.3862 8.24353 11.4703C7.34401 10.5544 6.64333 9.61919 6.28352 8.8961C6.23618 8.79969 6.17937 8.64543 6.17937 8.49117C6.17937 8.36584 6.24565 8.25979 6.32139 8.12481L7.21145 6.57258C7.45764 6.14837 7.52392 5.91699 7.52392 5.58919C7.52392 5.21318 7.40082 4.80825 7.05048 4.29727L5.45975 2.04125C5.00525 1.39529 4.66438 1 4.15307 1C3.51867 1 2.7517 1.4917 2.20252 2.0316C1.41662 2.80289 1 3.8827 1 5.09749C1 7.84521 3.07364 11.1714 5.84796 13.9866Z"
                stroke="none"
            />
        </svg>
    );
};

export default CallIcon;
