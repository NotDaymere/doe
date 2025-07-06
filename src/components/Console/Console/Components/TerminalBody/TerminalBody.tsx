"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";

import "xterm/css/xterm.css";

import BugCatchModal from "../BugCatchMoal/BugCatchModal";
import "./TerminalBody.less";

import { useConsole } from "../../Console";
import { useConsoleStore } from "src/shared/providers/useConsoleStore/useConsoleStore";

function TerminalBody() {

    const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);


  const [hoveredBug, setHoveredBug] = useState<number | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [bugs, setBugs] = useState<Array<{ id: number; type: string; x: number; y: number }>>([]);
  const [showWhiteDot, setShowWhiteDot] = useState(false);

  const [whiteDotLines, setWhiteDotLines] = useState<number[]>([]);

  const { numberOfConsole } = useConsole();
  const { consoles } = useConsoleStore();

  useEffect(() => {
    if (!termInstance.current && terminalRef.current) {
      const term = new Terminal({
  cursorBlink: true,
     rows: 20,
  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
  fontSize: 14,
  lineHeight: 1.2,
  scrollback: 1000,
  wordwrap: true,
  theme: {
    background: "#3d3e3c",
    foreground: "#FFFFFF",
  },
  
});

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      fitAddonRef.current = fitAddon;

      term.open(terminalRef.current);
      fitAddon.fit();



      window.addEventListener("resize", fitAddon.fit);

      const red = "\x1b[31m";
      const reset = "\x1b[0m";
      let lineIndex = 0;

      const originalWriteln = term.writeln.bind(term);
      term.writeln = (text: string) => {

        originalWriteln(text);
        const maxCols = term.cols;
        const lineCount = Math.ceil(text.length / maxCols) || 1;

        const newBug = {
          id: lineIndex,
          type: lineIndex % 2 === 0 ? "red-bug" : "blue-bug",
          x: 0,
          y: lineIndex,

        };

        setBugs((prev) => [...prev, newBug]);
        lineIndex += lineCount;
        setCurrentLineIndex(lineIndex);
      };

      // Sample content
      if (consoles.length === 1) {

        term.writeln(
          'Traceback (most recent call last): File "/Users/okezuebell/Desktop/Chip/Doe/app.py", line 1, in <module> import streamlit as st\r'
        );
        term.writeln(`${red}ImportError: dlopen(.../python3.11/site-pack...${reset}`);
        term.writeln("(venv) % pip3 install stockfish");
        term.writeln("Collecting stockfish...");
        term.writeln("Successfully installed stockfish");
        term.writeln(`${red}23.1.2 ${reset}->${red}24.3.1${reset}`);
        term.writeln("(venv) % python3 chessgame.py");

        setWhiteDotLines((prev) => [...prev, lineIndex]);
      } else {
        term.writeln("");
        setWhiteDotLines((prev) => [...prev, lineIndex]);
      }

      term.onData((data) => {
        const code = data.charCodeAt(0);
        if (code === 127) {

            term.write("\b \b");
        } else if (code === 13) {
          term.write("\r\n");
          lineIndex += 1;

          setCurrentLineIndex(lineIndex);
          setWhiteDotLines((prev) => [...prev, lineIndex]);
        } else {
          term.write(data);

        }
      });

      termInstance.current = term;

      return () => {
        term.dispose();
        termInstance.current = null;
        window.removeEventListener("resize", fitAddon.fit);

    };
    }
  }, []);

  const calculatePosition = (x: number, y: number) => {
    if (!terminalRef.current || !termInstance.current) return { top: 19.5, left: 0 };
    const charHeight = 19.3;
    return {
      top: y * charHeight + 13.8,

      left: 20,
    };
  };

  return (
    <>
      <div className="bugs">
        {bugs.map(({ id, type, x, y }) => {
          const { top, left } = calculatePosition(x, y);

          return (
            <div
              key={id}
              style={{ position: "absolute", top: `${top}px`, left: `${left}px`, zIndex: 10 }}
              className={`bug ${type}`}
              onMouseEnter={() => setHoveredBug(id)}
              onMouseLeave={() => setHoveredBug(null)}
            >
              {hoveredBug === id && (

<div className="bug-modal" onMouseEnter={() => setHoveredBug(id)} onMouseLeave={() => setHoveredBug(null)}>
                  <div className="bug-modal-arrow"></div>
                  <BugCatchModal />
                </div>
              )}
            </div>
          );
        })}


        {whiteDotLines.map((lineIdx) => (
          <div
            key={`white-dot-${lineIdx}`}
            style={{
              position: "absolute",
              top: `${calculatePosition(0, lineIdx).top}px`,
              left: `${calculatePosition(0, lineIdx).left}px`,
              width: "8px",
              height: "8px",

              borderRadius: "50%",
              backgroundColor: "white",
              zIndex: 10,
            }}
            className="white-bug"
            onMouseEnter={() => setHoveredBug(999999 + lineIdx)}
            onMouseLeave={() => setHoveredBug(null)}
          >
            {hoveredBug === 999999 + lineIdx && (

<div
                className="bug-modal"
                onMouseEnter={() => setHoveredBug(999999 + lineIdx)}
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
        <div className="codewindow" ref={terminalRef}></div>
      </div>

      <div className="lines">

        {bugs.map(({ id, type, x, y }) => {
          const { top } = calculatePosition(x, y);
          return (
            <div

            key={id}
              style={{ position: "absolute", top: `${top}px`, height: `19.5px`, zIndex: 10 }}
              className={`${type}`}
            ></div>

        );
        })}

        {whiteDotLines.map((lineIdx) => (

<div
            key={`white-line-${lineIdx}`}
            style={{
              position: "absolute",

              top: `${calculatePosition(0, lineIdx).top}px`,
              height: `19.5px`,
              zIndex: 10,
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            className="white-line"
          />
        ))}

      </div>
    </>
  );
}

export default TerminalBody;
