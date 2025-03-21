"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import BugCatchModal from "../BugCatchMoal/BugCatchModal";
import "./TerminalBody.less";
import { useConsole } from "../../Console";

function TerminalBody() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const termInstance = useRef<Terminal | null>(null);
    const [hoveredBug, setHoveredBug] = useState<number | null>(null);

    const [bugs, setBugs] = useState<Array<{ id: number; type: string; x: number; y: number }>>([]);
    const { numberOfConsole } = useConsole();

    useEffect(() => {
        if (!termInstance.current && terminalRef.current) {
            const term = new Terminal({
                cursorBlink: true,
                rows: 20,
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                fontSize: 14,
                lineHeight: 1.2,
                scrollback: 1000,
                theme: {
                    background: "#3d3e3c",
                    foreground: "#FFFFFF",
                },
            });

            const red = "\x1b[31m";
            const reset = "\x1b[0m";

            let currentLineIndex = 0;

            const originalWriteln = term.writeln.bind(term);
            term.writeln = (text: string) => {
                originalWriteln(text);

                const maxCols = term.cols;
                const lineCount = Math.ceil(text.length / maxCols) || 1;

                const newBug = {
                    id: currentLineIndex,
                    type: currentLineIndex % 2 === 0 ? "red-bug" : "blue-bug",
                    x: 0,
                    y: currentLineIndex,
                };

                setBugs((prevBugs) => [...prevBugs, newBug]);

                currentLineIndex += lineCount;
            };

            term.open(terminalRef.current);
            if (numberOfConsole === 1) {
                term.writeln(
                    'Traceback (most recent call last):File "/Users/okezuebell/Desktop/Chip/Doe/app.py", line 1, in <module>import streamlit as st\r'
                );
                term.writeln(
                    `${red}ImportError: dlopen(/Library/Frameworks/Python.framework/Versions/3.11/lib/python3.11/site-pack${reset}`
                );
                term.writeln(
                    "(venv) okezuebell@MacBook-Air Desktop % pip3 install stockfish Collecting stockfish"
                );
                term.writeln(
                    "  Downloading stockfish-3.28.0-py3-none-any.whl (13 kB) Installing collected packages: stockfish Successfully installed stockfish-3.28.0 [notice] A new release of pip is available:"
                );
                term.writeln(`${red}23.1.2 ${reset}->${red}24.3.1${reset}`);
                term.writeln("(venv) okezuebell@MacBook-Air Desktop % python3 chessgame.py");
            } else {
                term.writeln("");
            }
            termInstance.current = term;
        }

        return () => {
            if (termInstance.current) {
                termInstance.current.dispose();
                termInstance.current = null;
            }
        };
    }, []);

    // Fixed row height for perfect alignment
    const calculatePosition = (x: number, y: number) => {
        if (!terminalRef.current || !termInstance.current) return { top: 19.5, left: 0 };

        const charHeight = 19.5; // Directly using the known row height

        return {
            top: y * charHeight + 13.5,
            left: 20, // Align dots to the left margin
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
                            style={{
                                position: "absolute",
                                top: `${top}px`,
                                left: `${left}px`,
                                zIndex: 10,
                            }}
                            className={`bug ${type}`}
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
                    );
                })}
            </div>

            <div className="terminal-container">
                <div className="codewindow" ref={terminalRef}></div>
            </div>

            <div className="lines">
                {bugs.map(({ id, type, x, y }) => {
                    const { top, left } = calculatePosition(x, y);
                    return (
                        <div
                            key={id}
                            style={{
                                position: "absolute",
                                top: `${top}px`,
                                height: `${19.5}px`,
                                zIndex: 10,
                            }}
                            className={`${type}`}
                        ></div>
                    );
                })}
            </div>
        </>
    );
}

export default TerminalBody;
