// Site-wide constants for Alinea Health & Posture
// All user-facing content in Spanish. Code identifiers in English.

export const SITE = {
  name: "Alinea Health & Posture",
  tagline: "Tu quiropráctico está aquí.",
  phone: "1 (787) 731-1575",
  phoneHref: "tel:+17877311575",
  email: "info@alineahealth.com",
  address: "877 Calle Victoria Loft",
  social: {
    facebook: "https://facebook.com/alineahealth",
    instagram: "https://instagram.com/alineahealth",
    youtube: "https://youtube.com/@alineahealth",
  },
} as const;

export const NAV_LINKS = [
  { label: "SERVICIOS", href: "/servicios" },
  { label: "STORE", href: "#store" },
  { label: "TESTIMONIOS", href: "/testimonios" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACTO", href: "/contacto" },
] as const;

export const NAV_CTA_LINKS = [
  { label: "HAZ UNA CITA", href: "/haz-una-cita" },
  { label: "GUÍA GRATIS", href: "/guia-gratis" },
] as const;

export interface ServiceData {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export const SERVICES: readonly ServiceData[] = [
  {
    id: "remodelacion-espinal",
    title: "Remodelación Espinal",
    description:
      "A este tipo de terapia se le conoce como Chiropractic Biophysics (CBP). Es el mejor método para alinear la columna sin cirugía. Tu salud depende de una buena alineación. Hay cientos estudios que documentan que la CBP ayuda a condiciones como: Fibromialgia, Tourette's Syndrome, Reflujo, Dolores de Cabeza, Mareos, entre otros. El secreto de CBP es la ciencia detrás del sistema. Son las leyes inmutables de la física aplicadas a la biología de tu cuerpo.",
  },
  {
    id: "terapia-laser",
    title: "Terapia Láser",
    description:
      "Utiliza energía láser con el objetivo de permitir en células dañadas para reparación celular y aliviar el dolor. Es no invasivo y seguro e incrementa ayuda a la rehabilitación de los tejidos reduciendo la inflamación.",
  },
  {
    id: "estudio-miografico",
    title: "Estudio Miográfico",
    description:
      "Es una tecnología que ayuda a medir los patrones de activación muscular del paciente y contribuye a crear una evaluación diagnóstica y monitoreo del tratamiento. Por eso usamos sEMG. No hay necesidad de adivinar, en nuestra oficina sabemos objetivamente y con seguridad como estás respondiendo. Puedes estar seguro que estás recibiendo lo mejor y estás en las mejores manos.",
  },
  {
    id: "productos-ergonomicos",
    title: "Productos Ergonómicos",
    description:
      "Contamos con una variedad de productos que te ayudan a encontrar el potencial de tu cuerpo, corregir y regenerar.",
  },
  {
    id: "scolibrace-escoliosis",
    title: "ScoliBrace/Escoliosis",
    description:
      "ScoliBrace es un aparato corrector. Funciona al guiar el cuerpo y la columna vertebral hacia una postura opuesta a la forma en que te forma la escoliosis.",
  },
] as const;

export const HERO = {
  heading: "Tu quiropráctico está aquí.",
  subheading:
    "Ofrecemos servicios y productos de salud con la meta de reducir la causa del dolor y tratar tu columna vertebral.",
  ctaLabel: "HAZ UNA CITA",
  ctaHref: "/haz-una-cita",
  secondaryLabel: "VER SERVICIOS",
  secondaryHref: "/servicios",
} as const;

export const SERVICES_SECTION = {
  heading: "Aumenta tus grados de salud",
  ctaLabel: "HAZ UNA CITA",
  ctaHref: "/haz-una-cita",
} as const;

export const PROMO = {
  heading: "Tu quiropráctico está aquí.",
  subheading:
    "Incrementa tus niveles de bienestar recibiendo un 15% de descuento en tu próxima visita, al suscribirte a nuestro boletín.",
  ctaLabel: "OBTENER 15% DESCUENTO",
  ctaHref: "/guia-gratis",
} as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "María González",
    text: "Después de años sufriendo de dolor de espalda, el tratamiento de remodelación espinal cambió mi vida. El equipo es profesional y atento.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rivera",
    text: "La terapia láser me ayudó a recuperarme de una lesión deportiva en semanas. Recomiendo Alinea sin dudarlo.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    text: "El estudio miográfico me dio claridad sobre por qué tenía dolores crónicos. El plan de tratamiento fue preciso y efectivo.",
    rating: 5,
  },
  {
    id: 4,
    name: "Roberto Díaz",
    text: "Mi hija usa ScoliBrace y los resultados han sido increíbles. Su postura mejoró visiblemente en pocos meses.",
    rating: 5,
  },
] as const;

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "importancia-alineacion-espinal",
    title: "La importancia de la alineación espinal",
    excerpt:
      "Tu columna vertebral es el eje central de tu cuerpo. Una mala alineación puede causar problemas que van más allá del dolor de espalda.",
    date: "2024-12-15",
    readTime: "5 min",
  },
  {
    id: 2,
    slug: "terapia-laser-beneficios",
    title: "Beneficios de la terapia láser en la recuperación",
    excerpt:
      "La terapia láser acelera la reparación celular y reduce la inflamación sin procedimientos invasivos.",
    date: "2024-11-28",
    readTime: "4 min",
  },
  {
    id: 3,
    slug: "escoliosis-deteccion-temprana",
    title: "Escoliosis: la detección temprana marca la diferencia",
    excerpt:
      "Detectar la escoliosis a tiempo permite tratamientos más efectivos y menos invasivos para pacientes jóvenes.",
    date: "2024-11-10",
    readTime: "6 min",
  },
] as const;

export const FOOTER_LINKS = [
  { label: "Servicios", href: "/servicios" },
  { label: "Testimonios", href: "/testimonios" },
  { label: "Contacto", href: "/contacto" },
  { label: "Blog", href: "/blog" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
] as const;
