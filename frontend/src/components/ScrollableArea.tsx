import { cn } from "../lib/utils";

interface ScrollableAreaProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ScrollableArea: React.FC<ScrollableAreaProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("overflow-y-auto w-full p-2", className)}>
      {children}
    </div>
  );
};
