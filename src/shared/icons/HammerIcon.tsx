import React, { SVGProps } from "react";

const HammerIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    console.log(props);
    return (
    <svg {...props} width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.46387 14.4919C2.03223 15.0673 2.69637 15.022 3.27112 14.3562L9.34422 7.35455L7.46678 5.45384L0.531506 11.5827C-0.132643 12.171 -0.170959 12.8369 0.397399 13.4188L1.46387 14.4919ZM12.8182 8.92552C13.0929 9.19059 13.4058 9.20999 13.6676 8.94492L15.5898 7.01189C15.8389 6.7598 15.8197 6.42359 15.5515 6.15852L15.0917 5.68657C14.8427 5.44091 14.683 5.40212 14.4148 5.42151L13.6676 5.51202L13.1887 5.02714L13.4058 4.11558C13.5143 3.66949 13.3483 3.19755 12.8821 2.7256L11.5985 1.43906C9.82323 -0.35175 6.55357 -0.552165 4.72076 1.29683C4.41423 1.60715 4.4717 1.95626 4.66967 2.17607C4.82293 2.32477 5.05921 2.40235 5.28273 2.33123C6.52162 1.95626 7.60084 1.88515 8.53322 2.44761L8.04152 3.75354C7.83076 4.30306 7.94572 4.69097 8.29054 5.04654L9.71467 6.48824C9.97644 6.75331 10.2511 6.8309 10.6661 6.74682L11.6943 6.53349L12.1669 7.01838L12.0966 7.7748C12.0775 8.05921 12.103 8.22736 12.3585 8.46655L12.8182 8.92552Z" />
    </svg>
    );
};

export default HammerIcon;
