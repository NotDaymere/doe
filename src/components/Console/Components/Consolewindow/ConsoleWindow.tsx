import { useState, useRef } from "react";
import OutputBody from "../OutputBody/OutputBody";
import TerminalBody from "../TerminalBody/TerminalBody";
import "./ConsoleWindow.less";

function ConsoleWindow() {
  const [activeTab, setActiveTab] = useState("terminal");
  const [dimensions, setDimensions] = useState({ width: 700, height: 409 }); // Initial width & height
  const consoleRef = useRef(null);
  const isResizing = useRef(false);
  const resizeDirection = useRef("");

  const handleMouseDown = (e, direction) => {
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
    <div
      ref={consoleRef}
      className="consoleInnerWindow"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <div className="consoletop">
        <div className="consoleTabContainer">
          <div className={`consoleTab ${activeTab === "terminal" ? "on" : ""}`}>
            <button onClick={() => setActiveTab("terminal")}>
              <img src="/img/console/terminal.svg" alt="Terminal" />
              <p>Terminal</p>
              <div className="red">7</div>
            </button>
          </div>
          <div className={`consoleTab ${activeTab === "output" ? "on" : ""}`}>
            <button onClick={() => setActiveTab("output")}>
              <img src="/img/console/graph.svg" alt="Output" />
              <p>Output</p>
              <div className="">1</div>
            </button>
          </div>
        </div>
        <button>
          <img src="/img/console/bug.svg" alt="Bug" />
        </button>
      </div>
      <div className="consoleBody">
        {activeTab === "terminal" ? <TerminalBody /> : <OutputBody />}
      </div>

      {/* Resizer Handles */}
      <div className="resizer top-left" onMouseDown={(e) => handleMouseDown(e, "top-left")}></div>
      <div className="resizer top-right" onMouseDown={(e) => handleMouseDown(e, "top-right")}></div>
      <div className="resizer bottom-left" onMouseDown={(e) => handleMouseDown(e, "bottom-left")}></div>
      <div className="resizer bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")}></div>
    </div>
  );
}

export default ConsoleWindow;
