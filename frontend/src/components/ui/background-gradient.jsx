import React from "react";
import { cn } from "../../utils/cn";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-[20px] z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500",
          animate && "animate-pulse",
          "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-blue-500 to-pink-500"
        )}
      />
      <div
        className={cn(
          "relative z-[2] bg-zinc-900 rounded-[20px]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
