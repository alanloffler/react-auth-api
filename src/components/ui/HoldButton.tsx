import { type MouseEvent, type PointerEvent, useRef } from "react";
import { cn } from "@lib/utils";

interface IProps {
  callback: () => void;
  className?: string;
  duration?: number;
  text?: string;
  shortcut?: boolean;
}

export function HoldButton({
  callback,
  className,
  duration = 1000,
  shortcut = false,
  text = "Hold to Delete",
}: IProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;

    timeoutRef.current = setTimeout(() => {
      callback();
    }, duration);
  };

  const handlePointerUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    handlePointerUp();

    if (shortcut) {
      callback();
    }
  };

  return (
    <button
      className={cn(
        "group relative flex items-center justify-center gap-2 overflow-hidden rounded-md bg-[#f6f5f5] px-6 py-3 text-sm font-medium text-[#21201c] transition-transform duration-160 ease-out select-none [-webkit-touch-callout:none] active:scale-[0.97]",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={handleContextMenu}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center gap-2 rounded-md bg-[#ffdbdc] text-[#e5484d] transition-[clip-path] duration-160 ease-out [clip-path:inset(0px_100%_0px_0px)] group-active:ease-linear group-active:[clip-path:inset(0px_0px_0px_0px)]"
        style={{
          transitionDuration: duration + "ms",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        <>{text}</>
      </div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
      <>{text}</>
    </button>
  );
}
