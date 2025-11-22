"use client";

import { useState, useRef, useEffect } from "react";
import type { OpenWindow } from "./desktop";

interface WindowProps {
  window: OpenWindow;
  onClose: () => void;
  onMinimize: () => void;
  onBringToFront: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export function Window({
  window: wnd,
  onClose,
  onMinimize,
  onBringToFront,
  onPositionChange,
  onSizeChange,
  children,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  if (wnd.isMinimized) {
    return null;
  }

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-no-drag]")) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - wnd.position.x,
      y: e.clientY - wnd.position.y,
    });
    onBringToFront();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onPositionChange({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }

    if (isResizing && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = Math.max(300, e.clientX - rect.left);
      const newHeight = Math.max(200, e.clientY - rect.top);
      onSizeChange({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, wnd.position]);

  return (
    <div
      ref={windowRef}
      style={{
        position: "absolute",
        left: `${wnd.position.x}px`,
        top: `${wnd.position.y}px`,
        width: `${wnd.size.width}px`,
        height: `${wnd.size.height}px`,
        zIndex: wnd.zIndex,
      }}
      className="glass-morphism window-shadow rounded-lg flex flex-col overflow-hidden"
      onMouseDown={onBringToFront}
    >
      {/* Window header */}
      <div
        onMouseDown={handleDragStart}
        className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 flex items-center justify-between cursor-move select-none"
      >
        <span className="text-sm font-semibold">{wnd.title}</span>
        <div className="flex gap-2" data-no-drag>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="hover:bg-white/20 px-3 py-1 rounded text-sm transition-colors"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="hover:bg-red-500/20 px-3 py-1 rounded text-sm transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="flex-1 overflow-auto bg-window-bg dark:bg-slate-900 p-4">
        {children}
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={() => setIsResizing(true)}
        className="absolute bottom-0 right-0 w-4 h-4 bg-primary/20 cursor-nwse-resize rounded-tl"
      />
    </div>
  );
}
