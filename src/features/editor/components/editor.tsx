"use client";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Footer } from "@/features/editor/components/footer";
import { ActiveTool, selectionDependentTools } from "@/features/editor/types";
import { ShapeSidebar } from "@/features/editor/components/shape-sidebar";
import { FillColorSidebar } from "@/features/editor/components/fill-color-sidebar";
import { StrokeColorSidebar } from "@/features/editor/components/stroke-color-sidebar";
import { StrokeWidthSidebar } from "@/features/editor/components/stroke-width-sidebar";
import { OpacitySidebar } from "@/features/editor/components/opacity-sidebar";
import { TextSidebar } from "@/features/editor/components/text-sidebar";
import { FontSidebar } from "@/features/editor/components/font-sidebar";
import { ImagesSidebar } from "@/features/editor/components/images-sidebar";
import { FilterSidebar } from "@/features/editor/components/filter-sidebar";
import { SettingsSidebar } from "@/features/editor/components/settings-sizebar.tsx";
const Editor = () => {
  //set default active on select feature
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }
      //if need use it
      // if (tool === "draw") {
      //   Enable Draw Mode
      // }
      // if (activeTool === "draw") {
      //   Disable Draw Mode
      // }
      setActiveTool(tool);
    },
    [activeTool] //get back activeTool callback to this global/editor state from child
  );

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      //make the object out of container cannot control
      controlsAboveOverlay: true,
      preserveObjectStacking: true, // if false the selecting element will be front of all elements/objects
    });
    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose(); //set unmount by dispote to make canvas not zoom-in when click on any object in workspace canvas
    };
  }, [init]);
  return (
    <div className="flex flex-col h-full">
      <Navbar
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImagesSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
};

export default Editor;
