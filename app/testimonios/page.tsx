import SplitScreenPromo from "@/components/features/split-screen-promo";
import { TESTIMONIALS } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Lee lo que nuestros pacientes dicen sobre su experiencia en Alinea Health & Posture.",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-gold" : "text-charcoal/10"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimoniosPage() {
  return (
    <SplitScreenPromo>
      <div className="px-8 sm:px-12 py-12 lg:py-16">
        <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
          Experiencias reales
        </p>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
          Testimonios
        </h2>
        <div className="gold-line mb-10" />

        <div className="space-y-6">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="group p-7 bg-cream border border-charcoal/[0.04] hover:border-teal/15 transition-all duration-300"
            >
              <StarRating rating={t.rating} />
              <p className="text-charcoal/55 leading-[1.8] mt-4 mb-5 text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-[11px] font-bold tracking-[0.15em] text-charcoal/70 uppercase">
                {t.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SplitScreenPromo>
  );
}
