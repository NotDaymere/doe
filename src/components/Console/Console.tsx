import React, { createContext, useState, useContext,useRef } from "react";
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
});

export const useConsole = () => {
  return useContext(ConsoleContext);
};

function Console() {
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const nodeRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setShowMenu((prev) => !prev);
  const hideConsole = () => setIsVisible(false);

  return (
    isVisible && (
      <ConsoleContext.Provider
        value={{
          showMenu,
          toggleMenu,
          isVisible,
          hideConsole,
        }}
      >
        <Draggable nodeRef={nodeRef} handle=".drag-handle">
        <div ref={nodeRef}  className="consoleWindow">
          <div className="console_head drag-handle">
            <div className="title">
              <p className="">Console</p>
            </div>
            <div className="right_buttons">
              <button onClick={toggleMenu}>
                <img src="/img/console/code.svg" />
              </button>
              <button>
                <img src="/img/console/window.svg" />
              </button>
              <button>
                <img src="/img/console/delete.svg" />
              </button>
              <button onClick={hideConsole}>
                <img src="/img/console/hide.svg" />
              </button>
            </div>
            {showMenu && <CodingLanguageMenu />}
          </div>
          <div className="consoleWidowTabContainer">
            <ConsoleWindow />
          </div>
        </div>
        </Draggable>
      </ConsoleContext.Provider>
    )
  );
}

export default Console;
