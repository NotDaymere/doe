"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./Editor.less";

import DrawingToolButton from "src/components/widgetAndChart/Component/DrawingToolButton/DrawingToolButton";

const FabricCanvasWindow = ({ drawingData, id }) => {
    const canvasRef = useRef(null);

    const fabricCanvas = useRef(null);
    const [isPen, setIsPen] = useState(true);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [isTextFormat, setIsTextFormat] = useState(false);

    const [isDrawingFormat, setIsDrawingFormat] = useState(false);
    const [showPaintBox, setShowPaintBox] = useState(false);
    const fontSizes = [8, 12, 16, 32]; // Font sizes to toggle through
    const [showPaintDrawingBox, setShowPaintDrawingBox] = useState(false);
   
    const [showStrokeBox, setShowStrokeBox] = useState(false);
    const [showOpacityBox, setShowOpacityBox] = useState(false);
    const [isEraserMode, setIsEraserMode] = useState(false);
    const [showShapeBox, setShowShapeBox] = useState(false);

    const [strokeWidth, setStrokeWidth] = useState(1);
    const [opacityValue, setOpacityValue] = useState(100);
    const [showMoreTools, setShowMoreTools] = useState(false);
    const [drawingcolor, setDrawingColor] = useState("#000000");
    const [activeTool, setActiveTool] = useState("");
    const isLassoDrawing = useRef(false);
    const lassoPoints = useRef([]);
    const lassoPath = useRef(null);

   
    const resetToolbar = () => {
        setIsTextFormat(false);
        setIsDrawingFormat(false);
        setShowPaintBox(false);
        setShowPaintDrawingBox(false);
        setShowStrokeBox(false);
        setShowOpacityBox(false);
        setShowMoreTools(false);
        setShowShapeBox(false);
   
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

    if (drawingData) {
        fabricCanvas.current.loadFromJSON(drawingData, () => {
            requestAnimationFrame(() => {
                fabricCanvas.current.renderAll();
            });
        });
    
    }

    // <<< MODIFIED: This function now handles both single objects and group selections
    const handleKeyDown = (event) => {
        if (event.key === "Delete" || event.key === "Backspace") {
            const activeObject = fabricCanvas.current.getActiveObject();
            
            if (!activeObject) {
                return; // Nothing to do if nothing is selected
    
            }

            // Check if the active object is a group (from lasso selection)
            if (activeObject.type === 'activeSelection') {
                // If it's a group, iterate over the objects and remove them
                activeObject.getObjects().forEach(obj => {
                    fabricCanvas.current.remove(obj);
                });
                // Discard the active selection group
    
                fabricCanvas.current.discardActiveObject();
            } else {
                // If it's a single object, remove it directly
                fabricCanvas.current.remove(activeObject);
            }
            
            // Re-render the canvas to show the changes
            fabricCanvas.current.renderAll();
        }
    
    };

    // Add event listener for text deselection
    const handleSelectionCleared = () => {
        resetToolbar();
    };

    // Add event listener for clicks outside text
    const handleMouseDown = (event) => {
    
        const activeObject = fabricCanvas.current.getActiveObject();
        if (!activeObject || activeObject.type !== "i-text") {
            resetToolbar();
        }
    
    };

    window.addEventListener("keydown", handleKeyDown);
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
}, [drawingData]); // The dependency array remains the same

  
    const saveDrawingData = () => {
        if (fabricCanvas.current) {
            const jsonData = fabricCanvas.current.toJSON();
            const imageUrl = fabricCanvas.current.toDataURL();
      
            const savedDrawings = JSON.parse(localStorage.getItem("drawings") || "[]");
            const newDrawing = {
                id: `Drawing_${new Date().toISOString()}`,
                drawingData: jsonData,
                imageUrl: imageUrl,
   
            };
            let updatedDrawings;
            if (id) {
  
                updatedDrawings = savedDrawings.map((drawing) =>
                    drawing.id === id ? newDrawing : drawing
                );
            } else {
                updatedDrawings = [...savedDrawings, newDrawing];
            }
            localStorage.setItem("drawings", JSON.stringify(updatedDrawings));
        }
    };

    const togglePen = () => {
        addText();
    };

    const enableDrawingMode = (color = drawingcolor, width = strokeWidth) => {
        if (!fabricCanvas.current) return;
        setIsDrawingMode(true);
        fabricCanvas.current.isDrawingMode = true;
        fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
   
        const brushColor = new fabric.Color(color).setAlpha(opacityValue / 100).toRgba();
        fabricCanvas.current.freeDrawingBrush.color = brushColor;
        fabricCanvas.current.freeDrawingBrush.width = width;
    };

    const disableDrawingMode = () => {
        setIsDrawingMode(false);
        if (fabricCanvas.current) {
            fabricCanvas.current.isDrawingMode = false;
   
        }
    };

    const toggleSelectionMode = (toolName) => {
        setActiveTool(toolName);
        disableDrawingMode();
        setIsEraserMode(false);
        fabricCanvas.current.selection = true;
        fabricCanvas.current.forEachObject((obj) => (obj.selectable = true));
   
    };

    const toggleLassoSelection = (toolName) => {
        setActiveTool(toolName);
        disableDrawingMode();
        setIsEraserMode(false);
        if (fabricCanvas.current) {
            fabricCanvas.current.selection = false;
            fabricCanvas.current.defaultCursor = "default";
   
            fabricCanvas.current.hoverCursor = "default";
            fabricCanvas.current.forEachObject((obj) => {
                obj.selectable = true;
            });
        }
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
            if (fabricCanvas.current) {
                fabricCanvas.current.off("mouse:down", handleObjectClick);
    
            }
        };
    }, [isEraserMode]);

    const addShape = (shape, toolName) => {
        disableDrawingMode();
        setActiveTool(toolName);
        let shapeObject;
    
    
        switch (shape) {
            case "circle":
                shapeObject = new fabric.Circle({ radius: 30, fill: "blue", left: 100, top: 100 });
                break;
  
                case "rectangle":
                shapeObject = new fabric.Rect({ width: 60, height: 40, fill: "green", left: 150, top: 150 });
                break;
            case "triangle":
   
            shapeObject = new fabric.Triangle({ width: 60, height: 50, fill: "red", left: 200, top: 200 });
                break;
            default:
                return;
   
            }
         fabricCanvas.current.setActiveObject(shapeObject);
        fabricCanvas.current.add(shapeObject);
        fabricCanvas.current.renderAll();
    
        setShowShapeBox(false);
    };

    const addText = () => {
        const text = new fabric.IText("Editable Text", { left: 150, top: 150, fontSize: 16, fill: "black", selectable: true });
       
        fabricCanvas.current.add(text);
        fabricCanvas.current.setActiveObject(text);
        fabricCanvas.current.renderAll();
    
    };

    const getSelectedTextObject = () => {
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject && activeObject.type === "i-text") {
            return activeObject;
        
        }
     
    
        alert("Please select a text object and highlight text to format.");
        return null;
    };

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

    
    
    const toggleFontSize = () => {
        const text = getSelectedTextObject();
        if (text) {
  
            const currentSize = text.fontSize;
            const nextSize = fontSizes[(fontSizes.indexOf(currentSize) + 1) % fontSizes.length];
            text.set("fontSize", nextSize);
            fabricCanvas.current.renderAll();
        }
    
    };

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

    
    const addHyperlink = () => {
    
        const text = getSelectedTextObject();
        if (text) {
    
    
            const url = prompt("Enter the URL for the link:");
            if (url) {
                text.setSelectionStyles({ fill: "blue", underline: true, link: url });
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
        enableDrawingMode(color, strokeWidth);
    };

    
    const addQuote = () => {
        
        const quote = new fabric.IText('"Your quote here"', { left: 100, top: 100, fontSize: 24, fill: "black", fontStyle: "italic", selectable: true });
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
        const newWidth = Math.max(1, width);
    
        setStrokeWidth(newWidth);
        enableDrawingMode(drawingcolor, newWidth);
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject) {
            activeObject.set("strokeWidth", newWidth);
            activeObject.set("stroke", "#000000");
            fabricCanvas.current.renderAll();
        }
    };

   
    const changeOpacity = (opacity) => {
        const newOpacity = Math.max(0, Math.min(100, opacity));
        setOpacityValue(newOpacity);
        const activeObject = fabricCanvas.current.getActiveObject();
        if (activeObject) {
            activeObject.set("opacity", newOpacity / 100);
            fabricCanvas.current.renderAll();
        }
       
        if (isDrawingMode) {
    
            enableDrawingMode(drawingcolor, strokeWidth);
        }
    };

    useEffect(() => {
        if (!fabricCanvas.current) return;
        const canvas = fabricCanvas.current;
       
        canvas.off("mouse:down");
        canvas.off("mouse:move");
     
        canvas.off("mouse:up");

        const handleMouseDown = (opt) => {
            if (isEraserMode && opt.target) {
  
                canvas.remove(opt.target);
       
                canvas.renderAll();
                return;
            }
     
            if (activeTool !== "lasso") return;
            isLassoDrawing.current = true;
            lassoPoints.current = [];
            const pointer = canvas.getPointer(opt.e);
     
       
            lassoPoints.current.push({ x: pointer.x, y: pointer.y });
            lassoPath.current = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
                strokeWidth: 2,
                stroke: "black",
   
                strokeDashArray: [5, 5],
                fill: "rgba(0, 0, 0, 0.05)",
                selectable: false,
                evented: false,
       
                objectCaching: false,
            });
            canvas.add(lassoPath.current);
            canvas.renderAll();
        };
   
        const handleMouseMove = (opt) => {
            if (!isLassoDrawing.current || activeTool !== "lasso") return;
            const pointer = canvas.getPointer(opt.e);
       
            lassoPoints.current.push({ x: pointer.x, y: pointer.y });
            if (lassoPath.current) {
                lassoPath.current.path.push(["L", pointer.x, pointer.y]);
                lassoPath.current.setCoords();
                canvas.renderAll();
            }
 
        };
        const handleMouseUp = () => {
       
            if (!isLassoDrawing.current || activeTool !== "lasso") return;
            isLassoDrawing.current = false;
            if (lassoPoints.current.length > 2 && lassoPath.current) {
                const firstPoint = lassoPoints.current[0];
       
                lassoPath.current.path.push(["L", firstPoint.x, firstPoint.y]);
                lassoPath.current.path.push(["z"]);
                lassoPath.current.setCoords();

       
                canvas.renderAll();
                selectObjectsInLasso();
            }
            if (lassoPath.current) {
                canvas.remove(lassoPath.current);
                canvas.renderAll();
            }
            lassoPath.current = null;
        };
  
        const selectObjectsInLasso = () => {
            canvas.discardActiveObject();
            const selectedObjects = [];
            canvas.forEachObject((obj) => {
                if (obj === lassoPath.current) return;
                if (isObjectInLasso(obj)) {
                    selectedObjects.push(obj);
                }
            });
  
            if (selectedObjects.length > 0) {
                const selection = new fabric.ActiveSelection(selectedObjects, {
                    canvas: canvas,
                });
                canvas.setActiveObject(selection);
            }
            canvas.requestRenderAll();
        };
        const isObjectInLasso = (obj) => {
 
            const objBounds = obj.getBoundingRect();
            const points = [
                { x: objBounds.left + objBounds.width / 2, y: objBounds.top + objBounds.height / 2 },
                { x: objBounds.left, y: objBounds.top },
                { x: objBounds.left + objBounds.width, y: objBounds.top },
                { x: objBounds.left, y: objBounds.top + objBounds.height },
                { x: objBounds.left + objBounds.width, y: objBounds.top + objBounds.height },
            ];
            for (const point of points) {
   
                if (isPointInPolygon(point)) {
                    return true;
                }
            }
            return false;
        };
        const isPointInPolygon = (point) => {
            const polygon = lassoPoints.current;
            if (!polygon || polygon.length < 3) return false;
      
            let inside = false;
            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const xi = polygon[i].x;
                const yi = polygon[i].y;
     
                const xj = polygon[j].x;
                const yj = polygon[j].y;
                const intersect =
                    yi > point.y !== yj > point.y &&
   
                    point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
                if (intersect) inside = !inside;
            }
            return inside;
   
        };
        canvas.on("mouse:down", handleMouseDown);
        canvas.on("mouse:move", handleMouseMove);
        canvas.on("mouse:up", handleMouseUp);
   
        return () => {
            if (canvas) {
                canvas.off("mouse:down", handleMouseDown);
                canvas.off("mouse:move", handleMouseMove);
                canvas.off("mouse:up", handleMouseUp);
            }
        };
    }, [activeTool, isEraserMode]);

   
    return (
        <>
            <div>
                <canvas ref={canvasRef} />
                <div style={{ marginTop: "10px" }}>
                    <button id="save-canvas-button" onClick={saveDrawingData} style={{ display: "none" }}>
                        Save
                    </button>
                </div>
  
            </div>

            <div className="toolbox">
                <div>
       
                    <DrawingToolButton icon="/img/drawingEditorIcons/icon.svg" />
                </div>
                <hr />
                <div>
       
                    <DrawingToolButton icon="/img/drawingEditorIcons/moveArrow.svg" onClick={() => toggleSelectionMode("moveArrow")} isActive={activeTool === "moveArrow"} />
  
                </div>
                <hr />
       
                <div>
                    {!isTextFormat && (
                        <DrawingToolButton icon="img/drawingEditorIcons/textformating.svg" onClick={() => toggleTexformating("textformat")} isActive={activeTool === "textformat"} />
                    )}
       
                    {isTextFormat && (
                        <>
                            <div className="style textformating">
  
                                <DrawingToolButton icon="/img/drawingEditorIcons/bold.svg" onClick={() => toggleTextStyle("fontWeight", "bold")} />
                                <DrawingToolButton icon="/img/drawingEditorIcons/italic.svg" onClick={() => toggleTextStyle("fontStyle", "italic")} />
                                <DrawingToolButton icon="/img/drawingEditorIcons/underline.svg" onClick={() => toggleTextStyle("underline", true)} />
                                <DrawingToolButton icon="/img/drawingEditorIcons/strike.svg" onClick={() => toggleTextStyle("linethrough", true)} />
                            </div>
       
                            <hr />
                            <div><DrawingToolButton icon="/img/drawingEditorIcons/edit.svg" onClick={toggleFontSize} /></div>
                            <hr />
                            <div><DrawingToolButton icon="/img/drawingEditorIcons/edit2.svg" onClick={togglePen} /></div>
    
                            <hr />
                            <div>
                                <DrawingToolButton icon="/img/drawingEditorIcons/paint.svg" onClick={() => setShowPaintBox(!showPaintBox)} />
                                {showPaintBox && (
       
       <div className="paintBox flyout-menu">
                                        <button className="blue" onClick={() => changeColor("#28ABFB")} style={{ backgroundColor: "#28ABFB" }}></button>
                                        <button className="green" onClick={() => changeColor("#8BCF16")} style={{ backgroundColor: "#8BCF16" }}></button>
                                        <button className="red" onClick={() => changeColor("#FF5F5F")} style={{ backgroundColor: "#FF5F5F" }}></button>
                                    </div>
    
    )}
                            </div>
                            <hr />
       
                            <div><DrawingToolButton icon="/img/drawingEditorIcons/quote.svg" onClick={addQuote} /></div>
                            <hr />
                            <div><DrawingToolButton icon="/img/drawingEditorIcons/sup.svg" onClick={toggleSuperscript} /></div>
                            <hr />
                            <div><DrawingToolButton icon="/img/drawingEditorIcons/sub.svg" onClick={toggleSubscript} /></div>
                            <hr />
   
                            <div><DrawingToolButton icon="/img/drawingEditorIcons/link.svg" onClick={addHyperlink} /></div>
                        </>
       
       )}
                </div>
                <hr />
                <div>
                    {!isDrawingFormat && (
                        <DrawingToolButton icon="/img/drawingEditorIcons/drawing.svg" onClick={() => toggleDrawingformating("drawingFormat")} isActive={activeTool === "drawingFormat"} />
                    )}
      
                    {isDrawingFormat && (
       
       <div className="drawingformating">
                            <div>
                                <DrawingToolButton icon="/img/drawingEditorIcons/color.svg" onClick={() => { setShowPaintDrawingBox(!showPaintDrawingBox); setShowOpacityBox(false); setShowStrokeBox(false); }} />
    
                                {showPaintDrawingBox && (
                                    <div className="paintBox flyout-menu">
                                        <button className="blue" onClick={() => changeColorDrawing("#28ABFB")} style={{ backgroundColor: "#28ABFB" }}></button>
                                        <button className="green" onClick={() => changeColorDrawing("#8BCF16")} style={{ backgroundColor: "#8BCF16" }}></button>
 
       
                                        <button className="red" onClick={() => changeColorDrawing("#FF5F5F")} style={{ backgroundColor: "#FF5F5F" }}></button>
                                    </div>
                                )}
                            </div>
   
                            <hr />
                            <div>
                                <DrawingToolButton icon="/img/drawingEditorIcons/stroke.svg" onClick={() => { setShowStrokeBox(!showStrokeBox); setShowOpacityBox(false); }} />
                                {showStrokeBox && (
    
    <div className="strokeBox flyout-menu">
                                        <img src="/img/drawingEditorIcons/stroke.svg" alt="stroke" />
                                        <input value={strokeWidth} type="number" maxLength={2} onChange={(e) => { const val = Number.parseInt(e.target.value, 10); if (!isNaN(val)) { changeStrokeWidth(val); } }} />
                                    </div>
                                )}
                            </div>
                            <hr />
                            <div>
                                <DrawingToolButton icon="/img/drawingEditorIcons/opacity.svg" onClick={() => { setShowOpacityBox(!showOpacityBox); setShowStrokeBox(false); }} />
     
                                {showOpacityBox && (
                                    <div className="opacityBox flyout-menu">
                                        <img src="/img/drawingEditorIcons/opacity.svg" alt="opacity" />
                                        <input type="number" value={opacityValue} maxLength={3} max={100} onChange={(e) => { const val = Number.parseInt(e.target.value, 10); if (!isNaN(val)) { changeOpacity(val); } }} />
       
                                    </div>
                                )}
                            </div>
                        </div>
       
       )}
    
                </div>
                <hr />
       
                <div>
                    <DrawingToolButton
                        icon="/img/drawingEditorIcons/shape.svg"
                        onClick={() => {
       
                            setShowShapeBox(!showShapeBox);
                            setActiveTool("shape");
                        }}
    
                        isActive={activeTool === "shape"}
                    />
                    {showShapeBox && (
                        <div className="shapeBox flyout-menu">
                            <DrawingToolButton icon="/img/drawingEditorIcons/rectangle-icon.svg" onClick={() => addShape("rectangle", "shape")} />
       
                            <DrawingToolButton icon="/img/drawingEditorIcons/circle-icon.svg" onClick={() => addShape("circle", "shape")} />
                            <DrawingToolButton icon="/img/drawingEditorIcons/triangle-icon.svg" onClick={() => addShape("triangle", "shape")} />
                        </div>
                    )}
     
                </div>
                <hr />
                <div>
                    <DrawingToolButton icon="/img/drawingEditorIcons/lasso.svg" onClick={() => toggleLassoSelection("lasso")} isActive={activeTool === "lasso"} />
       
                </div>
                <hr />
                <div>
                    <DrawingToolButton icon="/img/drawingEditorIcons/eraser.svg" onClick={() => toggleEraserMode("eraser")} isActive={activeTool === "eraser"} />
                </div>
         
            </div>
        </>
    );

};

export default FabricCanvasWindow;