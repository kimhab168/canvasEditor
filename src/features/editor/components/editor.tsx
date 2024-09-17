"use client";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Footer } from "@/features/editor/components/footer";
import { ActiveTool } from "@/features/editor/types";
import { ShapeSidebar } from "@/features/editor/components/shape-sidebar";
const Editor = () => {
  //set default active on select feature
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }
      if (tool === "draw") {
        //TODO: Enable Draw Mode
      }
      if (activeTool === "draw") {
        //TODO: Disable Draw Mode
      }
      setActiveTool(tool);
    },
    [activeTool]
  );
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

    return () => {
      canvas.dispose(); //set unmount by dispote to make canvas not zoom-in when click on any object in workspace canvas
    };
  }, [init]);
  return (
    <div className="flex flex-col h-full">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;
