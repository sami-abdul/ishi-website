---
name: frontend-design
description: |
  Use when building web UI components, pages, or applications.
  Triggers: building frontend, creating components, designing UI, web application work.
  Creates distinctive, bold designs that avoid AI-slop aesthetics.
---

# Frontend Design

Create distinctive, visually striking UI that stands out from generic AI-generated designs.

## Aesthetic Direction

Choose a bold direction. NEVER default to "clean and modern":

- **Brutalist**: Raw, honest materials. Visible structure. Monospace type. High contrast.
- **Maximalist**: Rich layers, bold color, dense information, ornamental details.
- **Retro-futuristic**: CRT glow, scanlines, neon on dark, terminal aesthetics.
- **Editorial**: Magazine-quality typography, generous whitespace, grid mastery.
- **Organic**: Hand-drawn feels, natural textures, imperfect geometry, warm palettes.
- **Glassmorphism**: Frosted glass, transparency layers, subtle depth.

## Typography Rules

**NEVER use:** Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Poppins.

**DO use distinctive pairings:**
- Display: Space Grotesk, Instrument Serif, Clash Display, Cabinet Grotesk, Satoshi
- Body: General Sans, Switzer, Outfit, Plus Jakarta Sans
- Mono: JetBrains Mono, Berkeley Mono, Geist Mono

Pair a distinctive display font with a refined body font. Size contrast matters: display should be dramatically larger than body.

## Color Rules

**NEVER use:** Purple gradient on white. Blue-to-purple gradients. Default Tailwind palettes unchanged.

**DO:** Create a custom palette. Use unexpected combinations. Consider:
- Dark backgrounds with accent colors
- Monochromatic with one pop color
- Earth tones with digital accents
- High saturation, low lightness

## Spatial Composition

- Break the grid intentionally. Overlap elements. Use negative space as a design element.
- Asymmetric layouts are more interesting than centered-everything.
- Cards don't need borders — use shadow, background, or spacing to separate.
- Full-bleed sections create rhythm. Not everything needs padding.

## Motion & Interaction

- CSS transitions on hover states (transform, opacity, color)
- Scroll-triggered reveals (intersection observer)
- Micro-interactions: button press feedback, input focus effects, loading states
- Subtle parallax or depth effects where appropriate
- Keep animations under 300ms for interactions, up to 600ms for reveals

## Backgrounds & Texture

- Noise overlays (SVG filter or CSS), subtle grain
- Gradient meshes, not linear gradients
- Pattern overlays at low opacity
- Blur layers for depth

## Implementation

- Use CSS custom properties for the design system
- Tailwind is fine but customize the config — don't use defaults
- Mobile-first responsive design
- Accessibility: contrast ratios, focus states, semantic HTML, aria labels
