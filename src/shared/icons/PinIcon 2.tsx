import React from "react";

export default function PinIcon({ pinned = false }) {
    const fillColor = pinned ? "#FFBB00" : "#999";
    return (
        <svg
            width="20"
            height="20"
            fill={fillColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 0L8 6H2l6 5-2 7 4-3 4 3-2-7 6-5h-6L10 0z" />
        </svg>
    );
}
