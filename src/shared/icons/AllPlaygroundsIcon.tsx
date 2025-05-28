import React, { SVGProps } from "react";

const AllPlaygroundsIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.81153 19.6001C10.3833 19.6001 10.6998 19.2264 10.6998 18.5295V12.7321C10.71 10.3082 13.4259 6.79338 15.9274 5.2077L16.7442 4.68249C17.0301 4.5108 17.1833 4.19771 17.1833 3.89471C17.1833 3.39981 16.8361 3.05641 16.3154 3.05641C16.0602 3.05641 15.7845 3.14731 15.5394 3.30891L14.9982 3.66241C12.5172 5.2986 10.1383 8.39927 9.82173 9.96476H9.79111C9.47459 8.38917 7.10584 5.2986 4.62478 3.66241L4.08364 3.30891C3.82838 3.14731 3.56292 3.05641 3.29746 3.05641C2.77674 3.05641 2.43981 3.43011 2.43981 3.8846C2.43981 4.1876 2.59296 4.5108 2.87884 4.68249L3.69565 5.2077C6.19714 6.79338 8.92325 10.3082 8.92325 12.7321V18.5295C8.92325 19.2264 9.23975 19.6001 9.81153 19.6001ZM2.78695 6.43988L5.64579 2.77361C6.08482 2.20802 5.80915 1.75352 5.12508 1.72322L1.15333 1.55152C0.58156 1.52122 0.275257 1.89492 0.448829 2.45041L1.623 6.19749C1.8272 6.86408 2.3377 7.01558 2.78695 6.43988ZM16.7136 6.42979C17.1424 7.01558 17.6631 6.88428 17.8776 6.22779L19.164 2.51102C19.3478 1.96562 19.0517 1.58182 18.4902 1.59192L14.5082 1.65252C13.8241 1.66262 13.5383 2.10702 13.9569 2.68271L16.7136 6.42979Z"
                fill="url(#branches-gradient)"
            />
            <defs>
                <linearGradient
                    id="branches-gradient-light"
                    x1="9.8094"
                    y1="1.5498"
                    x2="10"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#B5B5B5" />
                    <stop offset="1" stopColor="#8D8D8D" stopOpacity="0.46" />
                </linearGradient>
                <linearGradient
                    id="branches-gradient-light-hover"
                    x1="9.8094"
                    y1="1.5498"
                    x2="10"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#5B5B5B" />
                    <stop offset="1" stopColor="#8D8D8D" stopOpacity="0.46" />
                </linearGradient>
                <linearGradient
                    id="branches-gradient-dark"
                    x1="9.8094"
                    y1="1.54956"
                    x2="10"
                    y2="31"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.333075" stopColor="white" stopOpacity="0.6" />
                    <stop offset="1" stopColor="white" stopOpacity="0.05" />
                </linearGradient>
            </defs>
        </svg>
    );
};
export default AllPlaygroundsIcon;
