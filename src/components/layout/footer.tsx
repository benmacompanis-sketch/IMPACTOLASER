"use client";

import { ArrowUp, MessageCircle, Mail } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { navLinks, site, presupuestoHref } from "@/lib/site";

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
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="full" className="h-16 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.slogan}. Limpieza láser industrial de alta precisión, sin agua,
              sin químicos y sin abrasivos.
            </p>
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
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-laser-200"
                >
                  <MessageCircle className="size-4 text-laser-300/70" />
                  WhatsApp · Presupuesto
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-laser-200"
                >
                  <Mail className="size-4 text-laser-300/70" />
                  {site.email}
                </a>
              </li>
              <li className="text-sm text-muted-foreground">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 sm:flex-row">
          <p className="text-xs text-muted-foreground">
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
      </div>
    </footer>
  );
}
