import { useState } from "react";
import DrawingToolButton from "../../Component/DrawingToolButton/DrawingToolButton";
import DrawCanvas from "./Components/DrawerCanvas";
import "./CreateDrawing.less";

function CreateDrawing() {
  const [showPaintBox, setShowPaintBox] = useState(false);
  const [strokeColor, setStrokeColor] = useState("orange");

  return (
    <div className="canvas">
      <DrawCanvas label="Drawing #1" strokeColor={strokeColor} />
      
      <div className="toolbox">
        <DrawingToolButton icon="/img/drawingEditorIcons/icon.svg" />
        <hr />

        <div className="style">
          <DrawingToolButton icon="/img/drawingEditorIcons/bold.svg" />
          <DrawingToolButton icon="/img/drawingEditorIcons/italic.svg" />
          <DrawingToolButton icon="/img/drawingEditorIcons/underline.svg" />
          <DrawingToolButton icon="/img/drawingEditorIcons/strike.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/edit.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/edit2.svg" />
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
          <DrawingToolButton icon="/img/drawingEditorIcons/quote.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/sup.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/sub.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/link.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/textinsert.svg" />
        </div>
        <hr />

        <div>
          <DrawingToolButton icon="/img/drawingEditorIcons/paragraph.svg" />
        </div>
      </div>
    </div>
  );
}

export default CreateDrawing;
