import React, { SVGProps } from "react";

const PenIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 12 12"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.32035 10.9557L9.98755 3.24552L8.75776 2.00058L1.08347 9.71075L0.41584 11.2881C0.345563 11.4579 0.528283 11.6559 0.696948 11.5852L2.32035 10.9557ZM10.606 2.6372L11.3159 1.93692C11.6742 1.57617 11.6953 1.18713 11.3721 0.861744L11.1331 0.621244C10.8169 0.302936 10.4303 0.33123 10.0719 0.684906L9.36211 1.39226L10.606 2.6372Z"
                stroke="none"
            />
        </svg>
    );
};

export default PenIcon;
