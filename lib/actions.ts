"use server";

import logger from "@/lib/logger";
import {
  contactFormSchema,
  appointmentFormSchema,
  guideFormSchema,
} from "@/lib/validators";

import type { ContactFormData, AppointmentFormData, GuideFormData } from "@/lib/validators";

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    logger.warn("Contact form validation failed", { errors: fieldErrors });
    return {
      success: false,
      message: "Por favor corrige los errores en el formulario.",
      errors: fieldErrors as Record<string, string[]>,
    };
  }

  logger.info("Contact form submitted", {
    name: parsed.data.name,
    email: parsed.data.email,
  });

  // In production, this would send an email or save to a database
  return {
    success: true,
    message: "Mensaje enviado con éxito. Nos comunicaremos contigo pronto.",
  };
}

export async function submitAppointment(
  data: AppointmentFormData
): Promise<ActionResult> {
  const parsed = appointmentFormSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    logger.warn("Appointment form validation failed", { errors: fieldErrors });
    return {
      success: false,
      message: "Por favor corrige los errores en el formulario.",
      errors: fieldErrors as Record<string, string[]>,
    };
  }

  logger.info("Appointment requested", {
    name: parsed.data.name,
    service: parsed.data.service,
    date: parsed.data.preferredDate,
  });

  return {
    success: true,
    message: "Cita solicitada con éxito. Te contactaremos para confirmar.",
  };
}

export async function submitGuideRequest(
  data: GuideFormData
): Promise<ActionResult> {
  const parsed = guideFormSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    logger.warn("Guide form validation failed", { errors: fieldErrors });
    return {
      success: false,
      message: "Por favor corrige los errores en el formulario.",
      errors: fieldErrors as Record<string, string[]>,
    };
  }

  logger.info("Free guide requested", {
    name: parsed.data.name,
    email: parsed.data.email,
  });

  return {
    success: true,
    message: "Guía enviada a tu correo electrónico.",
  };
}
