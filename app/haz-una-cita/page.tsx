import SplitScreenPromo from "@/components/features/split-screen-promo";
import AppointmentForm from "@/components/features/appointment-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haz una Cita",
  description:
    "Solicita una cita con nuestro equipo quiropractico. Estamos listos para ayudarte.",
};

export default function HazUnaCitaPage() {
  return (
    <SplitScreenPromo>
      <div className="px-8 sm:px-12 py-12 lg:py-16">
        <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
          Reserva tu espacio
        </p>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
          Haz una Cita
        </h2>
        <div className="gold-line mb-5" />

        <p className="text-charcoal/40 text-sm mb-10 leading-relaxed">
          Completa el formulario y nos comunicaremos contigo para confirmar tu
          cita. Nuestro equipo esta listo para atenderte.
        </p>

        <AppointmentForm />
      </div>
    </SplitScreenPromo>
  );
}
