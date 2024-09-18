import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (object: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const UseCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        // console.log("selection created");

        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:updated", (e) => {
        // console.log("selection updated");
        setSelectedObjects(e.selected || []);
      });
      //clear selected
      canvas.on("selection:cleared", () => {
        // console.log("selection cleared");
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }
    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, clearSelectionCallback]);
};
