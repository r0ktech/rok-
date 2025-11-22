"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

type Direction = "top" | "bottom" | "left" | "right";

type DrawerContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  direction: Direction;
};

const DrawerContext = React.createContext<DrawerContextType | null>(null);

function useDrawer() {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within a Drawer");
  return ctx;
}

function Drawer({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  direction = "right",
  ...props
}: {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: Direction;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [openState, setOpenState] = React.useState<boolean>(defaultOpen);
  const isControlled = typeof openProp === "boolean";
  const open = isControlled ? !!openProp : openState;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setOpenState(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DrawerContext.Provider value={{ open, setOpen, direction }}>
      <div data-slot="drawer" {...props}>
        {children}
      </div>
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDrawer();
  return (
    <button
      data-slot="drawer-trigger"
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(true);
      }}
    >
      {children}
    </button>
  );
}

function DrawerPortal({ children }: { children?: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const elRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
    const el = document.createElement("div");
    document.body.appendChild(el);
    elRef.current = el;
    return () => {
      if (elRef.current) document.body.removeChild(elRef.current);
    };
  }, []);

  if (!mounted || !elRef.current) return null;
  return createPortal(
    <div data-slot="drawer-portal">{children}</div>,
    elRef.current
  );
}

function DrawerClose({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDrawer();
  return (
    <button
      data-slot="drawer-close"
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

function DrawerOverlay({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useDrawer();
  if (!open) return null;
  return (
    <div
      data-slot="drawer-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  const { open, direction } = useDrawer();
  if (!open) return null;

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <div
        data-slot="drawer-content"
        data-vaul-drawer-direction={direction}
        className={cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </div>
    </DrawerPortal>
  );
}

function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
