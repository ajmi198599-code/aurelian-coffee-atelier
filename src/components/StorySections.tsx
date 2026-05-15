"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  ExternalLink,
  Mail,
  MapPin,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { AmbientVideo } from "@/components/AmbientVideo";
import {
  brewSteps,
  conceptLine,
  designerEmail,
  designerMailto,
  menuItems,
  originCards,
  products,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function StorySections() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const compactMotion = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: compactMotion ? 24 : 46, filter: compactMotion ? "blur(0px)" : "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: compactMotion ? 0.65 : 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".parallax-soft").forEach((element) => {
        gsap.to(element, {
          yPercent: compactMotion ? -2 : -8,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: 0.8,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <>
      <MenuSection />
      <OriginsSection />
      <BrewingSection />
      <BrandStorySection />
      <ShopSection />
      <FinalCTASection />
    </>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="story-section">
      <div className="section-shell">
        <div className="section-heading reveal">
          <p className="section-kicker">Menu experience</p>
          <h2 className="section-title">Composed for the hour you arrive.</h2>
        </div>

        <div className="menu-bento mt-12">
          <div className="menu-feature reveal">
            <AmbientVideo
              src="/assets/videos/ritual-pour.mp4"
              poster="/assets/images/ritual-pour.jpg"
              className="h-full w-full object-cover"
              label="Coffee being poured into a cup"
            />
            <div className="menu-feature-copy">
              <span>Reserve tasting</span>
              <strong>Three cups, one quiet arc.</strong>
            </div>
          </div>

          {menuItems.map((item, index) => (
            <motion.article
              key={item.name}
              className={`menu-card reveal ${index === 0 ? "md:col-span-2" : ""}`}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="menu-accent">{item.accent}</span>
                  <h3>{item.name}</h3>
                </div>
                <span className="menu-price">{item.price}</span>
              </div>
              <p>{item.note}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OriginsSection() {
  return (
    <section id="origins" className="story-section origins-section">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="reveal">
          <p className="section-kicker">Coffee origins</p>
          <h2 className="section-title">Altitude, harvest, and human hands remain visible.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-cocoa/72">
            Aurelian works with small importers and producers who can tell us how each lot moved from soil to drying bed to roast curve. We preserve that chain in the service, so flavor never feels anonymous.
          </p>
        </div>

        <div className="origin-board reveal">
          {originCards.map((origin) => (
            <article key={origin.region} className="origin-card">
              <div>
                <span>{origin.altitude}</span>
                <h3>{origin.region}</h3>
              </div>
              <p>{origin.profile}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrewingSection() {
  const [active, setActive] = useState(0);
  const current = brewSteps[active];

  return (
    <section id="brewing" className="story-section">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="brew-visual reveal parallax-soft">
          <AmbientVideo
            src="/assets/videos/stirred-latte.mp4"
            poster="/assets/images/stirred-latte.jpg"
            className="h-full w-full object-cover"
            label="A coffee drink being stirred"
          />
          <div className="brew-meter" aria-hidden>
            <span style={{ height: `${(active + 1) * 25}%` }} />
          </div>
          <div className="brew-caption">
            <span>{current.step}</span>
            <strong>{current.title}</strong>
          </div>
        </div>

        <div className="reveal">
          <p className="section-kicker">Brewing experience</p>
          <h2 className="section-title">Precision that feels almost silent.</h2>
          <div className="mt-10 grid gap-3">
            {brewSteps.map((item, index) => (
              <button
                key={item.step}
                className={`brew-step ${active === index ? "active" : ""}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span>{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStorySection() {
  return (
    <section id="story" className="story-section brand-section">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="reveal">
            <p className="section-kicker">Our story</p>
            <h2 className="story-type">
              We built a bright room for people who want coffee to slow the city down.
            </h2>
          </div>
          <div className="story-panel reveal">
            <p>
              The bar is arranged around light, quiet service, and a deliberate sense of distance from the street. Materials stay warm and honest, limestone, oak, brass, porcelain, and cream-toned textiles.
            </p>
            <p>
              Nothing shouts. The cup does the work.
            </p>
          </div>
        </div>

        <div className="story-stats reveal">
          <span>
            <strong>14</strong>
            reserve lots a year
          </span>
          <span>
            <strong>04</strong>
            tasting chapters
          </span>
          <span>
            <strong>01</strong>
            pour bar
          </span>
        </div>
      </div>
    </section>
  );
}

function ShopSection() {
  const inquire = () => {
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="shop" className="story-section">
      <div className="section-shell">
        <div className="section-heading reveal">
          <p className="section-kicker">Product shop</p>
          <h2 className="section-title">Objects for a slower counter.</h2>
        </div>

        <div className="shop-grid mt-12">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <motion.article
                key={product.name}
                className="product-card reveal"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                <div className="product-mark">
                  <Icon size={22} strokeWidth={1.65} />
                </div>
                <div>
                  <span>{product.type}</span>
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                </div>
                <div className="product-footer">
                  <strong>{product.price}</strong>
                  <button type="button" onClick={inquire} aria-label={`Ask about ${product.name}`}>
                    <ShoppingBag size={17} />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reserve" className="final-section relative overflow-hidden px-5 py-24 sm:px-8 lg:px-10">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
        <div className="final-media reveal">
          <AmbientVideo
            src="/assets/videos/cafe-light.mp4"
            poster="/assets/images/cafe-light.jpg"
            className="h-full w-full object-cover"
            label="Coffee poured in warm cafe light"
          />
          <div className="final-ticket">
            <span>Tonight</span>
            <strong>8 seats</strong>
          </div>
        </div>

        <div className="reveal">
          <p className="section-kicker">Reserve / Order / Contact</p>
          <h2 className="section-title">Let the final cup become the beginning.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-cocoa/72">
            Book a seat, request a private tasting, or arrange a quiet order for pickup. The atelier responds with a timed service window.
          </p>
          <p className="concept-note mt-5">{conceptLine}</p>

          <form className="reserve-form mt-10" onSubmit={submit}>
            <label>
              <span>Name</span>
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              <span>Visit type</span>
              <select name="type" defaultValue="Reserve tasting">
                <option>Reserve tasting</option>
                <option>Table for two</option>
                <option>Pickup order</option>
                <option>Private cupping</option>
              </select>
            </label>
            <label className="md:col-span-2">
              <span>Message</span>
              <textarea name="message" placeholder="Preferred date, time, and cup profile" rows={4} />
            </label>
            <button className="command-button primary md:col-span-2" type="submit">
              {submitted ? (
                <>
                  <Check size={17} />
                  Request Noted
                </>
              ) : (
                <>
                  <CalendarDays size={17} />
                  Request a Tasting
                </>
              )}
            </button>
            {submitted && (
              <p className="form-success md:col-span-2" role="status">
                Request received — this is a concept demo.
              </p>
            )}
          </form>

          <div className="final-links mt-8">
            <span>
              <Clock3 size={16} />
              08:00 - 23:00
            </span>
            <span>
              <MapPin size={16} />
              Riyadh atelier district
            </span>
            <span>
              <Star size={16} />
              Reserve only after 19:00
            </span>
          </div>
        </div>
      </div>

      <aside className="creator-card reveal" aria-label="Creator and purchase inquiry">
        <div>
          <p className="section-kicker">Designer signature</p>
          <h2>Created by Mohammed Hilmi</h2>
          <strong>Web Designer & Creative Frontend Builder</strong>
          <p>
            This cinematic landing page was designed as a premium interactive concept for coffee brands, cafés, restaurants, and luxury product experiences.
          </p>
          <p>Interested in buying this landing page or requesting a custom website?</p>
          <p>
            Contact:
            <a href={designerMailto}> {designerEmail}</a>
          </p>
        </div>
        <a className="command-button primary designer-cta" href={designerMailto} aria-label="Contact Mohammed Hilmi about this landing page concept">
          <Mail size={17} />
          Contact the Designer
        </a>
      </aside>

      <div className="closing-line reveal">
        <Coffee size={16} />
        <span>Aurelian Coffee Atelier</span>
        <Sparkles size={16} />
        <span>Small rituals, served with light.</span>
        <ArrowRight size={16} />
      </div>
      <footer className="site-footer reveal">
        <p>© 2026 Aurelian Coffee Atelier Concept. Created by Mohammed Hilmi — Web Designer.</p>
        <nav aria-label="Footer links">
          <a href={designerMailto}>
            Contact Designer
            <Mail size={14} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            Instagram
            <ExternalLink size={14} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ExternalLink size={14} />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            GitHub
            <ExternalLink size={14} />
          </a>
        </nav>
      </footer>
    </section>
  );
}
