import { useState } from "react";
import OutputBody from "../OutputBody/OutputBody";
import TerminalBody from "../TerminalBody/TerminalBody";
import "./ConsoleWindow.less";

function ConsoleWindow() {
  const [activeTab, setActiveTab] = useState("terminal");

  return (
    <div className="consoleInnerWindow">
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
    </div>
  );
}

export default ConsoleWindow;
