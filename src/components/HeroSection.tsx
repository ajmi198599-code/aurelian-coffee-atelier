"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarDays, Coffee } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { conceptLine } from "@/lib/content";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const scrollToOrbit = () => {
    document.getElementById("orbit")?.scrollIntoView({ behavior: "smooth" });
  };

  const reserve = () => {
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section relative flex min-h-screen overflow-hidden px-5 py-6 sm:px-8 lg:px-10">
      <div className="hero-grain" aria-hidden />
      <nav className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-[0.68rem] uppercase tracking-normal text-espresso/70 sm:px-8 lg:px-10">
        <a className="pointer-events-auto flex items-center gap-2 font-semibold" href="#top" aria-label="Aurelian home">
          <span className="grid size-8 place-items-center border border-espresso/20 bg-cream/75 text-espresso shadow-soft">
            <Coffee size={15} strokeWidth={1.8} />
          </span>
          Aurelian
        </a>
        <div className="pointer-events-auto hidden gap-7 md:flex">
          <a href="#menu">Menu</a>
          <a href="#origins">Origins</a>
          <a href="#shop">Shop</a>
          <a href="#reserve">Reserve</a>
        </div>
      </nav>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:pt-10">
        <div className="relative z-10 max-w-4xl">
          <motion.p
            className="mb-5 text-xs font-semibold uppercase tracking-normal text-caramel"
            initial={reduceMotion ? false : { y: 24, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Coffee atelier / Riyadh
          </motion.p>
          <motion.p
            className="concept-pill mb-6"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {conceptLine}
          </motion.p>
          <motion.h1
            className="max-w-5xl text-[4.2rem] font-normal leading-[0.78] tracking-normal text-espresso sm:text-[6.4rem] lg:text-[8.8rem] xl:text-[10.2rem]"
            initial={reduceMotion ? false : { y: 42, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ delay: 0.08, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Aurelian Coffee Atelier
          </motion.h1>
          <motion.div
            className="mt-8 grid max-w-3xl gap-6 border-l border-caramel/40 pl-5 md:grid-cols-[1fr_auto] md:items-end"
            initial={reduceMotion ? false : { y: 28, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            transition={{ delay: 0.22, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-xl text-base leading-8 text-cocoa/78 md:text-lg">
              A bright, cinematic tasting room for rare origins, slow rituals, and service that makes the room feel quieter.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="command-button primary" onClick={reserve} aria-label="Scroll to reservation and contact section">
                <CalendarDays size={17} />
                Reserve the Atelier
              </button>
              <button className="command-button" onClick={scrollToOrbit} aria-label="Scroll to the interactive orbit navigation section">
                <ArrowDown size={17} />
                Enter the Orbit
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-media relative mx-auto w-full max-w-[510px] lg:mr-0"
          initial={reduceMotion ? false : { y: 40, opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-video-shell">
            <AmbientVideo
              eager
              className="h-full w-full object-cover"
              src="/assets/videos/hero-espresso.mp4"
              poster="/assets/images/hero-espresso.jpg"
              label="Espresso pouring into a white cup"
            />
          </div>
          <div className="hero-spec left-0 top-[12%]">
            <span>Altitude</span>
            <strong>1,920m</strong>
          </div>
          <div className="hero-spec bottom-[14%] right-0">
            <span>Texture</span>
            <strong>Silk crema</strong>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.66rem] uppercase tracking-normal text-espresso/50 md:flex">
        <span className="h-px w-10 bg-espresso/20" />
        <span>First pour</span>
        <span className="h-px w-10 bg-espresso/20" />
      </div>
    </section>
  );
}
