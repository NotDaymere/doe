import React, { useRef, useState } from "react";
import { line, curveBasis } from "d3-shape";

const DrawCanvas = ({
  width = 600,
  height = 300,
  mode = "straight",
  strokeColor = "black",
}) => {
  const [paths, setPaths] = useState<
    {
      path: string;
      start: { x: number; y: number };
      end: { x: number; y: number };
      color: string;
    }[]
  >([]);

  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    []
  );
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
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
        setPaths([
          ...paths,
          {
            path: pathData,
            start: currentPath[0],
            end: currentPath[currentPath.length - 1],
            color: strokeColor,
          },
        ]);
      }
    } else if (mode === "straight" && startPoint) {
      const endPoint = getMousePos(event);
      const pathData = `M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`;
      setPaths([
        ...paths,
        {
          path: pathData,
          start: startPoint,
          end: endPoint,
          color: strokeColor,
        },
      ]);
    }
    setCurrentPath([]);
    setStartPoint(null);
  };

  return (
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
  );
};

export default DrawCanvas;
