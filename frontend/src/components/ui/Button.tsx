import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ComponentProps<"button"> {
  error?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <button
      className={cn(
        "appearance-none leading-tight focus:outline-none rounded-md w-full py-2 px-3",
        " bg-primary-500 text-white",
        error && "border-red-500 bg-red-500 text-white",
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
