"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { orbitItems } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function OrbitExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = orbitItems[activeIndex];

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      gsap.to(stage, {
        "--orbit-rotation": "430deg",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          onUpdate: (self) => {
            const next = Math.min(orbitItems.length - 1, Math.floor(self.progress * orbitItems.length));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActiveIndex(next);
            }
          },
        },
      });

      gsap.fromTo(
        ".orbit-chapter",
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  const activate = (index: number) => {
    const item = orbitItems[index];
    setActiveIndex(index);
    activeRef.current = index;

    if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
      return;
    }

    if (item.href.startsWith("http")) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const actionLabel = activeItem.href.startsWith("mailto:")
    ? "Contact Designer"
    : activeItem.id === "instagram"
      ? "Open Instagram"
      : "Visit Chapter";

  return (
    <section ref={sectionRef} id="orbit" className="orbit-section relative min-h-[440vh] overflow-clip">
      <div className="orbit-mobile md:hidden">
        <p className="section-kicker">Experience orbit</p>
        <h2 className="section-title">Choose your point of gravity.</h2>
        <div className="mt-8 grid gap-3">
          {orbitItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className="mobile-orbit-button" onClick={() => activate(index)}>
                <Icon size={18} />
                <span>{item.label}</span>
                {item.external && <ArrowUpRight size={16} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky top-0 hidden min-h-screen items-center px-8 py-12 md:flex">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[minmax(290px,0.78fr)_minmax(520px,1.22fr)] items-center gap-12">
          <div className="orbit-chapter relative z-10 max-w-[470px]">
            <p className="section-kicker">Sticky orbit navigation</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="orbit-eyebrow">{activeItem.eyebrow}</span>
                <h2 className="mt-5 text-[3.1rem] font-normal leading-[0.85] tracking-normal text-espresso lg:text-[4.8rem] xl:text-[5.2rem]">
                  {activeItem.title}
                </h2>
                <p className="mt-7 text-base leading-8 text-cocoa/75">{activeItem.copy}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-3">
              <button className="command-button primary" onClick={() => activate(activeIndex)}>
                {actionLabel}
                <ArrowUpRight size={16} />
              </button>
              <span className="text-xs uppercase tracking-normal text-espresso/42">
                {String(activeIndex + 1).padStart(2, "0")} / {String(orbitItems.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div ref={stageRef} className="orbit-stage orbit-chapter" style={{ "--orbit-rotation": "0deg" } as CSSProperties}>
            <div className="orbit-radar" aria-hidden />
            <div className="orbit-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  className="orbit-center-media"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AmbientVideo
                    src={activeItem.video}
                    poster={activeItem.poster}
                    className="h-full w-full object-cover"
                    label={`${activeItem.label} coffee chapter footage`}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="orbit-center-label">
                <span>{activeItem.label}</span>
              </div>
            </div>

            {orbitItems.map((item, index) => {
              const Icon = item.icon;
              const angle = `${(360 / orbitItems.length) * index - 90}deg`;
              const active = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  className={`orbit-bean ${active ? "active" : ""}`}
                  style={{ "--bean-angle": angle } as CSSProperties}
                  onClick={() => activate(index)}
                  onFocus={() => setActiveIndex(index)}
                  whileHover={reduceMotion ? undefined : { scale: active ? 1.08 : 1.04, y: -4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  aria-current={active ? "true" : undefined}
                  aria-label={`${item.label}${item.href.startsWith("http") ? ", opens in a new tab" : ""}`}
                >
                  <span className="bean-visual" aria-hidden>
                    <span className="bean-groove" />
                  </span>
                  <span className="bean-icon">
                    <Icon size={15} strokeWidth={1.9} />
                  </span>
                  <span className="bean-label">
                    {item.label}
                    {item.external && <ArrowUpRight size={13} />}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
