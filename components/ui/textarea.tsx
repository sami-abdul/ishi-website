import { cn } from "@/lib/utils";

import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
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
      <textarea
        id={id}
        className={cn(
          "w-full px-0 py-3 bg-transparent border-0 border-b-2 border-charcoal/15 text-charcoal resize-y min-h-[100px]",
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
