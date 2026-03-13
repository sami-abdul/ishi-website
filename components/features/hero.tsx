import Link from "next/link";

import Button from "@/components/ui/button";
import { HERO } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex">
      {/* Left content panel */}
      <div className="relative w-full lg:w-[55%] teal-gradient flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28 py-32 lg:py-20 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Large decorative rings */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-white/[0.05] rounded-full hidden lg:block" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 border border-gold/[0.08] rounded-full hidden lg:block" />

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-4 mb-12 animate-fade-in-up">
            <div className="w-10 h-px bg-gold" />
            <p className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
              Alinea Health &amp; Posture
            </p>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-[4rem] xl:text-[5rem] font-bold text-white leading-[1.02] mb-8 animate-fade-in-up animation-delay-100">
            {HERO.heading}
          </h1>

          <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-14 max-w-md animate-fade-in-up animation-delay-200">
            {HERO.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up animation-delay-300">
            <Link href={HERO.ctaHref}>
              <Button variant="secondary" size="lg">
                {HERO.ctaLabel}
              </Button>
            </Link>
            <Link href={HERO.secondaryHref}>
              <Button variant="outline" size="lg">
                {HERO.secondaryLabel}
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-gold to-transparent" />
      </div>

      {/* Right accent panel - dramatic composition */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden items-center justify-center">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4b27b] via-[#C8A26B] to-[#a8844f]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />

        {/* Large dramatic circle composition */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] border border-white/[0.07] rounded-full" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[55%]">
          <div className="w-[420px] h-[420px] border border-white/[0.05] rounded-full" />
        </div>

        {/* Central visual - abstract vertebrae column */}
        <div className="relative flex flex-col items-center gap-3 animate-float">
          {[...Array(12)].map((_, i) => {
            const mid = 5.5;
            const dist = Math.abs(i - mid);
            const width = 80 - dist * 6;
            const height = 6 - dist * 0.2;
            const opacity = 0.12 + (1 - dist / mid) * 0.2;
            const rotation = (i - mid) * 1.5;
            return (
              <div
                key={i}
                className="bg-white rounded-sm"
                style={{
                  width: `${Math.max(width, 20)}px`,
                  height: `${Math.max(height, 3)}px`,
                  opacity,
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            );
          })}
        </div>

        {/* Corner accents */}
        <div className="absolute top-20 right-12 text-white/20 text-[11px] tracking-[0.3em] font-semibold uppercase">
          Salud
        </div>
        <div className="absolute bottom-20 left-12 text-white/20 text-[11px] tracking-[0.3em] font-semibold uppercase">
          Postura
        </div>

        {/* Diagonal line */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-12" />
          <div className="absolute bottom-[20%] left-[15%] w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent -rotate-12" />
        </div>

        {/* Teal accent bleed from left panel */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal/30 via-teal/10 to-teal/30" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[27.5%] animate-bounce">
        <div className="w-6 h-10 border-2 border-white/25 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
