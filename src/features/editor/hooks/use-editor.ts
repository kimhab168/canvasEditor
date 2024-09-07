import { useCallback } from "react";
import { fabric } from "fabric";
export const useEditor = () => {
  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      const initialWorkspace = new fabric.Rect({
        width: 500,
        height: 800,
        name: "clip",
        fill: "red",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({ color: "rgba(0,0,0,0.8)", blur: 5 }),
      });
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
    },
    []
  );

  return { init };
};
