import Link from "next/link";

import Button from "@/components/ui/button";
import { SERVICES, SERVICES_SECTION } from "@/lib/constants";

export default function ServiceGrid() {
  return (
    <section className="py-28 lg:py-40 px-6 lg:px-12 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-28">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-teal/30" />
            <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase">
              Nuestros Servicios
            </p>
            <div className="w-8 h-px bg-teal/30" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-charcoal leading-tight">
            {SERVICES_SECTION.heading}
          </h2>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-16 lg:gap-y-20">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className={`group relative pl-6 border-l-2 border-charcoal/[0.06] hover:border-teal/40 transition-all duration-500 ${index === SERVICES.length - 1 ? "md:col-span-2 md:max-w-lg md:mx-auto md:pl-6" : ""}`}
            >
              <span className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3 block">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-xl lg:text-2xl font-bold text-charcoal mb-4 group-hover:text-teal transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-charcoal/50 text-sm leading-[1.85]">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-28 flex justify-center">
          <Link href={SERVICES_SECTION.ctaHref}>
            <Button variant="primary" size="lg">
              {SERVICES_SECTION.ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
