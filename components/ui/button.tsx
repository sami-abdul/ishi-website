import { cn } from "@/lib/utils";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-dark active:bg-teal-deeper border-2 border-teal hover:border-teal-dark",
  secondary:
    "bg-gold text-charcoal hover:bg-gold-light active:bg-gold-dark border-2 border-gold hover:border-gold-light font-bold",
  outline:
    "bg-transparent text-white border-2 border-white/60 hover:bg-white/10 hover:border-white",
  ghost:
    "bg-transparent text-teal hover:bg-teal/5 border-2 border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-[11px] tracking-[0.18em]",
  md: "px-7 py-3 text-xs tracking-[0.18em]",
  lg: "px-9 py-3.5 text-xs tracking-[0.18em]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold uppercase transition-all duration-250 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "hover:translate-y-[-1px] active:translate-y-0",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
