

import { useEffect, useRef, useState } from "react"
import * as fabric from "fabric"
import "./Editor.less"
import DrawingToolButton from "src/components/widgetAndChart/Component/DrawingToolButton/DrawingToolButton"

const FabricCanvasWindow = ({ drawingData,id }) => {
  const canvasRef = useRef(null)
  const fabricCanvas = useRef(null)
  const [isPen, setIsPen] = useState(true)
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [showPaintBox, setShowPaintBox] = useState(false)
  const fontSizes = [8, 12, 16, 32] // Font sizes to toggle through
  const indentAmount = 20
  

 useEffect(() => {
    // Initialize Fabric.js canvas
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 700,
      height: 350,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    console.log("Drawing data loaded:", drawingData);

    // Load existing drawing data if available
    if (drawingData) {
    fabricCanvas.current.loadFromJSON(drawingData, () => {
        requestAnimationFrame(() => {
            fabricCanvas.current.renderAll();
        });
    });
    enableDrawingMode();
}else {
        enableDrawingMode(); // Enable drawing mode directly if no data to load
    }

 // Add event listener for delete key
    const handleKeyDown = (event) => {
        if (event.key === "Delete" || event.key === "Backspace") {
            const activeObject = fabricCanvas.current.getActiveObject();
            if (activeObject) {
                fabricCanvas.current.remove(activeObject);
                fabricCanvas.current.renderAll();
            }
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
       window.removeEventListener("keydown", handleKeyDown);
        fabricCanvas.current.dispose(); // Cleanup on unmount
    };
}, [drawingData]);

  

  const saveDrawingData = () => {
    if (fabricCanvas.current) {
      const jsonData = fabricCanvas.current.toJSON()
      const imageUrl = fabricCanvas.current.toDataURL()

      console.log("Saving canvas data:", { jsonData, imageUrl })



      const savedDrawings = JSON.parse(localStorage.getItem("drawings") || "[]");
      // Create a new drawing object or update existing one
              const newDrawing = {
                id:`Drawing_${new Date().toISOString()}`, // Use existing ID or create new one
                drawingData: jsonData,
                imageUrl: imageUrl,
              }
      
              // If editing existing drawing, replace it; otherwise add new
              let updatedDrawings
              if (id) {
                updatedDrawings = savedDrawings.map((drawing) => (drawing.id === id ? newDrawing : drawing))
              } else {
                updatedDrawings = [...savedDrawings, newDrawing]
             }
      
              localStorage.setItem("drawings", JSON.stringify(updatedDrawings))
              console.log("Saved drawing:", newDrawing)
      
      
    }
  }



  const togglePen = () => {
    setIsPen((prevIsPen) => {
      const newIsPen = !prevIsPen

      if (newIsPen) {
        enableDrawingMode()
      } else {
        disableDrawingMode()
        addText()
      }

      return newIsPen
    })
  }

  const enableDrawingMode = () => {
    fabricCanvas.current.isDrawingMode = true
    fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current)
    fabricCanvas.current.freeDrawingBrush.color = "red"
    fabricCanvas.current.freeDrawingBrush.width = 3
  }

  const disableDrawingMode = () => {
    fabricCanvas.current.isDrawingMode = false
  }

  // Function to add text
  const addText = () => {
    const text = new fabric.IText("Editable Text", {
      left: 150,
      top: 150,
      fontSize: 16,
      fill: "black",
      selectable: true,
    })
    fabricCanvas.current.add(text)
    fabricCanvas.current.setActiveObject(text)
    fabricCanvas.current.renderAll()
  }

  // Function to get the selected text object
  const getSelectedTextObject = () => {
    const activeObject = fabricCanvas.current.getActiveObject()
    if (activeObject && activeObject.type === "i-text") {
      return activeObject
    }
    alert("Please select a text object and highlight text to format.")
    return null
  }

  // Toggle free drawing mode
  const toggleDrawingMode = () => {
    const newMode = !isDrawingMode
    setIsDrawingMode(newMode)
    fabricCanvas.current.isDrawingMode = newMode

    if (fabricCanvas.current.isDrawingMode) {
      fabricCanvas.current.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas.current)
      fabricCanvas.current.freeDrawingBrush.color = "red"
      fabricCanvas.current.freeDrawingBrush.width = 3
    }
  }

  // Function to toggle styles for selected text range
  const toggleTextStyle = (style, value) => {
    const text = getSelectedTextObject()
    if (text) {
      if (text.getSelectionStyles) {
        const currentStyles = text.getSelectionStyles()
        text.setSelectionStyles({ [style]: currentStyles[style] === value ? null : value })
      }
      fabricCanvas.current.renderAll()
    }
  }

  // Function to toggle font size
  const toggleFontSize = () => {
    const text = getSelectedTextObject()
    if (text) {
      const currentSize = text.fontSize
      const nextSize = fontSizes[(fontSizes.indexOf(currentSize) + 1) % fontSizes.length]
      text.set("fontSize", nextSize)
      fabricCanvas.current.renderAll()
    }
  }

  // Function to apply Superscript
  const toggleSuperscript = () => {
    const text = getSelectedTextObject()
    if (text) {
      const currentStyles = text.getSelectionStyles()
      const isSuperscript = currentStyles.fontSize && currentStyles.fontSize < text.fontSize

      text.setSelectionStyles({
        fontSize: isSuperscript ? text.fontSize : text.fontSize * 0.7,
        deltaY: isSuperscript ? 0 : -text.fontSize * 0.3,
      })
      fabricCanvas.current.renderAll()
    }
  }

  // Function to apply Subscript
  const toggleSubscript = () => {
    const text = getSelectedTextObject()
    if (text) {
      const currentStyles = text.getSelectionStyles()
      const isSubscript = currentStyles.fontSize && currentStyles.fontSize < text.fontSize

      text.setSelectionStyles({
        fontSize: isSubscript ? text.fontSize : text.fontSize * 0.7,
        deltaY: isSubscript ? 0 : text.fontSize * 0.3,
      })
      fabricCanvas.current.renderAll()
    }
  }

  // Function to add a hyperlink
  const addHyperlink = () => {
    const text = getSelectedTextObject()
    if (text) {
      const url = prompt("Enter the URL for the link:")
      if (url) {
        text.setSelectionStyles({
          fill: "blue", // Change text color to blue
          underline: true, // Underline the text
          link: url, // Store link metadata
        })

        // Make the link clickable
        fabricCanvas.current.on("mouse:down", (event) => {
          const clickedObject = event.target
          if (clickedObject && clickedObject.type === "i-text") {
            const selectionStyles = clickedObject.getSelectionStyles()
            if (selectionStyles.link) {
              window.open(selectionStyles.link, "_blank")
            }
          }
        })

        fabricCanvas.current.renderAll()
      }
    }
  }

  // Function to indent selected text
  const indentText = () => {
    const text = getSelectedTextObject()
    if (text) {
      text.setSelectionStyles({
        deltaX: (text.getSelectionStyles().deltaX || 0) + indentAmount,
      })
      fabricCanvas.current.renderAll()
    }
  }

  const changeColor = (color) => {
    const activeObject = fabricCanvas.current.getActiveObject()
    if (activeObject) {
      activeObject.set("fill", color)
      fabricCanvas.current.renderAll()
    }
  }


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
        <DrawingToolButton icon="/img/drawingEditorIcons/icon.svg" />
        <hr />

        <div className="style">
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
          <DrawingToolButton icon="/img/drawingEditorIcons/edit.svg" onClick={toggleFontSize} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/edit2.svg" onClick={togglePen} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/paint.svg" onClick={() => setShowPaintBox(!showPaintBox)} />
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
          <DrawingToolButton icon="/img/drawingEditorIcons/quote.svg" onClick={addQuote} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/sup.svg" onClick={toggleSuperscript} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/sub.svg" onClick={toggleSubscript} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/link.svg" onClick={addHyperlink} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/textinsert.svg" onClick={indentText} />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/paragraph.svg" />
        </div>
      </div>
    </>
  )
}

export default FabricCanvasWindow

