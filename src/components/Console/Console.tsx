import React, { createContext, useState, useContext } from "react";
import CodingLanguageMenu from "./Components/CodingLanguageMenu/CodingLanguageMenu";
import ConsoleWindow from "./Components/Consolewindow/ConsoleWindow";
import "./Console.less";

// Define the context for managing console state with a default value
const ConsoleContext = createContext({
  showMenu: false,
  toggleMenu: () => {},
  isVisible: true,
  hideConsole: () => {},
  bugIndicators: [] as any,
  updateBugIndicator: ([]) => {},
});

export const useConsole = () => {
  return useContext(ConsoleContext);
};

function Console() {
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [bugIndicators, setBugIndicator] = useState([]);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const hideConsole = () => setIsVisible(false);
  const updateBugIndicator = (update:any) => setBugIndicator(update);

  return (
    isVisible && (
      <ConsoleContext.Provider
        value={{
          showMenu,
          toggleMenu,
          isVisible,
          hideConsole,
          bugIndicators, // Pass the bugIndicators to the context
          updateBugIndicator,
        }}
      >
        <div className="consoleWindow">
          <div className="console_head">
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
      </ConsoleContext.Provider>
    )
  );
}

export default Console;
