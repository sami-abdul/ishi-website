"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/actions";

import type { ActionResult } from "@/lib/actions";

export default function ContactForm() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setResult(null);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "",
      message: formData.get("message") as string,
    };

    const response = await submitContactForm(data);
    setResult(response);
    setPending(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <Input
        id="contact-name"
        name="name"
        label="Nombre"
        placeholder="Tu nombre completo"
        required
        error={result?.errors?.name?.[0]}
      />

      <Input
        id="contact-email"
        name="email"
        type="email"
        label="Email"
        placeholder="tu@email.com"
        required
        error={result?.errors?.email?.[0]}
      />

      <Input
        id="contact-phone"
        name="phone"
        type="tel"
        label="Telefono (opcional)"
        placeholder="(787) 000-0000"
        error={result?.errors?.phone?.[0]}
      />

      <Textarea
        id="contact-message"
        name="message"
        label="Mensaje"
        placeholder="Cuentanos como podemos ayudarte..."
        required
        error={result?.errors?.message?.[0]}
      />

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "ENVIANDO..." : "ENVIAR"}
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
