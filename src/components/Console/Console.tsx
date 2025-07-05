"use client";
import { createContext, useState, useContext, useRef, useEffect } from "react";
import CodingLanguageMenu from "./Components/CodingLanguageMenu/CodingLanguageMenu";
import ConsoleWindow from "./Components/Consolewindow/ConsoleWindow";
import Draggable from "react-draggable";

import "./Console.less";
import { useConsoleStore } from "src/shared/providers/useConsoleStore/useConsoleStore";
import ConsoleTitleContainer from "./ConsoleTitleContainer";


const ConsoleContext = createContext({
    showMenu: false,
    toggleMenu: () => {},
    isVisible: true,
   
    hideConsole: () => {},
    numberOfConsole: 1,
    splitConsole: () => {},
    clearConsole: () => {},

});

export const useConsole = () => {
    return useContext(ConsoleContext);

};

function Console() {
    const [showMenu, setShowMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [numberOfConsole, setNumberOfConsole] = useState(1);
    const [consoleIcon, setConsoleIcon] = useState("");
    const nodeRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

       
    const ignoreNextResize = useRef(false);

   
    const isInitialRender = useRef(true);

    const menuRef = useRef<HTMLDivElement>(null);
    const { isOpen, close } = useConsoleStore();
    const {removeConsole,consoles,setConsoles,addConsole,activeConsoleIndex} = useConsoleStore();
   
    const toggleMenu = () => setShowMenu((prev) => !prev);
     const hideConsole = () => setIsVisible(false);
     const [userResized,setUserResized] = useState(false);
     const splitConsole = () => {
        ignoreNextResize.current = true;
        addConsole()
    };

   

    useEffect(() => {
     
        const element = nodeRef.current;
        if (!element) return;
        const observer = new ResizeObserver(() => {
           
            if (isInitialRender.current) {
                isInitialRender.current = false;
                return;
         
            }

         
            if (ignoreNextResize.current) {
               
                ignoreNextResize.current = false;
                return;
            }

           
        
            setUserResized(true);
            console.log("USER has manually resized the console!");

           
            observer.disconnect();
        });

        observer.observe(element);

        // Standard cleanup
        return () => observer.disconnect();
    }, [consoles.length]);

    const clearConsole = () => {
         if (consoles.length > 1) {
        
            ignoreNextResize.current = true;
        }
       
        setConsoles([{}]);

        
    };

    const closeConsoleWindow = (currentConsole: number) => {
        ignoreNextResize.current = true;
        removeConsole(currentConsole);
    };


    const [dimensions, setDimensions] = useState({ width: "100%", height: 300 });
    
    const consoleRef = useRef(null);
  

    const isResizing = useRef(false);
    const resizeDirection = useRef("");

  
    useEffect(() => {   
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showMenu &&
      
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
          
            ) {
                setShowMenu(false);
            }
        };

  
        if (showMenu) {
    
            document.addEventListener("mousedown", handleClickOutside);
        
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    const handleMouseDown = (e: any, direction: any) => {
    
        
        e.preventDefault();
        isResizing.current = true;
        resizeDirection.current = direction;

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = dimensions.width;
   
        const startHeight = dimensions.height;

    
        const handleMouseMove = (e) => {
             setUserResized(true);
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
        isOpen && (
            <ConsoleContext.Provider

            value={{
    
                    showMenu,
                    toggleMenu,

                    isVisible,
                    numberOfConsole,
    
                    hideConsole,

                    splitConsole,
                    clearConsole,
                }}
            >
    
                <Draggable nodeRef={nodeRef} handle=".drag-handle">
              
                    <div ref={nodeRef} className="consoleWindow" style={{maxWidth:userResized ? "100%" : "80%"}}>
                        <div className="console_head drag-handle">


                            <ConsoleTitleContainer/>

                            <div className="right_buttons">
      
                                <button ref={menuButtonRef} onClick={toggleMenu}>
                     
                                    <img src="/img/console/code.svg" />
                   
    
                                </button>
                                <button onClick={splitConsole}>
    

                                    <img src="/img/console/window.svg" />
                                </button>
                                <button onClick={clearConsole}>
    
                                    <img src="/img/console/delete.svg" />
    
                                </button>
                                <button onClick={close}>
                                    <img src="/img/console/hide.svg" />
                                </button>
    
                            </div>
                            {showMenu && (
                                <CodingLanguageMenu
                                    ref={menuRef}
    

                                    onSelectLanguage={() => setShowMenu(false)}
                                />
                            )}
                        </div>
    
                        <div
                            ref={consoleRef}
                            style={{ width: dimensions.width, height: dimensions.height }}
        
        >

                            <div className="consoleWidowTabContainer">
    
                                {consoles.length <= 3 && [...Array(consoles.length)].map((_, i) => {
                                    return (
                                        <ConsoleWindow
    
                                        key={i}
        
                                        currentConsole={i + 1}
                    
                                            
                                            totalConsoles={numberOfConsole}
                                            closeWindow={closeConsoleWindow}
                                            icon={i + 1}
                                        />
                                    );
    
    
    })}
                                 {consoles.length > 3 && [...Array(1)].map((_, i) => {
                            
                            return (
                                 
    
                                        <ConsoleWindow
                                            key={activeConsoleIndex}
                                            currentConsole={activeConsoleIndex}
                    
    
                                            
                            
                                            totalConsoles={consoles.length}
                                            closeWindow={closeConsoleWindow}
                                            icon={i + 1}
                                        />
                         
                                    );
    
    })}
                                
    

    
                            </div>

                            {/* <div
                                className="resizer top-left"
                            
                                onMouseDown={(e) => {setUserResized(true);handleMouseDown(e, "top-left")}}
                            ></div>
                            <div
                                className="resizer top-right"
    
                                onMouseDown={(e) => handleMouseDown(e, "top-right")}
    
    ></div>
                            <div
    
                            className="resizer bottom-left"
                                onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
                            ></div>
                            <div
                                className="resizer bottom-right"
                                
                                onMouseDown={(e) => {setUserResized(true); handleMouseDown(e, "bottom-right")}}
                            ></div> */}
    
    
                        </div>
                    </div>
                </Draggable>
            </ConsoleContext.Provider>
        )
    );

}
export default Console;