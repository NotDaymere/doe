import { useState, useRef } from "react";
import OutputBody from "../OutputBody/OutputBody";
import TerminalBody from "../TerminalBody/TerminalBody";

import "./ConsoleWindow.less";

function ConsoleWindow({ currentConsole, icon,totalConsoles,closeWindow }: any) {
    const [activeTab, setActiveTab] = useState("terminal");

    return (
       
       <div className="consoleInnerWindow">
            <div className="consoletop">
    <div className="consoleTabContainer">
        <div className="consoleTitle">
            <img
                src={
                    icon % 2
                        ? "/img/console/consoleicon1.svg"
                        : "/img/console/consoleicon2.svg"
                }
            />
            <p>cnsl {currentConsole}</p>
        </div>
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

 
    <div className="bug-buttons">
        <button>
            <img src="/img/console/bug.svg" alt="Bug 1" />
        </button>
       
        {totalConsoles > 1 && <button onClick={() => closeWindow(currentConsole)}>
            <img src="/img/console/delete.svg" alt="Bug 2" />
        </button>}
    </div>
</div>
            <div className="consoleBody">
                {activeTab === "terminal" ? <TerminalBody /> : <OutputBody />}
            </div>
        </div>
    
);
}


export default ConsoleWindow;