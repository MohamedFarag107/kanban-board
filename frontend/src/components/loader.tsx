import { LoaderCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface LoaderProps {
  fullScreen?: boolean;
  size?: number | string;
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen, size }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen ? "w-screen h-screen" : "w-full h-full"
      )}
    >
      <LoaderCircle className="animate-spin" size={size} />
    </div>
  );
};
