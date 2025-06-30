import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export function useLassoSelection(canvas, isActive: boolean) {
  const lassoPathRef = useRef<fabric.Path | null>(null);
 
  const lassoPointsRef = useRef<{ x: number; y: number }[]>([]);
  const isDrawingRef = useRef(false);

  const isPointInsidePolygon = (point, polygon) => {
   
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
   
      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
  
    }
    return inside;
  };

 
  useEffect(() => {
    if (!canvas || !isActive) return;

    const onMouseDown = (opt) => {
      const pointer = canvas.getPointer(opt.e);
      isDrawingRef.current = true;
      lassoPointsRef.current = [{ x: pointer.x, y: pointer.y }];
      const path = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
        stroke: "black",
 
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        fill: "rgba(0,0,0,0.1)",
        selectable: false,
        evented: false,
        objectCaching: false,
      });
      lassoPathRef.current = path;
      canvas.add(path);
 
    };

    const onMouseMove = (opt) => {
      if (!isDrawingRef.current) return;
      const pointer = canvas.getPointer(opt.e);
      lassoPointsRef.current.push({ x: pointer.x, y: pointer.y });
      const path = lassoPathRef.current;
      if (path) {
        path.path.push(["L", pointer.x, pointer.y]);
 
        path.setCoords();
        canvas.renderAll();
      }
    };

    const onMouseUp = () => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;

  
      const points = lassoPointsRef.current;
      if (lassoPathRef.current && points.length > 1) {
        lassoPathRef.current.path.push(["L", points[0].x, points[0].y], ["z"]);
        lassoPathRef.current.setCoords();
        canvas.renderAll();
      }

      const selected = [];
      canvas.forEachObject((obj) => {
      
        if (obj === lassoPathRef.current) return;
        const bounds = obj.getBoundingRect();
        const corners = [
          { x: bounds.left, y: bounds.top },
          { x: bounds.left + bounds.width, y: bounds.top },
          { x: bounds.left, y: bounds.top + bounds.height },
          { x: bounds.left + bounds.width, y: bounds.top + bounds.height },
        ];
        if (corners.some((pt) => isPointInsidePolygon(pt, points))) {
    
            selected.push(obj);
        }
      });

      if (selected.length) {
        const selection = new fabric.ActiveSelection(selected, { canvas });
        canvas.setActiveObject(selection);
      }

    
      if (lassoPathRef.current) {
        canvas.remove(lassoPathRef.current);
        canvas.renderAll();
      }

      lassoPathRef.current = null;
    };

    canvas.on("mouse:down", onMouseDown);
   
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", onMouseUp);

    return () => {
   
      canvas.off("mouse:down", onMouseDown);
      canvas.off("mouse:move", onMouseMove);
      canvas.off("mouse:up", onMouseUp);
    };

}, [canvas, isActive]);
}
