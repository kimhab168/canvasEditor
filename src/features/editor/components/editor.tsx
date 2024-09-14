"use client";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";
// import { Navbar } from "./navbar";
const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      //make the object out of container cannot control
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;
