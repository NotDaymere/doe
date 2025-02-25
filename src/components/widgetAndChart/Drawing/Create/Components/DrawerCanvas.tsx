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
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [hoveredOwner, setHoveredOwner] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const getMousePos = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    return {
      x: event.clientX - (rect?.left || 0),
      y: event.clientY - (rect?.top || 0),
    };
  };

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mode === "freehand") {
      setCurrentPath([getMousePos(event)]);
    } else if (mode === "straight") {
      setStartPoint(getMousePos(event));
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mode === "freehand" && currentPath.length > 0) {
      setCurrentPath((prevPath) => [...prevPath, getMousePos(event)]);
    }
  };

  const handleMouseUp = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mode === "freehand" && currentPath.length > 1) {
      const formattedPath = currentPath.map(
        (point) => [point.x, point.y] as [number, number]
      );
      const pathData = line()
        .curve(curveBasis)
        .x((d) => d[0])
        .y((d) => d[1])(formattedPath);
      if (pathData) {
        setPaths((prevPaths:any) => [
          ...prevPaths,
          {
            path: pathData,
            start: currentPath[0],
            end: currentPath[currentPath.length - 1],
            color: strokeColor,
            owner, // Store owner
          },
        ]);
      }
    
    } else if (mode === "straight" && startPoint) {
      const endPoint = getMousePos(event);
      const pathData = `M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`;
      setPaths((prevPaths) => [
        ...prevPaths,
        {
          path: pathData,
          start: startPoint,
          end: endPoint,
        
          color: strokeColor,
          owner, // Store owner
        },
      ]);
    }
    setCurrentPath([]);
    setStartPoint(null);
  };

  // Handle hover to show owner tooltip
  const handleMouseEnter = (
    event: React.MouseEvent<SVGPathElement>,
    pathOwner: string
  ) => {
    setHoveredOwner(pathOwner);
    setTooltipPos(getMousePos(event));
  };

  const handleMouseLeave = () => {
    setHoveredOwner(null);
    setTooltipPos(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          background: "white",
          border: "0px solid #ccc",
          cursor: "crosshair",
        }}
      >
        {paths.map((d, i) => (
          <g key={i}>
            <path
              d={d.path}
              stroke={d.color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              onMouseEnter={(e) => handleMouseEnter(e, d.owner)} // Show tooltip
              onMouseLeave={handleMouseLeave} // Hide tooltip
            />
            <circle cx={d.start.x} cy={d.start.y} r="4" fill={d.color} />
            <circle cx={d.end.x} cy={d.end.y} r="4" fill={d.color} />
          </g>
        ))}
        {mode === "freehand" && currentPath.length > 0 && (
          <path
            d={
              line()
                .curve(curveBasis)
                .x((d) => d[0])
                .y((d) => d[1])(
                currentPath.map((point) => [point.x, point.y] as [number, number])
              ) || ""
            }
            stroke={strokeColor}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </svg>
      {/* Tooltip for owner name */}
      {hoveredOwner && tooltipPos && (
        <div
          style={{
            position: "absolute",
            left: tooltipPos.x + 10,
            top: tooltipPos.y - 10,
            background: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {hoveredOwner}
        </div>
      )}
    </div>
  );
};

export default DrawCanvas;
