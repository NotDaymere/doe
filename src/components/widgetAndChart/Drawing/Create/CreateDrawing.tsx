import { useState } from "react";
import DrawingToolButton from "../../Component/DrawingToolButton/DrawingToolButton";
import DrawCanvas from "./Components/DrawerCanvas";
import "./CreateDrawing.less";

function CreateDrawing() {
  const [showPaintBox, setShowPaintBox] = useState(false);
  const [strokeColor, setStrokeColor] = useState("black");

  return (
    <div className="canvas">
      <DrawCanvas strokeColor={strokeColor} />
      <div className="toolbox">
        <DrawingToolButton icon="/drawingEditorIcons/icon.svg" />
        <hr />

        <div className="style">
          <DrawingToolButton icon="/drawingEditorIcons/bold.svg" />
          <DrawingToolButton icon="/drawingEditorIcons/italic.svg" />
          <DrawingToolButton icon="/drawingEditorIcons/underline.svg" />
          <DrawingToolButton icon="/drawingEditorIcons/strike.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/edit.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/edit2.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton
            icon="/drawingEditorIcons/paint.svg"
            onClick={() => setShowPaintBox(!showPaintBox)}
          />
          {showPaintBox && (
            <div className="paintBox">
              <button
                className="blue"
                onClick={() => setStrokeColor("#28ABFB")}
                style={{ backgroundColor: "#28ABFB" }}
              ></button>
              <button
                className="green"
                onClick={() => setStrokeColor("#8BCF16")}
                style={{ backgroundColor: "#8BCF16" }}
              ></button>
              <button
                className="red"
                onClick={() => setStrokeColor("#FF5F5F")}
                style={{ backgroundColor: "#FF5F5F" }}
              ></button>
            </div>
          )}
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/quote.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/sup.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/sub.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/link.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/textinsert.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/drawingEditorIcons/paragraph.svg" />
        </div>
      </div>
    </div>
  );
}

export default CreateDrawing;
