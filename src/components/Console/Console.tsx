import { useState } from "react";
import CodingLanguageMenu from "./Components/CodingLanguageMenu/CodingLanguageMenu";
import ConsoleWindow from "./Components/Consolewindow/ConsoleWindow";
import "./Console.less";

function Console() {
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="consoleWindow" onClick={()=>showMenu? setShowMenu(false):null}>
        <div className="console_head">
          <div className="title">
            <p className="">Console</p>
          </div>
          <div className="right_buttons">
            <button onClick={() => setShowMenu((prev) => !prev)}>
              <img src="/img/console/code.svg" />
            </button>
            <button>
              <img src="/img/console/window.svg" />
            </button>
            <button>
              <img src="/img/console/delete.svg" />
            </button>
            <button onClick={() => setIsVisible(false)}>
              {" "}
              <img src="/img/console/hide.svg" />
            </button>
          </div>
          {showMenu && <CodingLanguageMenu />}
        </div>
        <div className="consoleWidowTabContainer">
          <ConsoleWindow />
        </div>
      </div>
    )
  );
}

export default Console;
