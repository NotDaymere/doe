import React, { SVGProps } from "react";

const BluetoothIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 16" fill="none" {...props}>
            <path
                d="M1.04688 4.48438L8.07812 11.5156L4.5625 15.0312V0.96875L8.07812 4.48438L1.04688 11.5156"
                stroke="#B5B5B5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default BluetoothIcon;
