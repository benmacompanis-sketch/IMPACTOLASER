"use client";

import { Intro } from "@/components/sections/intro";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Technology } from "@/components/sections/technology";
import { WhatWeRemove } from "@/components/sections/what-we-remove";
import { Surfaces } from "@/components/sections/surfaces";
import { Applications } from "@/components/sections/applications";
import { Comparison } from "@/components/sections/comparison";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Intro />

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-laser-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main className="relative">
        <Hero />
        <Technology />
        <WhatWeRemove />
        <Surfaces />
        <Applications />
        <Comparison />
        <Stats />
        <Process />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
