import React, { SVGProps } from "react";

const ExpandDoubleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M2.81055 9.2793C3.2793 9.2793 3.61133 8.9375 3.61133 8.46875V8.21484L3.43555 5.5L5.27148 7.45312L7.53711 9.74805C7.69336 9.9043 7.88867 9.98242 8.10352 9.98242C8.60156 9.98242 8.97266 9.65039 8.97266 9.15234C8.97266 8.91797 8.89453 8.70312 8.72852 8.54688L6.45312 6.27148L4.49023 4.43555L7.22461 4.61133H7.46875C7.9375 4.61133 8.29883 4.2793 8.29883 3.81055C8.29883 3.3418 7.9375 3 7.46875 3H3.41602C2.51758 3 2 3.51758 2 4.41602V8.46875C2 8.92773 2.3418 9.2793 2.81055 9.2793ZM11.1895 17.6875H15.2422C16.1406 17.6875 16.6582 17.1699 16.6582 16.2715V12.2188C16.6582 11.7598 16.3164 11.4082 15.8477 11.4082C15.3887 11.4082 15.0469 11.75 15.0469 12.2188V12.4727L15.2324 15.1875L13.3965 13.2344L11.1211 10.9394C10.9746 10.7832 10.7695 10.7051 10.5547 10.7051C10.0566 10.7051 9.68555 11.0371 9.68555 11.5352C9.68555 11.7695 9.77344 11.9844 9.92969 12.1406L12.2051 14.416L14.168 16.252L11.4434 16.0762H11.1895C10.7207 16.0762 10.3691 16.4082 10.3594 16.877C10.3594 17.3457 10.7207 17.6875 11.1895 17.6875Z"
                fill="none"
            />
        </svg>
    );
};

export default ExpandDoubleIcon;
