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
        width: 900,
        height: 1200,
        fill: "white",
        name: "clip",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({ color: "rgba(0,0,0,0.8)", blur: 5 }),
      });
      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "black",
      });
      initialCanvas.add(test);
      initialCanvas.centerObject(test);
    },
    []
  );

  return { init };
};
