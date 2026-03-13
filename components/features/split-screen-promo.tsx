import Link from "next/link";

import Logo from "@/components/layout/logo";
import SocialIcons from "@/components/layout/social-icons";
import Button from "@/components/ui/button";
import { PROMO, SITE } from "@/lib/constants";

interface SplitScreenPromoProps {
  children?: React.ReactNode;
}

export default function SplitScreenPromo({ children }: SplitScreenPromoProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-20">
      {/* Left teal panel */}
      <div className="w-full lg:w-[42%] xl:w-[40%] teal-gradient flex flex-col justify-between px-8 sm:px-12 lg:px-14 xl:px-16 py-12 lg:py-16 min-h-[50vh] lg:min-h-screen relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative circle */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 border border-white/[0.04] rounded-full hidden lg:block" />

        <Logo variant="light" className="relative z-10" />

        <div className="my-auto py-12 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/50" />
            <p className="text-gold text-[10px] font-bold tracking-[0.35em] uppercase">
              Alinea
            </p>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.08] mb-6">
            {PROMO.heading}
          </h1>

          <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-sm">
            {PROMO.subheading}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href={PROMO.ctaHref}>
              <Button variant="outline" size="md">
                {PROMO.ctaLabel}
              </Button>
            </Link>
            <a
              href={SITE.phoneHref}
              className="text-white/40 text-sm tracking-wider hover:text-white transition-colors duration-250"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        <SocialIcons variant="light" className="relative z-10" />
      </div>

      {/* Right content panel */}
      <div className="w-full lg:w-[58%] xl:w-[60%] bg-white relative flex flex-col">
        {children ? (
          <div className="flex-1 overflow-y-auto">{children}</div>
        ) : (
          <div className="flex-1 relative overflow-hidden">
            {/* Rich gold panel with visual interest */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4b27b] via-[#C8A26B] to-[#a8844f]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5" />

            {/* Geometric composition */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[350px] h-[350px] border border-white/[0.06] rounded-full" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%]">
              <div className="w-[220px] h-[220px] border border-white/[0.04] rounded-full" />
            </div>

            {/* Central accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="w-16 h-px bg-white/15 mx-auto mb-4" />
              <p className="text-white/20 text-[11px] tracking-[0.4em] font-semibold uppercase">
                Health &amp; Posture
              </p>
              <div className="w-16 h-px bg-white/15 mx-auto mt-4" />
            </div>

            {/* Teal bleed from left */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal/20 via-teal/5 to-teal/20" />
          </div>
        )}
      </div>
    </div>
  );
}
