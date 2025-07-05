import React, { useEffect, useCallback, useState } from "react";
import "./ConsoleTitleContainer.less";
import { useConsoleStore } from "src/shared/providers/useConsoleStore/useConsoleStore";

interface ConsoleEntry {
  
  id: number;
  label: string;
  icon: string;
}

const ConsoleTitleContainer: React.FC = () => {
  const {
    consoles,
    activeConsoleIndex,
  
    setConsoles,
    setActiveConsoleIndex,
  } = useConsoleStore();

  
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const entries: ConsoleEntry[] = Array.from({ length: 1   }, (_, i) => ({
  
      id: i + 1,
      label: `cnsl${i + 1}`,
      icon: "/img/console/consoleicon4.svg",
    }));
    setConsoles(entries);
    setActiveConsoleIndex(0);
  }, [setConsoles, setActiveConsoleIndex]);

  const toggleExpanded = () => {
  
    if (consoles.length > 3) {
      setIsExpanded((prev) => !prev);
    }
  };

  const renderConsoleEntry = useCallback(
    (console: ConsoleEntry, index: number) => (
      <div
        key={console.id}
        className={`console-entry ${index === activeConsoleIndex ? "console-entry--active" : ""}`}
        onClick={() => {
          setActiveConsoleIndex(index);
          setIsExpanded(false);
        }}
      >
        <img
          src={
            index === activeConsoleIndex
              ? "/img/console/consoleicon1.svg"
  
              : "/img/console/consoleicon4.svg"
          }
          alt="icon"
        />
        <span>cnsl {index + 1}</span>
     
      </div>
    ),
    [activeConsoleIndex, setActiveConsoleIndex]
  
  );

  const getVisibleConsoles = () => {
    if (consoles.length <= 3) return consoles;
    if (activeConsoleIndex < 3) {
      return consoles.slice(0, 3);
    } else {
      const visible = [consoles[0], consoles[1], consoles[activeConsoleIndex]];
      const unique = visible.filter(
  
        (item, index, self) => self.findIndex((c) => c.id === item.id) === index
      );
      return unique;
    }
  };

  return (
    <div className="title">
      <p>Console</p>
  
      <div className="console-wrapper">
        {isExpanded ? (
          <div className="console-popover">
            <div className="console-grid">
              {consoles.map((console, index) => renderConsoleEntry(console, index))}
            </div>
            {consoles.length > 3 && (
              <div className="console-icon-button" onClick={toggleExpanded}>
                <img src="/img/console/consolecodeicon.svg" alt="code" />
  
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="console-group">
              {getVisibleConsoles().map((console) =>
                renderConsoleEntry(console, consoles.findIndex((c) => c.id === console.id))
              )}
          
            </div>
            {consoles.length > 3 && (
              <div className="console-icon-button" onClick={toggleExpanded}>
                <img src="/img/console/consolecodeicon.svg" alt="code" />
          
              </div>
  
  )}
          </>
    
    )}
      </div>
  
    </div>
 
);
};



export default ConsoleTitleContainer;