"use client";

import { useCallback, useState } from "react";

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
import { Contact } from "@/components/sections/contact";
import { WhatsappCtaBand } from "@/components/sections/whatsapp-cta-band";
import { WhatsappFloat } from "@/components/shared/whatsapp-float";

export default function Home() {
  const [started, setStarted] = useState(false);
  const handleStart = useCallback(() => setStarted(true), []);

  return (
    <>
      <Intro onComplete={handleStart} />

      <Navbar started={started} />

      <main className="relative">
        <Hero started={started} />
        <Technology />
        <WhatWeRemove />
        <Surfaces />
        <Applications />
        <WhatsappCtaBand />
        <Comparison />
        <Stats />
        <Process />
        <Testimonials />
        <Faq />
        <FinalCta />
        <Contact />
      </main>

      <Footer />

      <WhatsappFloat active={started} />
    </>
  );
}
