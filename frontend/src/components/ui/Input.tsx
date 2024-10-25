import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-gray-700 text-sm font-bold mb-1 capitalize">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary-500 placeholder:text-sm",
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
