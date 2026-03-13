// Zod validation schemas for Server Actions

import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede exceder 100 caracteres."),
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido."),
  phone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos.")
    .max(20, "El teléfono no puede exceder 20 caracteres.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(2000, "El mensaje no puede exceder 2000 caracteres."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const appointmentFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede exceder 100 caracteres."),
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido."),
  phone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos.")
    .max(20, "El teléfono no puede exceder 20 caracteres."),
  service: z
    .string()
    .min(1, "Por favor selecciona un servicio."),
  preferredDate: z
    .string()
    .min(1, "Por favor selecciona una fecha."),
  notes: z
    .string()
    .max(1000, "Las notas no pueden exceder 1000 caracteres.")
    .optional()
    .or(z.literal("")),
});

export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export const guideFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede exceder 100 caracteres."),
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido."),
});

export type GuideFormData = z.infer<typeof guideFormSchema>;
