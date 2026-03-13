import SplitScreenPromo from "@/components/features/split-screen-promo";
import GuideForm from "@/components/features/guide-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guia Gratis",
  description:
    "Descarga nuestra guia gratuita sobre postura y salud espinal.",
};

export default function GuiaGratisPage() {
  return (
    <SplitScreenPromo>
      <div className="px-8 sm:px-12 py-12 lg:py-16">
        <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
          Recurso gratuito
        </p>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
          Guia Gratis
        </h2>
        <div className="gold-line mb-5" />

        <p className="text-charcoal/40 text-sm mb-6 leading-relaxed">
          Descarga nuestra guia gratuita sobre como mejorar tu postura y
          cuidar tu columna vertebral desde casa.
        </p>

        <div className="mb-10 p-6 bg-cream border border-charcoal/[0.04]">
          <h3 className="font-display text-base font-semibold text-charcoal mb-4">
            Lo que incluye la guia:
          </h3>
          <ul className="space-y-3 text-sm text-charcoal/50">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
              Ejercicios diarios para mejorar tu postura
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
              Senales de alerta que no debes ignorar
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
              Consejos ergonomicos para tu espacio de trabajo
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
              Cuando buscar ayuda profesional
            </li>
          </ul>
        </div>

        <GuideForm />
      </div>
    </SplitScreenPromo>
  );
}
