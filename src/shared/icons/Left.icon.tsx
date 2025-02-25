import React, { SVGProps } from "react";

const LeftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10" fill="none" {...props}>
            <path
                d="M0.444445 4.99712C0.444445 4.8532 0.501276 4.70927 0.609178 4.6114L5.11384 0.155457C5.21041 0.0575971 5.33538 -2.90516e-08 5.47739 -2.2844e-08C5.77278 -9.93204e-09 6 0.224549 6 0.523909C6 0.66781 5.94319 0.800218 5.8523 0.898078L1.40446 5.30801L1.40446 4.692L5.8523 9.1019C5.94319 9.19401 6 9.32642 6 9.47611C6 9.77548 5.77278 10 5.47739 10C5.33538 10 5.21041 9.94243 5.10816 9.84456L0.609178 5.3886C0.501276 5.27922 0.444445 5.14681 0.444445 4.99712Z"
                fill="#1F1F1F"
            />
        </svg>
    );
};

export default LeftIcon;
