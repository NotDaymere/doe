import React, { SVGProps } from "react";

const FileFilledIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M1.73124 11.9944H7.66211C8.81814 11.9944 9.39338 11.407 9.39338 10.2434V5.16363H5.35009C4.63526 5.16363 4.29459 4.82237 4.29459 4.10629V0H1.73124C0.5808 0 0 0.593008 0 1.75664V10.2434C0 11.4126 0.575219 11.9944 1.73124 11.9944ZM5.36685 4.39719H9.32636C9.29285 4.16782 9.1309 3.94405 8.86281 3.66992L5.7857 0.531467C5.52321 0.262936 5.29424 0.100699 5.05969 0.0615384V4.0951C5.05969 4.2965 5.16021 4.39719 5.36685 4.39719Z"
                fill="#8BCF16"
            />
        </svg>
    );
};

export default FileFilledIcon;
