import React, { useRef, useState } from "react";
import { line, curveBasis } from "d3-shape";

const DrawCanvas = ({
  width = 600,
  height = 300,
  mode = "freehand",
  strokeColor = "black",
  initialPaths = [],
  owner = "Anonymous",
}) => {
  const [paths, setPaths] = useState(initialPaths);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [texts, setTexts] = useState<{ x: number; y: number; text: string }[]>([]);
  const [editingText, setEditingText] = useState<{ x: number; y: number; text: string; index: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getMousePos = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    return {
      x: event.clientX - (rect?.left || 0),
      y: event.clientY - (rect?.top || 0),
    };
  };

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (mode === "freehand") {
      setCurrentPath([getMousePos(event)]);
      setIsDrawing(true);
    } else if (mode === "straight") {
      setStartPoint(getMousePos(event));
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mode === "freehand" && isDrawing) {
      setCurrentPath((prevPath) => [...prevPath, getMousePos(event)]);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDrawing(false);

    if (mode === "freehand" && currentPath.length > 1) {
      const formattedPath = currentPath.map((point) => [point.x, point.y] as [number, number]);
      const pathData = line()
        .curve(curveBasis)
        .x((d) => d[0])
        .y((d) => d[1])(formattedPath);

      if (pathData) {
        setPaths((prevPaths: any) => [
          ...prevPaths,
          { path: pathData, start: currentPath[0], end: currentPath[currentPath.length - 1], color: strokeColor, owner },
        ]);
      }
    } else if (mode === "straight" && startPoint) {
      const endPoint = getMousePos(event);
      const pathData = `M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`;
      setPaths((prevPaths) => [
        ...prevPaths,
        { path: pathData, start: startPoint, end: endPoint, color: strokeColor, owner },
      ]);
    }
    setCurrentPath([]);
    setStartPoint(null);
  };

  const handleDoubleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Double-click detected!");

    const mousePos = getMousePos(event);

    // Check if clicking on an existing text to edit
    const textIndex = texts.findIndex((t) => Math.abs(t.x - mousePos.x) < 20 && Math.abs(t.y - mousePos.y) < 20);

    if (textIndex !== -1) {
      setEditingText({ ...texts[textIndex], index: textIndex });
    } else {
      setTexts([...texts, { x: mousePos.x, y: mousePos.y, text: "New Text" }]);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingText) {
      setEditingText({ ...editingText, text: event.target.value });
    }
  };

  const handleTextBlur = () => {
    if (editingText) {
      const updatedTexts = [...texts];
      updatedTexts[editingText.index] = { x: editingText.x, y: editingText.y, text: editingText.text };
      setTexts(updatedTexts);
      setEditingText(null);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none", // Prevents unwanted selection
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        width,
        height,
      }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick} // ✅ Double-click now works again
        style={{
          background: "white",
          border: "1px solid #ccc",
          cursor: "crosshair",
          pointerEvents: "all", // ✅ Ensures all events pass through
        }}
      >
        {paths.map((d, i) => (
          <g key={i}>
            <path d={d.path} stroke={d.color} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx={d.start.x} cy={d.start.y} r="4" fill={d.color} />
            <circle cx={d.end.x} cy={d.end.y} r="4" fill={d.color} />
          </g>
        ))}
        {texts.map((t, i) => (
          <text
            key={i}
            x={t.x}
            y={t.y}
            fontSize="16"
            fill="black"
            textAnchor="middle"
            style={{ userSelect: "none", cursor: "pointer" }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setEditingText({ ...t, index: i });
            }}
          >
            {t.text}
          </text>
        ))}
      </svg>

      {editingText && (
        <input
          type="text"
          value={editingText.text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          autoFocus
          style={{
            position: "absolute",
            left: editingText.x,
            top: editingText.y,
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "1px solid black",
            padding: "2px 4px",
            fontSize: "14px",
            zIndex: 100,
          }}
        />
      )}
    </div>
  );
};


export default DrawCanvas;
