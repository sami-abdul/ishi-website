import { cn } from "@/lib/utils";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-charcoal/70 tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-0 py-3 bg-transparent border-0 border-b-2 border-charcoal/15 text-charcoal",
          "placeholder:text-charcoal/30 transition-all duration-250",
          "focus:outline-none focus:border-teal",
          error && "border-red-400 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
