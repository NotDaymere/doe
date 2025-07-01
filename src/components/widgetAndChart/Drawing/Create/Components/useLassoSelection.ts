import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export const useLassoSelection = (
  fabricCanvas: fabric.Canvas | null,
  
  isActive: boolean
) => {
  const isDrawing = useRef(false);
  const lassoPath = useRef<fabric.Path | null>(null);
  
  const lassoPoints = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (!fabricCanvas) return;
  
    const canvas = fabricCanvas;

    const handleMouseDown = (opt: fabric.IEvent) => {
      if (!isActive || opt.target) return;

      isDrawing.current = true;
      canvas.selection = false;
      canvas.discardActiveObject();

  
      const pointer = canvas.getPointer(opt.e);
      lassoPoints.current = [pointer];

      lassoPath.current = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
        stroke: "rgba(102, 153, 255, 0.7)",
        strokeWidth: 2,
        fill: "rgba(102, 153, 255, 0.2)",
        selectable: false,
        evented: false,
  
        objectCaching: false,
      });

      canvas.add(lassoPath.current);
      canvas.renderAll();

      // Only now attach move/up listeners
      canvas.on("mouse:move", handleMouseMove);
      canvas.on("mouse:up", handleMouseUp);
  
    };

    const handleMouseMove = (opt: fabric.IEvent) => {
      if (!isDrawing.current || !lassoPath.current) return;

      const pointer = canvas.getPointer(opt.e);
      lassoPoints.current.push(pointer);
      lassoPath.current.path.push(["L", pointer.x, pointer.y]);
      lassoPath.current.setCoords();
  
      canvas.renderAll();
    };

    

    const handleMouseUp = () => {
      if (!isDrawing.current || !lassoPath.current) return;

      isDrawing.current = false;

      const first = lassoPoints.current[0];
  
      lassoPath.current.path.push(["L", first.x, first.y]);
      lassoPath.current.path.push(["z"]);
      lassoPath.current.setCoords();
      canvas.renderAll();

      selectObjectsInsideLasso();

      canvas.remove(lassoPath.current);
      canvas.renderAll();
  
      lassoPath.current = null;

      // Detach move/up now
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    };

    
    const pointInPolygon = (
  point: { x: number; y: number },
  polygon: { x: number; y: number }[]
) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;

   
    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 1e-10) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
};

    
const selectObjectsInsideLasso = () => {
  const selected: fabric.Object[] = [];

  canvas.forEachObject((obj) => {
   
    if (obj === lassoPath.current) return;

    // 1. Check if any lasso point hits the actual shape
    const isHit = lassoPoints.current.some((point) =>
   
      obj.containsPoint(new fabric.Point(point.x, point.y))
    );
    if (isHit) {
      selected.push(obj);
   
      return;
    }

    // 2. Fallback: Check if center of object is inside the polygon
   
    const center = obj.getCenterPoint();
    if (pointInPolygon({ x: center.x, y: center.y }, lassoPoints.current)) {
      selected.push(obj);
    }
  });

  if (selected.length > 0) {
    const selection = new fabric.ActiveSelection(selected, { canvas });
    canvas.setActiveObject(selection);

    selection.setCoords();           // ✅ Add this
    canvas.requestRenderAll(); 
  
  }

  canvas.renderAll();
};
    canvas.on("mouse:down", handleMouseDown);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
  
      canvas.off("mouse:up", handleMouseUp);
  
    };
  }, [fabricCanvas, isActive]);
};