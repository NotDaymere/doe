import React, { SVGProps } from "react";

const ArrowDownIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 12 13"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.00288 10.0556C6.1468 10.0556 6.29073 9.99872 6.3886 9.89082L10.8445 5.38616C10.9424 5.28959 11 5.16462 11 5.02261C11 4.72722 10.7755 4.5 10.4761 4.5C10.3322 4.5 10.1998 4.55681 10.1019 4.6477L5.69199 9.09554H6.308L1.8981 4.6477C1.80599 4.55681 1.67358 4.5 1.52389 4.5C1.22452 4.5 1 4.72722 1 5.02261C1 5.16462 1.05757 5.28959 1.15544 5.39184L5.6114 9.89082C5.72078 9.99872 5.85319 10.0556 6.00288 10.0556Z"
                stroke="none"
            />
        </svg>
    );
};

export default ArrowDownIcon;
