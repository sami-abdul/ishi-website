import SplitScreenPromo from "@/components/features/split-screen-promo";
import { SITE } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terminos de servicio de Alinea Health & Posture.",
};

export default function TermsPage() {
  return (
    <SplitScreenPromo>
      <div className="px-8 sm:px-12 py-12 lg:py-16">
        <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
          Legal
        </p>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
          Terms of Service
        </h2>
        <div className="gold-line mb-10" />

        <div className="space-y-8 text-charcoal/55 text-sm leading-[1.8]">
          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              1. Aceptacion de Terminos
            </h3>
            <p>
              Al acceder y utilizar el sitio web de {SITE.name}, usted acepta
              estos terminos de servicio. Si no esta de acuerdo, por favor no
              utilice nuestro sitio.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              2. Servicios
            </h3>
            <p>
              {SITE.name} ofrece servicios quiropracticos profesionales
              incluyendo remodelacion espinal, terapia laser, estudio
              miografico, productos ergonomicos y tratamiento de escoliosis
              con ScoliBrace.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              3. Citas
            </h3>
            <p>
              Las solicitudes de cita realizadas a traves de nuestro sitio web
              estan sujetas a disponibilidad. Nos comunicaremos con usted para
              confirmar fecha y hora.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              4. Informacion Medica
            </h3>
            <p>
              La informacion proporcionada en este sitio web es solo para fines
              educativos y no sustituye el consejo medico profesional. Siempre
              consulte con un profesional de la salud antes de iniciar cualquier
              tratamiento.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              5. Contacto
            </h3>
            <p>
              Para preguntas sobre estos terminos, contactenos en{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-teal hover:underline"
              >
                {SITE.email}
              </a>{" "}
              o al {SITE.phone}.
            </p>
          </section>
        </div>
      </div>
    </SplitScreenPromo>
  );
}
