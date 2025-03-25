import React, { SVGProps } from "react";

const PlayIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 12" fill="none" {...props}>
            <path
                d="M1.51812 11.0965C0.87967 11.499 0.145508 11.177 0.145508 10.5169V1.48532C0.145508 0.825246 0.943541 0.551587 1.51812 0.90576L8.89198 5.2686C9.45061 5.60669 9.46656 6.41164 8.89198 6.73363L1.51812 11.0965Z"
                fill="#FF464A"
            />
        </svg>
    );
};

export default PlayIcon;
