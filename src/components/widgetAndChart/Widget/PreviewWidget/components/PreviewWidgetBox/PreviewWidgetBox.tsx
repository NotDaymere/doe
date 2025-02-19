import { useState, useRef } from "react";
import "./PreviewWidgetBox.less";
import { useChartWidgets } from "../../../../Window/ChartWidgetsWindow";
import { Page } from "../../../../Enums/Page.enum";

function PreviewWidgetBox() {
  const { setPage, paramter } = useChartWidgets();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const handleStart = (e: any) => {
    setDragging(true);

    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;

    setStartPos({
      x: clientX - position.x,
      y: clientY - position.y,
    });

    document.body.style.userSelect = "none";
  };

  const handleMove = (e: any) => {
    if (!dragging) return;

    const clientX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;

    setPosition({
      x: clientX - startPos.x,
      y: clientY - startPos.y,
    });
  };

  const handleEnd = () => {
    setDragging(false);
    document.body.style.userSelect = "auto";
  };

  return (
    <div
      className="widgetpreview"
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <button
        className="previewClose"
        onClick={() => {
          setPage(Page.WIDGET_IN_CHAT);
        }}
      >
        <img src="/img/icons/closePreview.svg" alt="Close" />
      </button>
      <div className="previewHead">
        <div className="previewbuttons">
          <button>
            <img src="/img/icons/widgetprv_collapse.svg" alt="Collapse" />
          </button>
          <button>
            <img src="/img/icons/widgetprv_fullscreen.svg" alt="Fullscreen" />
          </button>
        </div>
        <div className="previewtitle">
          <p>{paramter}</p>
        </div>
        <div className="widgetIcon">
          <img src="/img/icons/norton.svg" alt="Icon" />
        </div>
      </div>
      <div className="previewBody">
        <img
          ref={imgRef}
          src="/img/screenshot.png"
          alt="Preview"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
            position: "relative",
          }}
        />
      </div>
    </div>
  );
}

export default PreviewWidgetBox;
