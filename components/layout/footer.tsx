import Link from "next/link";

import SocialIcons from "@/components/layout/social-icons";
import { SITE, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal relative overflow-hidden">
      {/* Gold accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Contact info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/30 tracking-wider">
            <span>{SITE.phone}</span>
            <span className="w-1 h-1 rounded-full bg-gold/30" />
            <span>{SITE.email}</span>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] text-white/25 hover:text-gold tracking-[0.15em] uppercase transition-colors duration-250"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[11px] text-white/20 tracking-wider">
            {new Date().getFullYear()} {SITE.name}. Todos los derechos
            reservados.
          </p>
          <SocialIcons variant="light" />
        </div>
      </div>

      {/* Background decorative circle */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 border border-white/[0.02] rounded-full" />
    </footer>
  );
}
