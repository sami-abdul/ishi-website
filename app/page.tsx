import Link from "next/link";

import Hero from "@/components/features/hero";
import ServiceGrid from "@/components/features/service-grid";
import Button from "@/components/ui/button";
import { TESTIMONIALS, PROMO, SITE } from "@/lib/constants";

function TestimonialsPreview() {
  return (
    <section className="py-28 lg:py-40 px-6 lg:px-12 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">
          {/* Left column - heading */}
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-teal/30" />
              <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase">
                Testimonios
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal leading-tight mb-6">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-charcoal/40 text-sm leading-relaxed mb-8">
              Cada testimonio refleja nuestro compromiso con tu bienestar y
              recuperación.
            </p>
            <Link href="/testimonios">
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            </Link>
          </div>

          {/* Right column - testimonials */}
          <div className="space-y-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <article
                key={t.id}
                className="group p-8 bg-cream border-l-2 border-transparent hover:border-gold transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-charcoal/55 text-sm leading-[1.85] mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-[11px] font-bold tracking-[0.15em] text-charcoal/80 uppercase">
                  {t.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoStrip() {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left - teal CTA */}
        <div className="w-full lg:w-[60%] teal-gradient px-8 sm:px-12 lg:px-20 py-20 lg:py-28 relative">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-gold/50" />
              <p className="text-gold text-[11px] font-bold tracking-[0.4em] uppercase">
                Oferta Especial
              </p>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              {PROMO.subheading}
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              <Link href={PROMO.ctaHref}>
                <Button variant="secondary" size="lg">
                  {PROMO.ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right - contact info panel */}
        <div className="w-full lg:w-[40%] bg-charcoal px-8 sm:px-12 lg:px-16 py-20 lg:py-28 flex items-center">
          <div>
            <p className="text-white/30 text-[11px] font-bold tracking-[0.4em] uppercase mb-6">
              Contáctanos
            </p>
            <a
              href={SITE.phoneHref}
              className="block font-display text-2xl lg:text-3xl font-bold text-white mb-4 hover:text-gold transition-colors duration-300"
            >
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-white/40 text-sm hover:text-gold transition-colors duration-300 mb-2"
            >
              {SITE.email}
            </a>
            <p className="text-white/25 text-sm">
              {SITE.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <TestimonialsPreview />
      <PromoStrip />
    </>
  );
}
