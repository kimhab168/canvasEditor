"use client";
import React from "react";
import { SidebarItem } from "@/features/editor/components/sidebar-item";
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplate}
          label="Design"
          isActive={false}
          onClick={() => {}}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Image"
          isActive={false}
          onClick={() => {}}
        />
        <SidebarItem
          icon={Type}
          label="Text"
          isActive={false}
          onClick={() => {}}
        />
        <SidebarItem
          icon={Shapes}
          label="Shapes"
          isActive={false}
          onClick={() => {}}
        />
        <SidebarItem
          icon={Sparkles}
          label="AI"
          isActive={false}
          onClick={() => {}}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={false}
          onClick={() => {}}
        />
      </ul>
    </aside>
  );
}
