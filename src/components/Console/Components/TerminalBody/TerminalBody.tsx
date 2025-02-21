import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import BugCatchModal from "../BugCatchMoal/BugCatchModal";
import "./TerminalBody.less";

function TerminalBody() {
  const [hoveredBug, setHoveredBug] = useState(null);
  const terminalRef = useRef(null);
  const termInstance = useRef(null);

  useEffect(() => {
    if (!termInstance.current && terminalRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        rows: 20,
        fontSize: 14,

        theme: {
          background: "#3d3e3c",
          foreground: "#FFFFFF",
        },
      });

      term.open(terminalRef.current);
      term.writeln("\x1b[1;32mWelcome to the Terminal!\x1b[0m");
      term.writeln("Type something...");

      term.onData((data) => {
        term.write(data);
      });

      termInstance.current = term;
    }

    return () => {
      if (termInstance.current) {
        termInstance.current.dispose();
        termInstance.current = null;
      }
    };
  }, []);

  return (
    <>
    
      <div className="bugs">    
        {[1, 2].map((id) => (
          <div
            key={id}
            className={`indicator ${['bug','info'][id-1]}`}
            onMouseEnter={() => setHoveredBug(id)}
            onMouseLeave={() => setHoveredBug(null)}
          >
            {hoveredBug === id && (
            
            <div
                className="bug-modal"
                onMouseEnter={() => setHoveredBug(id)}
                onMouseLeave={() => setHoveredBug(null)}
              >
                <div className="bug-modal-arrow"></div>
                <BugCatchModal />
              </div>
            )}
        
          </div>
        ))}
      </div>

      <div className="terminal-container">
        <div className="terminal-header"></div>

        <div className="codewindow" ref={terminalRef}></div>
      </div>
    </>
  );
}

export default TerminalBody;
