"use client";

import { ArrowUp, ArrowUpRight, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { socialIconMap } from "@/components/brand/social-icons";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { navLinks, socials, site, presupuestoHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Footer() {
  const lenis = useLenis();

  const toTop = () => {
    lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    lenis ? lenis.scrollTo(el as HTMLElement, { offset: -80 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px">
        <div className="hairline" />
      </div>

      <div className="container">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo variant="full" className="h-20 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.slogan}. Limpieza laser industrial de alta precisión, sin agua,
              sin químicos y sin abrasivos.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIconMap[s.key];
                if (s.soon) {
                  return (
                    <span
                      key={s.key}
                      title={`${s.label} · Próximamente`}
                      className="flex size-10 cursor-default items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-foreground/30"
                    >
                      <Icon className="size-[18px]" />
                    </span>
                  );
                }
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} en ${s.label}`}
                    className="group flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-laser-500/40 hover:bg-laser-500/10 hover:text-white hover:shadow-glow-sm"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Navegación
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-laser-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Contacto
            </h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={presupuestoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-laser-200"
                >
                  <MessageCircle className="size-4 text-laser-300/70" />
                  WhatsApp · Solicitar presupuesto
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-laser-200"
                >
                  <Phone className="size-4 text-laser-300/70" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-laser-200"
                >
                  <Mail className="size-4 text-laser-300/70" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 text-laser-300/70" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 sm:flex-row">
          <p className={cn("text-xs text-muted-foreground")}>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <button
            onClick={toTop}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-laser-200"
          >
            Volver arriba
            <span className="flex size-8 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-laser-400/50 group-hover:shadow-glow-sm">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>

        {/* Agency credit — Desarrollado por I.D.E.A Code */}
        <a
          href="https://idea-code.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Desarrollado por I.D.E.A Code — Innovación Digital para Empresas y Agencias"
          className="group flex flex-col items-center gap-2.5 border-t border-white/[0.06] py-7 text-center transition-colors duration-300 hover:bg-white/[0.02]"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
            Desarrollado por
          </span>
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/idea-code-logo-dark.png"
              alt="I.D.E.A Code — Innovación Digital para Empresas y Agencias"
              loading="lazy"
              decoding="async"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-14"
            />
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#6aae7e]" />
          </span>
        </a>
      </div>
    </footer>
  );
}
