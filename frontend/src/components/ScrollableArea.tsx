import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cn } from "../lib/utils";

interface ScrollableAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollableArea = forwardRef<HTMLDivElement, ScrollableAreaProps>(
  ({ children, className, ...props }, ref) => {
    const ourRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
    });

    useImperativeHandle(ref, () => ourRef.current!);

    const handleDragStart = (e: React.MouseEvent) => {
      if (!ourRef.current) return;
      const slider = ourRef.current;
      const startX = e.pageX - slider.offsetLeft;
      const startY = e.pageY - slider.offsetTop;
      const scrollLeft = slider.scrollLeft;
      const scrollTop = slider.scrollTop;
      mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
      setIsMouseDown(true);
      document.body.style.cursor = "grabbing";
    };

    const handleDragEnd = () => {
      setIsMouseDown(false);
      document.body.style.cursor = "default";
    };

    const handleDrag = (e: React.MouseEvent) => {
      if (!isMouseDown || !ourRef.current) return;
      e.preventDefault();
      const slider = ourRef.current;
      const x = e.pageX - slider.offsetLeft;
      const y = e.pageY - slider.offsetTop;
      const walkX = (x - mouseCoords.current.startX) * 1.5;
      const walkY = (y - mouseCoords.current.startY) * 1.5;
      slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
      slider.scrollTop = mouseCoords.current.scrollTop - walkY;
    };

    return (
      <div
        ref={ourRef}
        className={cn("overflow-y-auto w-full p-2", className)}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollableArea.displayName = "ScrollableArea";
