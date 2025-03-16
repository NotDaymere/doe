import React, { useState, useEffect, useRef } from "react";
import "./Reflections.less";
import ReflectionIcon from "../../../../../../shared/icons/ReflectionIcon";
import PinIcon from "../../../../../../shared/icons/PinIcon";

const ViewModes = {
    CLOSED: "closed",
    SMALL: "small",
    EXPANDED: "expanded",
};

export default function Reflections() {
    const [mode, setMode] = useState(ViewModes.CLOSED);
    const [isHovering, setIsHovering] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState<number | null>(null);
    const [showDragBar, setShowDragBar] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mode === ViewModes.SMALL && !isHovering && !isPinned) {
            const timer = setTimeout(() => {
                setMode(ViewModes.CLOSED);
            }, 5000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [mode, isHovering, isPinned]);

    // Слушатель кликов вне контейнера
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setMode(ViewModes.CLOSED);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMouseEnterIcon = () => {
        if (mode === ViewModes.CLOSED) {
            setMode(ViewModes.SMALL);
        }
    };

    const handleMouseEnterContainer = () => {
        if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
            setIsHovering(true);
            setShowDragBar(true);
        }
    };

    const handleMouseLeaveContainer = () => {
        if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
            setIsHovering(false);
            setShowDragBar(false);
        }
    };

    const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((mode !== ViewModes.SMALL && mode !== ViewModes.EXPANDED) || !containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        setShowDragBar(relativeY < 30 ? true : showDragBar);
    };

    const handleDragBarMouseEnter = () => {
        if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
            setShowDragBar(true);
        }
    };

    const handleDragBarMouseLeave = () => {
        if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
            setShowDragBar(false);
        }
    };

    const handleSmallMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartY(e.clientY);
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || startY === null) return;
        const distance = startY - e.clientY;
        if (distance > 50) {
            setMode(ViewModes.EXPANDED);
            setIsDragging(false);
        }
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const handlePinClick = () => {
        setIsPinned((prev) => !prev);
    };

    const handleExpandByPlus = () => {
        if (mode === ViewModes.SMALL) {
            setMode(ViewModes.EXPANDED);
        }
    };

    const handleCollapse = () => {
        if (mode === ViewModes.EXPANDED) {
            setMode(ViewModes.SMALL);
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUpOrLeave);
            window.addEventListener("mouseleave", handleMouseUpOrLeave);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUpOrLeave);
            window.removeEventListener("mouseleave", handleMouseUpOrLeave);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUpOrLeave);
            window.removeEventListener("mouseleave", handleMouseUpOrLeave);
        };
    }, [isDragging, startY]);

    return (
        <div
            ref={containerRef}
            className={`reflections-container ${mode}`}
            onMouseEnter={handleMouseEnterContainer}
            onMouseLeave={handleMouseLeaveContainer}
            onMouseMove={handleContainerMouseMove}
        >
            <div className="icon" onMouseEnter={handleMouseEnterIcon}>
                <ReflectionIcon />
            </div>


            <div className="small-content" onClick={handleExpandByPlus}>
                <div
                    className="small-drag-bar"
                    onMouseDown={handleSmallMouseDown}
                    onMouseEnter={handleDragBarMouseEnter}
                    onMouseLeave={handleDragBarMouseLeave}
                    style={{ opacity: showDragBar ? 1 : 0 }}
                />
                <div className="small-header">
                    <span className="small-time">Latest Today, 9:41 AM</span>
                    <button className="small-add-btn" onClick={handleExpandByPlus}>
                        +
                    </button>
                </div>
                <div className="small-footer">
                    <ReflectionIcon />
                    <span className="small-title">Reflections</span>
                    <div className="small-count">24</div>
                </div>
            </div>

            <div className="expanded-content">
                <div className="reflections-header">
                    <div>
                        <ReflectionIcon />
                        <span className="small-title">Reflections</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
