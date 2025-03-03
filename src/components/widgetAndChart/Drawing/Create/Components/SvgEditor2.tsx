import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./Editor.less"
import DrawingToolButton from "src/components/widgetAndChart/Component/DrawingToolButton/DrawingToolButton";

const FabricCanvasWindow = ({ drawingData, setDrawingData ,setImageData}) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [isPen, setIsPen]=useState(true);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [showPaintBox, setShowPaintBox] = useState(false);
    const fontSizes = [8, 12, 16, 32]; // Font sizes to toggle through
    const indentAmount = 20;

useEffect(() => {
    // Initialize Fabric.js canvas
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 700,
      height: 350,
      backgroundColor: "#ffffff",
    });

    console.log("drawing data" + drawingData);
    // Load existing drawing data if available
    if (drawingData) {
      fabricCanvas.current.loadFromJSON(drawingData, fabricCanvas.current.renderAll.bind(fabricCanvas.current));
    }

    return () => {
      fabricCanvas.current.dispose(); // Cleanup on unmount
    };
  }, [drawingData]);

   const saveDrawingData = () => {
    const jsonData = fabricCanvas.current.toJSON();
    const imageUrl = fabricCanvas.current.toDataURL();
    setDrawingData(jsonData);
    setImageData(imageUrl)
    //alert(imageUrl);
  };

  // Function to add a rectangle
  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 100,
      height: 100,
      selectable: true,
    });
    fabricCanvas.current.add(rect);
    fabricCanvas.current.renderAll();
  };
  const togglePen = () => {
  setIsPen(prevIsPen => {
    const newIsPen = !prevIsPen;

    if (newIsPen) {
      enableDrawingMode();
    } else {
      disableDrawingMode();
      addText();
    }

    return newIsPen;
  });
};

const enableDrawingMode = () => {
  fabricCanvas.current.isDrawingMode = true;
  fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current);
  fabricCanvas.current.freeDrawingBrush.color = "red";
  fabricCanvas.current.freeDrawingBrush.width = 3;
};

const disableDrawingMode = () => {
  fabricCanvas.current.isDrawingMode = false;
};


  // Function to add text
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

  // Toggle free drawing mode
  const toggleDrawingMode = () => {
    // setIsDrawingMode((prevMode) => !prevMode);
    fabricCanvas.current.isDrawingMode = !isDrawingMode;

    if (fabricCanvas.current.isDrawingMode) {
      fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(
        fabricCanvas.current
      );
      fabricCanvas.current.freeDrawingBrush.color = "red";
      fabricCanvas.current.freeDrawingBrush.width = 3;
    }
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


  // Function to indent selected text
  const indentText = () => {
    const text = getSelectedTextObject();
    if (text) {
      text.setSelectionStyles({
        deltaX: (text.getSelectionStyles().deltaX || 0) + indentAmount,
      });
      fabricCanvas.current.renderAll();
    }
  };

  const changeColor = (color) => {
    const activeObject = fabricCanvas.current.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", color);
      fabricCanvas.current.renderAll();
    }
  };
  return (
    <>
    <div>
      <canvas ref={canvasRef} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={saveDrawingData}>Save</button>
        {/* <button onClick={addText}>Add Text</button> */}
        {/* <button onClick={toggleDrawingMode}>
          {isDrawingMode ? "Disable Drawing" : "Enable Drawing"}
        </button> */}
      </div>
    </div>

      <div className="toolbox">
        <DrawingToolButton icon="/img/drawingEditorIcons/icon.svg" />
        <hr />

        <div className="style">
          <DrawingToolButton icon="/img/drawingEditorIcons/bold.svg"  onClick={() => toggleTextStyle("fontWeight", "bold")} />

          <DrawingToolButton icon="/img/drawingEditorIcons/italic.svg" onClick={() => toggleTextStyle("fontStyle", "italic")}/>

          <DrawingToolButton icon="/img/drawingEditorIcons/underline.svg" onClick={() => toggleTextStyle("underline", true)}/>

          <DrawingToolButton icon="/img/drawingEditorIcons/strike.svg" onClick={() => toggleTextStyle("linethrough", true)}/>

        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/edit.svg"  onClick={toggleFontSize} />
           
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/edit2.svg"  onClick={togglePen} />
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
          <DrawingToolButton icon="/img/drawingEditorIcons/quote.svg"  />
        </div>
        <hr />

        <div> 
          <DrawingToolButton icon="/img/drawingEditorIcons/sup.svg" onClick={toggleSuperscript}/>
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/sub.svg" onClick={toggleSubscript}/>
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/link.svg" onClick={addHyperlink}/>
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/textinsert.svg" onClick={indentText} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/paragraph.svg"  />

        </div>
      </div>
    </>
  );
};

export default FabricCanvasWindow;
