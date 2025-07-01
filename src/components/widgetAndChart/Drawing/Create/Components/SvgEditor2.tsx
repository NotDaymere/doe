"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./Editor.less";

import DrawingToolButton from "src/components/widgetAndChart/Component/DrawingToolButton/DrawingToolButton";
import { useLassoSelection } from "./useLassoSelection";
const FabricCanvasWindow = ({ drawingData, id }) => {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const [isPen, setIsPen] = useState(true);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [isTextFormat, setIsTextFormat] = useState(false);
    const [isDrawingFormat, setIsDrawingFormat] = useState(false);
  
    const [showPaintBox, setShowPaintBox] = useState(false);
    const fontSizes = [8, 12, 16, 32]; // Font sizes to toggle through
    const indentAmount = 20;
    const [showPaintDrawingBox, setShowPaintDrawingBox] = useState(false);
    const [showStrokeBox, setShowStrokeBox] = useState(false);
    const [showOpacityBox, setShowOpacityBox] = useState(false);
    const [isEraserMode, setIsEraserMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(1);
    const [opacityValue, setOpacityValue] = useState(100);
   
    const [showMoreTools, setShowMoreTools] = useState(false);
    const [drawingcolor, setDrawingColor] = useState("#000000");
    const [activeTool, setActiveTool] = useState("");
    const isLassoActive = useRef(false);
    const lassoPath = useRef(null);
    const [fabricInstance, setFabricInstance] = useState(null);
    const lassoPoints = useRef([]);
    const activeToolRef = useRef("");
    

    const toggleLassoTool = () => {
  const isActive = activeTool === "lasso";
  if (isActive) {
    setActiveTool("");
  } else {
    setActiveTool("lasso");
    setIsEraserMode(false);
    disableDrawingMode();

    
    if (fabricCanvas.current) {
      fabricCanvas.current.selection = false;
      fabricCanvas.current.forEachObject((obj) => (obj.selectable = true));
    }
  }
};

   






useEffect(() => {
  activeToolRef.current = activeTool;
}, [activeTool]);
  
    
    const shapePopoverRef = useRef(null);
    
    const resetToolbar = () => {
        setIsTextFormat(false);
      
        setIsDrawingFormat(false);
        setShowPaintBox(false);
        setShowPaintDrawingBox(false);
        setShowStrokeBox(false);
        setShowOpacityBox(false);
        setShowMoreTools(false);
     
        setActiveTool("");
    };

    
    useEffect(() => {
        // Initialize Fabric.js canvas
        fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
            width: 700,
            height: 350,
      
            backgroundColor: "transparent",
            isDrawingMode: false,
        });
        fabricCanvas.current.upperCanvasEl.setAttribute("tabindex", "0");
        fabricCanvas.current.upperCanvasEl.focus();
        setTimeout(() => {
  
            setFabricInstance(fabricCanvas.current);
          
        }, 0);

        console.log("Drawing data loaded:", drawingData);

        // Load existing drawing data if available
        if (drawingData) {
            fabricCanvas.current.loadFromJSON(drawingData, () => {
                requestAnimationFrame(() => {
                    fabricCanvas.current.renderAll();
                });
            });
            // enableDrawingMode();
        } else {
            // enableDrawingMode(); // Enable drawing mode directly if no data to load
        }

        // Add event listener for delete key
        


        // Add event listener for text deselection
        const handleSelectionCleared = () => {
            resetToolbar();
        };

        // Add event listener for clicks outside text
       const handleMouseDown = (event) => {
  const tool = activeToolRef.current;

  // Prevent toolbar reset when using tools like lasso, eraser, etc.
  if (["lasso", "eraser", "drawingFormat", "shape", "textformat"].includes(tool)) return;

  const activeObject = fabricCanvas.current.getActiveObject();
  if (!activeObject || activeObject.type !== "i-text") {
    resetToolbar();
  }
};

     

     
        fabricCanvas.current.on("selection:cleared", handleSelectionCleared);
        
        fabricCanvas.current.on("mouse:down", handleMouseDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (fabricCanvas.current) {
        
                fabricCanvas.current.off("selection:cleared", handleSelectionCleared);
                fabricCanvas.current.off("mouse:down", handleMouseDown);
                fabricCanvas.current.dispose(); // Cleanup on unmount
    
            }
        };




        
    }, [drawingData]);



    useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            shapePopoverRef.current &&
          
            !shapePopoverRef.current.contains(event.target)
        ) {
            setShowMoreTools(false);
        }
   
    };

    if (showMoreTools) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

}, [showMoreTools]);

    
const saveDrawingData = () => {
        if (fabricCanvas.current) {
            const jsonData = fabricCanvas.current.toJSON();
            const imageUrl = fabricCanvas.current.toDataURL();

            console.log("Saving canvas data:", { jsonData, imageUrl });

            const savedDrawings = JSON.parse(localStorage.getItem("drawings") || "[]");
            // Create a new drawing object or update existing one
            const newDrawing = {
                id: `Drawing_${new Date().toISOString()}`, // Use existing ID or create new one
                drawingData: jsonData,
                imageUrl: imageUrl,
            };

            // If editing existing drawing, replace it; otherwise add new
            let updatedDrawings;
            if (id) {
                updatedDrawings = savedDrawings.map((drawing) =>
                    drawing.id === id ? newDrawing : drawing
                );
            } else {
                updatedDrawings = [...savedDrawings, newDrawing];
            }

            localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
            console.log("Saved drawing:", newDrawing);
       
        }
    };
useLassoSelection(fabricInstance, activeTool === "lasso");
    const togglePen = () => {
        addText();
    };

    const enableDrawingMode = (color = drawingcolor, width = strokeWidth) => {
        setIsDrawingMode(true);
        fabricCanvas.current.isDrawingMode = true;
        fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
        fabricCanvas.current.freeDrawingBrush.color = color;
        fabricCanvas.current.freeDrawingBrush.width = width;
        fabricCanvas.current.renderAll();
    };

    const disableDrawingMode = () => {
        setIsDrawingMode(false);
        fabricCanvas.current.isDrawingMode = false;
    };
    const toggleSelectionMode = (toolName) => {
        setActiveTool(toolName);
        disableDrawingMode();
        setIsEraserMode(false);
        fabricCanvas.current.selection = true;
        fabricCanvas.current.forEachObject((obj) => (obj.selectable = true));
    };

  

    const toggleEraserMode = (toolName) => {
        setActiveTool(toolName);
        setIsEraserMode((prev) => !prev);
    };

    useEffect(() => {
        if (!fabricCanvas.current) return;

        const handleObjectClick = (event) => {
            if (isEraserMode && event.target) {
                fabricCanvas.current.remove(event.target);
                fabricCanvas.current.renderAll();
            }
        };

        fabricCanvas.current.on("mouse:down", handleObjectClick);

        return () => {
            fabricCanvas.current.off("mouse:down", handleObjectClick);
        };
   
    }, [isEraserMode]);

    const addShape = (shape, toolName) => {
        disableDrawingMode();
        setActiveTool(toolName);
        setShowMoreTools(false);
        let shapeObject;
        switch (shape) {
            case "circle":
                shapeObject = new fabric.Circle({ radius: 30, fill: "blue", left: 100, top: 100 });
                break;
            case "rectangle":
                shapeObject = new fabric.Rect({
                    width: 60,
                    height: 40,
                    fill: "green",
                    left: 150,
                    top: 150,
                    selectable: true,
                    evented: true,
                });
                break;
            case "triangle":
                shapeObject = new fabric.Triangle({
                    width: 60,
                    height: 50,
                    fill: "red",
                    left: 200,
                    top: 200,
                });
                break;
           
                default:
                return;
        }
        fabricCanvas.current.add(shapeObject);
         fabricCanvas.current.setActiveObject(shapeObject); 
        fabricCanvas.current.renderAll();
    };

    
   
    const addText = () => {    
        const text = new fabric.IText("Editable Text", {
            left: 150,
            top: 150,
            fontSize: 16,
            fill: "black",
            selectable: true,
        });
        fabricCanvas.current.add(text);
        fabricCanvas.current.setActiveObject(text);
        fabricCanvas.current.renderAll();
    };

    // Function to get the selected text object
    const getSelectedTextObject = () => {
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject && activeObject.type === "i-text") {
            return activeObject;
        }
        alert("Please select a text object and highlight text to format.");
        return null;
    };

    // Function to toggle styles for selected text range
    const toggleTextStyle = (style, value) => {
        const text = getSelectedTextObject();
        if (text) {
            if (text.getSelectionStyles) {
                const currentStyles = text.getSelectionStyles();
                text.setSelectionStyles({ [style]: currentStyles[style] === value ? null : value });
            }
            fabricCanvas.current.renderAll();
        }
    };

    // Function to toggle font size
    const toggleFontSize = () => {
        const text = getSelectedTextObject();
        if (text) {
            const currentSize = text.fontSize;
            const nextSize = fontSizes[(fontSizes.indexOf(currentSize) + 1) % fontSizes.length];
            text.set("fontSize", nextSize);
            fabricCanvas.current.renderAll();
        }
    };

    // Function to apply Superscript
    const toggleSuperscript = () => {
        const text = getSelectedTextObject();
        if (text) {
            const currentStyles = text.getSelectionStyles();
            const isSuperscript = currentStyles.fontSize && currentStyles.fontSize < text.fontSize;

            text.setSelectionStyles({
                fontSize: isSuperscript ? text.fontSize : text.fontSize * 0.7,
                deltaY: isSuperscript ? 0 : -text.fontSize * 0.3,
            });
            fabricCanvas.current.renderAll();
        }
    };

    // Function to apply Subscript
    const toggleSubscript = () => {
        const text = getSelectedTextObject();
        if (text) {
            const currentStyles = text.getSelectionStyles();
            const isSubscript = currentStyles.fontSize && currentStyles.fontSize < text.fontSize;

            text.setSelectionStyles({
                fontSize: isSubscript ? text.fontSize : text.fontSize * 0.7,
                deltaY: isSubscript ? 0 : text.fontSize * 0.3,
            });
            fabricCanvas.current.renderAll();
        }
    };

    // Function to add a hyperlink
    const addHyperlink = () => {
        const text = getSelectedTextObject();
        if (text) {
            const url = prompt("Enter the URL for the link:");
            if (url) {
                text.setSelectionStyles({
                    fill: "blue", // Change text color to blue
                    underline: true, // Underline the text
                    link: url, // Store link metadata
                });

                // Make the link clickable
                fabricCanvas.current.on("mouse:down", (event) => {
                    const clickedObject = event.target;
                    if (clickedObject && clickedObject.type === "i-text") {
                        const selectionStyles = clickedObject.getSelectionStyles();
                        if (selectionStyles.link) {
                            window.open(selectionStyles.link, "_blank");
                        }
                    }
                });

                fabricCanvas.current.renderAll();
            }
        }
    };

    const changeColor = (color) => {
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject) {
            activeObject.set("fill", color);
            fabricCanvas.current.renderAll();
        }
    };

    const changeColorDrawing = (color) => {
        setDrawingColor(color);

        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject) {
            activeObject.set("fill", color);
            fabricCanvas.current.renderAll();
        }
        enableDrawingMode(color);
    };

    // Function to add a quotation to the canvas
    const addQuote = () => {
        const quote = new fabric.IText('"Your quote here"', {
            left: 100,
            top: 100,
            fontSize: 24,
            fill: "black",
            fontStyle: "italic",
            selectable: true,
        });
        fabricCanvas.current.add(quote);
        fabricCanvas.current.setActiveObject(quote);
        fabricCanvas.current.renderAll();
    };
    const toggleTexformating = (toolName) => {
        setActiveTool(toolName);
        setIsEraserMode(false);
        setIsTextFormat(!isTextFormat);
        setIsDrawingFormat(false);

        addText();
        disableDrawingMode();
    };

    const toggleDrawingformating = (toolName) => {
        setActiveTool(toolName);
        setIsTextFormat(false);
        setIsDrawingFormat(!isDrawingFormat);
        enableDrawingMode();
        setIsEraserMode(false);
    };

    const changeStrokeWidth = (width) => {
        setStrokeWidth(width);
        enableDrawingMode();
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject) {
            activeObject.set("strokeWidth", width);
            activeObject.set("stroke", "#000000");
            fabricCanvas.current.renderAll();
        }
    };

    const changeOpacity = (opacity) => {
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject) {
            activeObject.set("opacity", Math.max(0.1, opacity / 100));
            fabricCanvas.current.renderAll();
        }
    };




  useEffect(() => {
     const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.key === "Delete" || event.key === "Backspace") && fabricCanvas.current) {
    const canvas = fabricCanvas.current;
  
    const activeObject = canvas.getActiveObject();

    console.log("Pressed:", event.key);
    console.log("Active object to delete:", activeObject);
    console.log("Type:", activeObject?.type);

    if (!activeObject) return;

    if (activeObject.type === "activeSelection") {
  
        activeObject.getObjects().forEach((obj) => {
        canvas.remove(obj);
      });
      canvas.discardActiveObject(); // 👈 make sure to clear selection
    } else {
      canvas.remove(activeObject);
    }

    canvas.requestRenderAll(); // 👈 force re-render
  
}
};

  window.addEventListener("keydown", handleKeyDown);
 
  return () => {

    window.removeEventListener("keydown", handleKeyDown);
  };

}, []);

    

    
return (
        <>
            <div>
                <canvas ref={canvasRef} />
           
                <div style={{ marginTop: "10px" }}>
                    <button
                        id="save-canvas-button"
                        onClick={saveDrawingData}
                        style={{ display: "none" }}
                    >
                        Save
                    </button>
                </div>
    
            </div>

            <div className="toolbox">
                <DrawingToolButton icon="/img/drawingEditorIcons/icon.svg" />
                <hr />

                <DrawingToolButton
                    icon="/img/drawingEditorIcons/moveArrow.svg"
                    onClick={() => toggleSelectionMode("moveArrow")}
    
                    isActive={activeTool === "moveArrow"}
                />
                <hr />

                {!isTextFormat && (
                    <DrawingToolButton
                        icon="img/drawingEditorIcons/textformating.svg"
                        onClick={() => toggleTexformating("textformat")}
                        isActive={activeTool === "textformat"}
    
                        />
                )}
                {isTextFormat && (
                    <>
                        <div className="style textformating">
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/bold.svg"
                                onClick={() => toggleTextStyle("fontWeight", "bold")}
                            />
    
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/italic.svg"
                                onClick={() => toggleTextStyle("fontStyle", "italic")}
                            />
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/underline.svg"
                                onClick={() => toggleTextStyle("underline", true)}
                            />
                            <DrawingToolButton
    
    icon="/img/drawingEditorIcons/strike.svg"
                                onClick={() => toggleTextStyle("linethrough", true)}
                            />
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/edit.svg"
    
                                onClick={toggleFontSize}
                            />
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/edit2.svg"
                                onClick={togglePen}
    
    />
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/paint.svg"
                                onClick={() => setShowPaintBox(!showPaintBox)}
                            />
    
                            {showPaintBox && (
                                <div className="paintBox">
                                    <button
                                        className="blue"
    
                                        onClick={() => changeColor("blue")}
                                        style={{ backgroundColor: "#28ABFB" }}
                                    ></button>
                                    <button
    
    className="green"
                                        onClick={() => changeColor("green")}
                                        style={{ backgroundColor: "#8BCF16" }}
                                    ></button>
    
                                    <button
                                        className="red"
                                        onClick={() => changeColor("red")}
                                        style={{ backgroundColor: "#FF5F5F" }}
    
    ></button>
                                </div>
                            )}
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/quote.svg"
    
                                onClick={addQuote}
                            />
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/sup.svg"
                                onClick={toggleSuperscript}
    
    />
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/sub.svg"
                                onClick={toggleSubscript}
                            />
    
                        </div>
                        <hr />

                        <div>
                            <DrawingToolButton
                                icon="/img/drawingEditorIcons/link.svg"
                                onClick={addHyperlink}
                            />
                        </div>
    
                        <hr />
                    </>
                )}

                <div>
                    {!isDrawingFormat && (
                        <DrawingToolButton
                            icon="/img/drawingEditorIcons/drawing.svg"
                            onClick={() => toggleDrawingformating("drawingFormat")}
    
                            isActive={activeTool === "drawingFormat"}
                        />
                    )}

                    {isDrawingFormat && (
                        <div className="drawingformating">
                            <div>
                                <DrawingToolButton
                                    icon="/img/drawingEditorIcons/color.svg"
    
                                    onClick={() => {
                                        setShowPaintDrawingBox(!showPaintDrawingBox);
                                        setShowOpacityBox(false);
                                        setShowStrokeBox(false);
                                    }}
                                />
                                {showPaintDrawingBox && (
                                    <div className="paintBox">
                                        <button
    
    className="blue"
                                            onClick={() => changeColorDrawing("blue")}
                                            style={{ backgroundColor: "#28ABFB" }}
                                        ></button>
                                        <button
                                            className="green"
                                            onClick={() => changeColorDrawing("green")}
                                            style={{ backgroundColor: "#8BCF16" }}
                                        ></button>
    
                                        <button
                                            className="red"
                                            onClick={() => changeColorDrawing("red")}
                                            style={{ backgroundColor: "#FF5F5F" }}
    
    ></button>
                                    </div>
                                )}
                            </div>
    
                            <hr />

                            <div>
                                <DrawingToolButton
    
    icon="/img/drawingEditorIcons/stroke.svg"
                                    onClick={() => {
                                        setShowStrokeBox(!showStrokeBox);
                                        setShowOpacityBox(false);
    
                                    }}
                                />
                                {showStrokeBox && (
                                    <div className="strokeBox">
                                        <img src="/img/drawingEditorIcons/stroke.svg" />
                                        <input
                                            value={strokeWidth}
                                            type="number"
                                            maxLength={2}
    
                                            onChange={(e) => {
                                                const val = Number.parseInt(e.target.value, 10);
                                                setStrokeWidth(val);
                                                changeStrokeWidth(val);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
    
                            <hr />

                            <div>
                                <DrawingToolButton
                                    icon="/img/drawingEditorIcons/opacity.svg"
                                    onClick={() => {
                                        setShowOpacityBox(!showOpacityBox);
                                        setShowStrokeBox(false);
                                    }}
    
    />
                                {showOpacityBox && (
                                    <div className="opacityBox">
                                        <img src="/img/drawingEditorIcons/opacity.svg" />
                                        <input
                                            type="number"
                                            value={opacityValue}
                                            maxLength={3}
                                            max={100}
    
                                            onChange={(e) => {
                                                const val = Number.parseInt(e.target.value, 10);
                                                setOpacityValue(val);
                                                changeOpacity(val);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
    
                            <hr />
                        </div>
                    )}
                </div>

                <div>
                    <div>
                       <div style={{ position: "relative" }}>
  <DrawingToolButton
    
    icon="/img/drawingEditorIcons/shape.svg"
  
    onClick={() => {
      setShowMoreTools(!showMoreTools);
    
      setActiveTool("shape");
    }}
  
    isActive={activeTool === "shape"}
  
  />
  {showMoreTools && (
     <div ref={shapePopoverRef} className="flyout-menu shape-popover">
    <DrawingToolButton
      icon="/img/drawingEditorIcons/rectangle-icon.svg"
    
      onClick={() => addShape("rectangle", "shape")}
   
   />
  
    <DrawingToolButton
      icon="/img/drawingEditorIcons/circle-icon.svg"
      onClick={() => addShape("circle", "shape")}
    />
  
    <DrawingToolButton
      icon="/img/drawingEditorIcons/triangle-icon.svg"
   
      onClick={() => addShape("triangle", "shape")}
  
  />
 
  </div>
  )}

</div>
               
                    </div>
                    <hr />

                    <div>
                        <DrawingToolButton
    icon="/img/drawingEditorIcons/lasso.svg"
    onClick={toggleLassoTool}
    isActive={activeTool === "lasso"}
/>
                    </div>
              
                    <hr />

                    <div>
                        <DrawingToolButton
                            icon="/img/drawingEditorIcons/eraser.svg"
                            onClick={() => toggleEraserMode("eraser")}
                            isActive={activeTool === "eraser"}
                        />
                    </div>
                    <hr />
      

                </div>
            </div>
        </>
    );
};

export default FabricCanvasWindow;