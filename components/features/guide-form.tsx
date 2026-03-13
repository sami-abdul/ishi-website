"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { submitGuideRequest } from "@/lib/actions";

import type { ActionResult } from "@/lib/actions";

export default function GuideForm() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setResult(null);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    const response = await submitGuideRequest(data);
    setResult(response);
    setPending(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <Input
        id="guide-name"
        name="name"
        label="Nombre"
        placeholder="Tu nombre"
        required
        error={result?.errors?.name?.[0]}
      />

      <Input
        id="guide-email"
        name="email"
        type="email"
        label="Email"
        placeholder="tu@email.com"
        required
        error={result?.errors?.email?.[0]}
      />

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "ENVIANDO..." : "DESCARGAR GUIA GRATIS"}
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
