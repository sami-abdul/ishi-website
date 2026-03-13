"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { submitAppointment } from "@/lib/actions";
import { SERVICES } from "@/lib/constants";

import type { ActionResult } from "@/lib/actions";

export default function AppointmentForm() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setResult(null);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      preferredDate: formData.get("preferredDate") as string,
      notes: (formData.get("notes") as string) || "",
    };

    const response = await submitAppointment(data);
    setResult(response);
    setPending(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <Input
        id="appt-name"
        name="name"
        label="Nombre"
        placeholder="Tu nombre completo"
        required
        error={result?.errors?.name?.[0]}
      />

      <Input
        id="appt-email"
        name="email"
        type="email"
        label="Email"
        placeholder="tu@email.com"
        required
        error={result?.errors?.email?.[0]}
      />

      <Input
        id="appt-phone"
        name="phone"
        type="tel"
        label="Telefono"
        placeholder="(787) 000-0000"
        required
        error={result?.errors?.phone?.[0]}
      />

      {/* Service select */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="appt-service"
          className="text-sm font-medium text-charcoal/70 tracking-wide"
        >
          Servicio
        </label>
        <select
          id="appt-service"
          name="service"
          required
          className={`w-full px-0 py-3 bg-transparent border-0 border-b-2 border-charcoal/15 text-charcoal transition-all duration-250 focus:outline-none focus:border-teal ${
            result?.errors?.service ? "border-red-400" : ""
          }`}
        >
          <option value="">Selecciona un servicio</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
        {result?.errors?.service?.[0] && (
          <p className="text-xs text-red-500">{result.errors.service[0]}</p>
        )}
      </div>

      <Input
        id="appt-date"
        name="preferredDate"
        type="date"
        label="Fecha preferida"
        required
        error={result?.errors?.preferredDate?.[0]}
      />

      <Textarea
        id="appt-notes"
        name="notes"
        label="Notas adicionales (opcional)"
        placeholder="Algo que debamos saber antes de tu cita..."
        error={result?.errors?.notes?.[0]}
      />

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "ENVIANDO..." : "SOLICITAR CITA"}
      </Button>

      {result && (
        <p
          className={`text-sm mt-3 ${
            result.success ? "text-teal" : "text-red-500"
          }`}
        >
          {result.message}
        </p>
      )}
    </form>
  );
}
