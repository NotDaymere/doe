import React, { useState, useEffect, useRef } from "react";
import "./Reflections.less";
import ReflectionIcon from "../../../../../../shared/icons/ReflectionIcon";
import PinIcon from "../../../../../../shared/icons/PinIcon";

// Три режима
const ViewModes = {
    CLOSED: "closed",
    SMALL: "small",
    EXPANDED: "expanded",
};

export default function Reflections() {
    const [mode, setMode] = useState(ViewModes.CLOSED);
    const [isHovering, setIsHovering] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        if (mode === ViewModes.SMALL && !isHovering && !isPinned) {
            const timer = setTimeout(() => {
                setMode(ViewModes.CLOSED);
            }, 5000);
            return () => clearTimeout(timer);
        }else {
            return null
        }
    }, [mode, isHovering, isPinned]);

    const handleMouseEnterIcon = () => {
        if (mode === ViewModes.CLOSED) {
            setMode(ViewModes.SMALL);
        }
    };

    const handleMouseEnterContainer = () => {
        if (mode === ViewModes.SMALL) setIsHovering(true);
    };

    const handleMouseLeaveContainer = () => {
        if (mode === ViewModes.SMALL) setIsHovering(false);
    };

    const handleExpand = () => {
        if (mode === ViewModes.SMALL) {
            setMode(ViewModes.EXPANDED);
        }
    };

    const handleCollapse = () => {
        if (mode === ViewModes.EXPANDED) {
            setMode(ViewModes.SMALL);
        }
    };

    const handlePinClick = () => {
        setIsPinned((prev) => !prev);
    };

    return (
        <div
            ref={containerRef}
            className={`reflections-container ${mode}`}
            onMouseEnter={handleMouseEnterContainer}
            onMouseLeave={handleMouseLeaveContainer}
        >

            <div className="icon" onMouseEnter={handleMouseEnterIcon}>
                <ReflectionIcon />
            </div>


            <div className="small-content" onClick={handleExpand}>
                <div className="small-header">
                    <span className="small-time">Latest Today, 9:41 AM</span>
                    <button className="small-add-btn">+</button>
                </div>
                <div className="small-footer">
                    <ReflectionIcon />
                    <span className="small-title">Reflections</span>
                    <div className="small-count">24</div>
                </div>
            </div>


            <div className="expanded-content">
                <div className="reflections-header">
                    <div className="reflections-drag-bar" onMouseDown={handleExpand}>
                        Drag Me or Click
                    </div>
                    <div className="reflections-pin-icon" onClick={handlePinClick}>
                        <PinIcon pinned={isPinned} />
                    </div>
                    <button className="close-btn" onClick={handleCollapse}>
                        &times;
                    </button>
                </div>
                <div className="reflections-body">
                    <h4>Pinned</h4>
                    <div className="reflection-item pinned">
                        <span>Pinned Reflection Example</span>
                    </div>

                    <h4>Today, 9:41 AM</h4>
                    <div className="reflection-item">
                        <span>Today’s conclusion from Demo. Lorem ipsum dolor sit amet.</span>
                    </div>
                    <div className="reflection-item">
                        <span>All work and no play make Joe a dull boy.</span>
                    </div>

                    <h4>Wed, 4:32 AM</h4>
                    <div className="reflection-item">
                        <span>Another reflection…</span>
                    </div>

                    <h4>Tue, 4:32 AM</h4>
                    <div className="reflection-item">
                        <span>And one more reflection…</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
