"use client";

import { useState } from "react";
import Link from "next/link";

import Logo from "@/components/layout/logo";
import SocialIcons from "@/components/layout/social-icons";
import { NAV_LINKS, NAV_CTA_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            <div className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-semibold tracking-[0.18em] text-charcoal/70 hover:text-teal transition-colors duration-250"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="w-px h-5 bg-charcoal/10" />

            <div className="flex items-center gap-5">
              {NAV_CTA_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-bold tracking-[0.18em] text-teal hover:text-teal-dark transition-colors duration-250"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <SocialIcons />
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal/60 hover:text-charcoal transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-6 py-8 bg-white border-t border-charcoal/5 space-y-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-[0.12em] text-charcoal/50 hover:text-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-charcoal/5 my-4" />

          {NAV_CTA_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold tracking-[0.12em] text-teal hover:text-teal-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3">
            <SocialIcons />
          </div>
        </nav>
      </div>
    </header>
  );
}
