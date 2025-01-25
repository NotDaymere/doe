import React, { SVGProps } from "react";

const ItalicIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.74557 16.9902H11.6356C12.0736 16.9902 12.3905 16.7065 12.3905 16.2467C12.3905 15.8064 12.083 15.5227 11.6449 15.5227H9.55732L11.822 4.4675H13.9096C14.3476 4.4675 14.6552 4.18379 14.6552 3.72397C14.6552 3.28372 14.357 3 13.9189 3H8.00094C7.56291 3 7.26468 3.28372 7.26468 3.72397C7.26468 4.18379 7.57223 4.4675 8.01026 4.4675H10.0979L7.83318 15.5227H5.73625C5.29823 15.5227 5 15.8064 5 16.2467C5 16.7065 5.30755 16.9902 5.74557 16.9902Z"
                stroke="none"
            />
        </svg>
    );
};

export default ItalicIcon;
