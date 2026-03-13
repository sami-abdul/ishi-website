import SplitScreenPromo from "@/components/features/split-screen-promo";
import ContactForm from "@/components/features/contact-form";
import { SITE } from "@/lib/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Politica de privacidad de Alinea Health & Posture.",
};

export default function PrivacyPolicyPage() {
  return (
    <SplitScreenPromo>
      <div className="px-8 sm:px-12 py-12 lg:py-16">
        <p className="text-teal text-[11px] font-bold tracking-[0.4em] uppercase mb-3">
          Legal
        </p>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
          Privacy Policy
        </h2>
        <div className="gold-line mb-10" />

        <div className="space-y-8 text-charcoal/55 text-sm leading-[1.8]">
          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              1. Introduccion
            </h3>
            <p>
              {SITE.name} esta comprometido a proteger su privacidad. Esta
              politica describe como recopilamos, usamos y protegemos su
              informacion a traves de nuestro sitio web y redes sociales.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              2. Informacion que Recopilamos
            </h3>
            <p className="mb-3">
              <strong className="text-charcoal/70">2.1 Informacion Personal:</strong> nombre, direccion,
              correo electronico, numero de telefono e historial medico
              cuando sea necesario para servicios quiropracticos.
            </p>
            <p className="mb-3">
              <strong className="text-charcoal/70">2.2 Datos de Uso:</strong> informacion obtenida de
              interacciones con nuestras redes sociales, incluyendo
              comentarios y mensajes.
            </p>
            <p>
              <strong className="text-charcoal/70">2.3 Datos del Sitio:</strong> cookies, direcciones IP,
              tipo de navegador y paginas visitadas.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              3. Como Usamos su Informacion
            </h3>
            <p>
              Para programar y gestionar citas quiropracticas, comunicarnos
              sobre tratamientos, mejorar nuestros servicios y cumplir con
              requisitos legales.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              4. Compartir Informacion
            </h3>
            <p>
              No vendemos ni compartimos su informacion personal con terceros
              para fines de marketing. Podemos compartir informacion con
              proveedores de servicios que nos ayudan en procesamiento de
              pagos y programacion de citas.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              5. Seguridad de Datos
            </h3>
            <p>
              Implementamos medidas de seguridad apropiadas para proteger su
              informacion, incluyendo encriptacion, servidores seguros y
              medidas de control de acceso.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              6. Sus Derechos
            </h3>
            <p>
              Usted tiene derecho a acceder, actualizar y solicitar la
              eliminacion de su informacion personal. Para ejercer estos
              derechos, contactenos.
            </p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold text-charcoal mb-3">
              7. Contacto
            </h3>
            <p className="mb-1">Email: {SITE.email}</p>
            <p className="mb-1">Telefono: {SITE.phone}</p>
            <p>Direccion: {SITE.address}</p>
          </section>
        </div>

        {/* Contact form at bottom */}
        <div className="mt-14 pt-10 border-t border-charcoal/[0.06]">
          <h3 className="font-display text-lg font-semibold text-charcoal mb-2">
            Preguntas sobre privacidad
          </h3>
          <p className="text-sm text-charcoal/40 mb-8 leading-relaxed">
            Complete el formulario para contactarnos sobre nuestros servicios
            o preguntas sobre esta politica.
          </p>
          <ContactForm />
        </div>
      </div>
    </SplitScreenPromo>
  );
}
