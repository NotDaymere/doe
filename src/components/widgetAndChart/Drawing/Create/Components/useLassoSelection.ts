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
  if (!fabricCanvas) {
   
    console.log("[LASSO] ❌ No canvas available.");
    return;
  }

  
  console.log("[LASSO] ✅ Lasso effect initialized. Active:", isActive);

  const canvas = fabricCanvas;

  
  const handleMouseDown = (opt: fabric.any) => {
    console.log("[LASSO] Mouse down");
    if (!isActive) {
      console.log("[LASSO] 🔒 Lasso inactive.");
      return;
    }
    if (opt.target) {
      console.log("[LASSO] ⛔ Clicked on object, skipping lasso.");
      return;
  
    }

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

  
    console.log("[LASSO] ➕ Started new path at:", pointer);

    canvas.add(lassoPath.current);
    canvas.renderAll();

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

    console.log("[LASSO] 🔄 Closing path and selecting objects");

    selectObjectsInsideLasso();

    canvas.remove(lassoPath.current);
    lassoPath.current = null;
    canvas.renderAll();

    canvas.off("mouse:move", handleMouseMove);
    canvas.off("mouse:up", handleMouseUp);
  };

  const pointInPolygon = (point, polygon) => {
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
    const selected:any = [];
    canvas.forEachObject((obj) => {
      if (obj === lassoPath.current) return;

      const isHit = lassoPoints.current.some((point) =>
        obj.containsPoint(new fabric.Point(point.x, point.y))
      );
      if (isHit) {
  
        selected.push(obj);
        return;
      }

      const center = obj.getCenterPoint();
      if (pointInPolygon(center, lassoPoints.current)) {
        selected.push(obj);
      }
    });

    console.log("[LASSO] 🎯 Selected objects:", selected.length);

    if (selected.length > 0) {
  selected.forEach((obj:any) => {
    obj.selectable = true;
    obj.evented = true;
  });

  const selection = new fabric.ActiveSelection(selected, { canvas });
  
  canvas.setActiveObject(selection);
  selection.setCoords();
  canvas.upperCanvasEl.focus(); 
  canvas.requestRenderAll();
}
  };

  

  
  if (isActive) {
    canvas.on("mouse:down", handleMouseDown);
    console.log("[LASSO] 🖱️ mouse:down listener attached");
  }

  return () => {
    console.log("[LASSO] 🔁 Cleanup");
    canvas.off("mouse:down", handleMouseDown);
    canvas.off("mouse:move", handleMouseMove);
  
    canvas.off("mouse:up", handleMouseUp);
  };
}, [fabricCanvas, isActive]);
};