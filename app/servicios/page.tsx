import Link from "next/link";

import Button from "@/components/ui/button";
import { SERVICES, SERVICES_SECTION } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conoce nuestros servicios quiroprácticos: remodelación espinal, terapia láser, estudio miográfico, productos ergonómicos y ScoliBrace.",
};

export default function ServiciosPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <section className="teal-gradient py-20 lg:py-28 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 border border-white/[0.04] rounded-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-gold text-[11px] font-bold tracking-[0.4em] uppercase mb-5">
            Nuestros Servicios
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            {SERVICES_SECTION.heading}
          </h1>
          <div className="gold-line mx-auto" />
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-cream">
        <div className="max-w-4xl mx-auto space-y-24">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className="group grid md:grid-cols-[100px_1fr] gap-6 md:gap-12"
            >
              {/* Number */}
              <div className="flex md:justify-end">
                <span className="font-display text-5xl font-bold text-teal/15 group-hover:text-teal/30 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div>
                <div className="w-0 group-hover:w-12 h-0.5 bg-gold transition-all duration-500 ease-out mb-5" />
                <h2 className="font-display text-2xl font-bold text-charcoal mb-4 group-hover:text-teal transition-colors duration-300">
                  {service.title}
                </h2>
                <p className="text-charcoal/50 leading-[1.8] max-w-xl">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <p className="text-charcoal/30 text-sm mb-6">
            Mas informacion sobre nuestros servicios disponible en consulta.
          </p>
          <Link href="/haz-una-cita">
            <Button variant="primary" size="lg">
              HAZ UNA CITA
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
