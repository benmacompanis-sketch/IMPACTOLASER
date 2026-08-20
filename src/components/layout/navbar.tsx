"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { CtaButton } from "@/components/shared/cta-button";
import { Magnetic } from "@/components/effects/magnetic";
import { useLenis } from "@/components/providers/smooth-scroll-provider";
import { navLinks, presupuestoHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar({ started = true }: { started?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.3 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={started ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="m-show fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
              : "border border-transparent bg-transparent"
          )}
        >
          {/* Brand */}
          <a
            href="#inicio"
            onClick={(e) => handleNav(e, "#inicio")}
            className="group flex items-center gap-2"
            aria-label={`${"IMPACTO LASER"} — inicio`}
          >
            <Logo variant="mark" className="h-9 w-auto -translate-y-1 sm:h-11" priority />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Magnetic strength={0.25}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="relative inline-flex rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* CTA + mobile trigger */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <CtaButton href={presupuestoHref} size="sm" className="text-[13px]">
                Solicitar presupuesto
                <ArrowUpRight className="size-4" />
              </CtaButton>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu — solid (opaque) background instead of a
          full-viewport backdrop-blur. Rasterising a blurred backdrop over the
          whole screen is the single biggest cause of a laggy menu on phones;
          a solid surface opens instantly. This overlay is lg:hidden, so the
          desktop experience is never touched. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#060912]" />
            <motion.nav
              className="relative flex h-full flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.03 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="flex items-center justify-between border-b border-white/5 py-5 font-display text-3xl font-semibold text-white/90"
                >
                  <span>{link.label}</span>
                  <span className="text-sm font-mono text-laser-400">0{i + 1}</span>
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <CtaButton href={presupuestoHref} className="w-full" size="lg" magnetic={false}>
                  Solicitar presupuesto
                  <ArrowUpRight className="size-4" />
                </CtaButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
