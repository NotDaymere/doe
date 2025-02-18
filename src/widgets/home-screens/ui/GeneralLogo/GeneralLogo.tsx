import GeneralLogoIcon from "src/shared/icons/GeneralLogo";
import GeneralLogo2 from "src/shared/icons/GeneralLogo2";
import React, { useState } from "react";
import './GeneralLogo.less';

interface Props {
    onClick?: () => void
}
export default function GeneralLogo({onClick} : Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={hovered ? "general-logo-hovered-container" : 'general-logo-container'}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hovered ? <GeneralLogo2 /> : <GeneralLogoIcon />}
        </div>
    );
}