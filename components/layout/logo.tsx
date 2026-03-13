import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-charcoal";
  const subtitleColor =
    variant === "light" ? "text-white/60" : "text-charcoal/40";

  return (
    <Link href="/" className={cn("group block", className)}>
      <span
        className={cn(
          "block font-display text-2xl font-bold tracking-[0.2em] uppercase",
          textColor
        )}
      >
        ALINEA
      </span>
      <span
        className={cn(
          "block text-[9px] font-semibold tracking-[0.3em] uppercase mt-0.5",
          subtitleColor
        )}
      >
        Health &amp; Posture
      </span>
    </Link>
  );
}
