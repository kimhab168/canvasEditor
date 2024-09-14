import { useEffect } from "react";
import { fabric } from "fabric";
interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}
//responsive Canvas with useAutoResize Custome Hook
export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        console.log("resizing");
      });

      resizeObserver.observe(container);
    }
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container]);
};
