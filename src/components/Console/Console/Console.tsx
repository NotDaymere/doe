import React, { createContext, useState, useContext, useRef } from "react";
import CodingLanguageMenu from "./Components/CodingLanguageMenu/CodingLanguageMenu";
import ConsoleWindow from "./Components/Consolewindow/ConsoleWindow";
import Draggable from "react-draggable";
import "./Console.less";

// Define the context for managing console state with a default value
const ConsoleContext = createContext({
    showMenu: false,
    toggleMenu: () => {},
    isVisible: true,
    hideConsole: () => {},
    numberOfConsole: 1,
    splitConsole: () => {},
    clearConsole: () => {},
});

export const useConsole = () => {
    return useContext(ConsoleContext);
};

function Console() {
    const [showMenu, setShowMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [numberOfConsole, setNumberOfConsole] = useState(1);
    const [consoleIcon, setConsoleIcon] = useState("");
    const nodeRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => setShowMenu((prev) => !prev);
    const hideConsole = () => setIsVisible(false);
    const splitConsole = () => {
        setNumberOfConsole(numberOfConsole + 1);
    };
    const clearConsole = () => {
        setNumberOfConsole(1);
    };

    const [dimensions, setDimensions] = useState({ width: "100%", height: 300 });
    const consoleRef = useRef(null);

    const isResizing = useRef(false);
    const resizeDirection = useRef("");

    const handleMouseDown = (e: any, direction: any) => {
        e.preventDefault();
        isResizing.current = true;
        resizeDirection.current = direction;

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = dimensions.width;
        const startHeight = dimensions.height;

        const handleMouseMove = (e) => {
            if (!isResizing.current) return;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (resizeDirection.current.includes("right")) {
                newWidth = Math.max(300, startWidth + (e.clientX - startX));
            } else if (resizeDirection.current.includes("left")) {
                newWidth = Math.max(300, startWidth - (e.clientX - startX));
            }

            if (resizeDirection.current.includes("bottom")) {
                newHeight = Math.max(150, startHeight + (e.clientY - startY));
            } else if (resizeDirection.current.includes("top")) {
                newHeight = Math.max(150, startHeight - (e.clientY - startY));
            }

            setDimensions({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            isResizing.current = false;
            resizeDirection.current = "";
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        isVisible && (
            <ConsoleContext.Provider
                value={{
                    showMenu,
                    toggleMenu,
                    isVisible,
                    numberOfConsole,
                    hideConsole,
                    splitConsole,
                    clearConsole,
                }}
            >
                <Draggable nodeRef={nodeRef} handle=".drag-handle">
                    <div ref={nodeRef} className="consoleWindow">
                        <div className="console_head drag-handle">
                            <div className="title">
                                <p className="">Console</p>
                            </div>
                            <div className="right_buttons">
                                <button onClick={toggleMenu}>
                                    <img src="/img/console/code.svg" />
                                </button>
                                <button onClick={splitConsole}>
                                    <img src="/img/console/window.svg" />
                                </button>
                                <button onClick={clearConsole}>
                                    <img src="/img/console/delete.svg" />
                                </button>
                                <button onClick={hideConsole}>
                                    <img src="/img/console/hide.svg" />
                                </button>
                            </div>
                            {showMenu && <CodingLanguageMenu />}
                        </div>
                        <div
                            ref={consoleRef}
                            style={{ width: dimensions.width, height: dimensions.height }}
                        >
                            <div className="consoleWidowTabContainer">
                                {/* <ConsoleWindow />
                            <ConsoleWindow /> */}

                                {[...Array(numberOfConsole)].map((_, i) => {
                                    return (
                                        <ConsoleWindow
                                            key={i}
                                            currentConsole={i + 1}
                                            icon={i + 1}
                                        />
                                    );
                                })}
                            </div>

                            {/* Resizer Handles */}
                            <div
                                className="resizer top-left"
                                onMouseDown={(e) => handleMouseDown(e, "top-left")}
                            ></div>
                            <div
                                className="resizer top-right"
                                onMouseDown={(e) => handleMouseDown(e, "top-right")}
                            ></div>
                            <div
                                className="resizer bottom-left"
                                onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
                            ></div>
                            <div
                                className="resizer bottom-right"
                                onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
                            ></div>
                        </div>
                    </div>
                </Draggable>
            </ConsoleContext.Provider>
        )
    );
}

export default Console;
