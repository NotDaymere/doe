import React, { SVGProps } from "react";

const LinkIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.59375 7.04883L8.44141 8.2207C9.35938 8.34766 9.95508 8.64062 10.4043 9.08984C11.7129 10.3984 11.7129 12.2344 10.4238 13.5234L7.92383 16.0234C6.625 17.3223 4.78906 17.3223 3.48047 16.0234C2.16211 14.7051 2.17188 12.8691 3.4707 11.5801L4.78906 10.2617C4.54492 9.69531 4.48633 9.05078 4.55469 8.50391L2.41602 10.6426C0.53125 12.5176 0.521484 15.1836 2.42578 17.0781C4.32031 18.9824 6.97656 18.9727 8.86133 17.0879L11.4785 14.4609C13.3535 12.5859 13.3633 9.92969 11.4688 8.02539C11.0391 7.5957 10.4824 7.27344 9.59375 7.04883ZM8.87109 13.4453L10.0137 12.2832C9.0957 12.1562 8.5 11.8633 8.06055 11.4141C6.75195 10.1055 6.75195 8.26953 8.04102 6.98047L10.541 4.48047C11.8398 3.18164 13.6758 3.17188 14.9844 4.48047C16.293 5.79883 16.2832 7.63477 14.9941 8.92383L13.6758 10.2422C13.9199 10.8086 13.9785 11.4531 13.9102 12L16.0488 9.86133C17.9336 7.97656 17.9434 5.32031 16.0391 3.42578C14.1445 1.52148 11.4785 1.53125 9.60352 3.41602L6.98633 6.04297C5.11133 7.91797 5.0918 10.5742 6.99609 12.4785C7.42578 12.9082 7.98242 13.2305 8.87109 13.4453Z"
                stroke="none"
            />
        </svg>
    );
};

export default LinkIcon;
