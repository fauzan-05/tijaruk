"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { createScrollTriggerRefresh } from "../animation/scrollTriggerRefresh";
import Footer from "../shares/Footer";
import Navbar from "../shares/Navbar";
import SourcingRFQForm from "./SourcingRFQForm";
import {
  rfqFormContent,
  sourcingAdvantages,
  sourcingHero,
  sourcingSections,
} from "./sourcingData";

gsap.registerPlugin(ScrollTrigger);

function SourcingIcon({ className = "", type }) {
  const sharedProps = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.9",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "price":
      return (
        <svg {...sharedProps}>
          <path d="M12 3h6l3 3v6l-8.5 8.5a2 2 0 0 1-2.8 0L3.5 14.3a2 2 0 0 1 0-2.8L12 3Z" />
          <circle cx="16.5" cy="7.5" r="1.2" />
        </svg>
      );
    case "truck":
      return (
        <svg {...sharedProps}>
          <path d="M3 7h10v8H3z" />
          <path d="M13 10h4l2 2v3h-6z" />
          <circle cx="8" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...sharedProps}>
          <path d="M12 3l7 3v5c0 5-3.4 8.7-7 10-3.6-1.3-7-5-7-10V6l7-3Z" />
          <path d="m9.5 12 1.7 1.7 3.5-3.7" />
        </svg>
      );
    case "wrong-access":
      return (
        <svg {...sharedProps} strokeWidth="2.5">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m6.4 17.6 11.2-11.2" />
        </svg>
      );
    case "inspect":
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="5" />
          <path d="m20 20-4.2-4.2" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      );
    case "globe":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "customs":
      return (
        <svg {...sharedProps}>
          <path d="M4 8h16" />
          <path d="M7 8V5h10v3" />
          <path d="M5 8v11h14V8" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      );
    default:
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8" />
        </svg>
      );
  }
}

function FeatureRow({ feature, tone }) {
  const isPlum = tone === "plum";

  return (
    <div className="sourcing-feature-card relative">
      <div className="pointer-events-none absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#dedede] bg-white text-[#6a1a73] shadow-[0_8px_18px_rgba(24,24,24,0.08)] sm:h-[60px] sm:w-[60px]">
          <SourcingIcon className="h-5 w-5 sm:h-6 sm:w-6" type={feature.icon} />
        </div>
      </div>

      <article
        className={`sourcing-feature-card-body relative z-10 rounded-[8px] px-3.5 py-3.5 pl-[60px] shadow-[0_12px_26px_rgba(0,0,0,0.08)] before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:h-[38px] before:w-[38px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[#f5f5f5] sm:px-4 sm:py-4 sm:pl-[72px] sm:before:h-[44px] sm:before:w-[44px] ${
          isPlum ? "bg-[#5f0c66] text-white" : "bg-[#e39b4d] text-white"
        }`}
      >
        <div className="relative z-10">
          <h3 className="font-['Poppins',sans-serif] text-[0.95rem] font-semibold leading-5 sm:text-[1.08rem]">
            {feature.title}
          </h3>
          <p className="mt-1 max-w-[720px] font-['Poppins',sans-serif] text-[11px] leading-5 text-white/85 sm:text-[13px] sm:leading-5">
            {feature.description}
          </p>
        </div>
      </article>
    </div>
  );
}

function SourcingFeatureSection({ section }) {
  const sectionSpacingClass =
    section.id === "domestic" || section.id === "international"
      ? "pt-6 pb-12 sm:pt-10 sm:pb-16"
      : "py-12 sm:py-16";

  return (
    <section
      className={`sourcing-feature-section ${sectionSpacingClass}`}
      data-section-id={section.id}
      data-reverse={section.reverse ? "true" : "false"}
      id={section.id}
    >
      <div
        className={`mx-auto grid max-w-[1320px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:px-10 ${
          section.reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <div className="sourcing-feature-image overflow-hidden rounded-[12px] shadow-[0_24px_60px_rgba(27,0,30,0.1)]">
          <Image
            alt={section.imageAlt}
            className="sourcing-feature-image-img h-[280px] w-full object-cover sm:h-[420px] lg:h-[510px]"
            height={510}
            sizes="(max-width: 1024px) 100vw, 600px"
            src={section.image}
            width={640}
          loading="lazy" />
        </div>

        <div className="sourcing-feature-copy lg:max-w-[620px]">
          <h2 className="font-['Poppins',sans-serif] text-[1.7rem] font-semibold leading-tight text-[#181818] sm:text-[2rem]">
            {section.title}
          </h2>
          <p className="mt-2 font-['Poppins',sans-serif] text-[15px] leading-7 text-[#6b6b6b] sm:text-[18px] sm:leading-8">
            {section.subtitle}
          </p>

          <div className="mt-5 space-y-2 sm:space-y-2.5">
            {section.features.map((feature) => (
              <FeatureRow key={feature.title} feature={feature} tone={section.tone} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvantageList() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:items-start lg:px-10">
        <div className="max-w-[560px]">
          <h2 className="font-['Poppins',sans-serif] text-[1.75rem] font-semibold leading-tight text-[#1d1d1d] sm:text-[2rem]">
            {sourcingAdvantages.title}
          </h2>
          <p className="mt-4 max-w-[500px] font-['Poppins',sans-serif] text-[15px] leading-7 text-[#636363] sm:text-[16px] sm:leading-8">
            {sourcingAdvantages.description}
          </p>
        </div>

        <div className="relative">
          {sourcingAdvantages.items.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-[70px_1fr] border-b border-[#cfcfcf] last:border-b-0 sm:grid-cols-[86px_1fr]"
            >
              <div className="border-r border-[#cfcfcf] py-3 pr-4 text-right font-['Poppins',sans-serif] text-[1.85rem] font-semibold leading-none text-[#4d4d4d] sm:py-4 sm:pr-5 sm:text-[2.1rem]">
                {item.id}
              </div>
              <div className="py-3 pl-5 sm:py-4 sm:pl-6">
                <h3 className="font-['Poppins',sans-serif] text-[1.05rem] font-semibold leading-tight text-[#444444] sm:text-[1.25rem]">
                  {item.title}
                </h3>
                <p className="mt-1 font-['Poppins',sans-serif] text-[14px] leading-5 text-[#5e5e5e] sm:text-[16px] sm:leading-6">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return undefined;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray(".sourcing-hero-media-image", sectionRef.current);
      if (!images.length) return;

      gsap.set(images, {
        autoAlpha: 0,
        willChange: "opacity,filter",
        filter: "blur(10px)",
      });

      gsap.to(images, {
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power2.out",
        stagger: 0.24,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
        onComplete: () => {
          gsap.set(images, { clearProps: "willChange,filter" });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-4 pb-10 pt-8 sm:px-6 lg:px-10 lg:pb-16">
      <div className="mx-auto max-w-[1440px]">
        <Navbar />

        <div className="pt-10">
          <h1 className="text-center font-ibrand text-[2.3rem] leading-none text-[#e39b4d] sm:text-[3rem] lg:text-[3.35rem]">
            {sourcingHero.label}
          </h1>

          <div className="sourcing-hero-grid mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div>
              <h2 className="max-w-[560px] whitespace-pre-line font-['Poppins',sans-serif] text-[1.2rem] font-semibold leading-tight text-[#181818] sm:text-[1.65rem] lg:text-[1.85rem]">
                {sourcingHero.title}
              </h2>

              <div className="sourcing-hero-media relative mt-6 overflow-hidden rounded-[12px] shadow-[0_26px_65px_rgba(27,0,30,0.14)]">
                <Image
                  alt="Business sourcing discussion"
                  className="sourcing-hero-media-image h-[290px] w-full object-cover sm:h-[390px] lg:h-[500px]"
                  height={500}
                   loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src={sourcingHero.imagePrimary}
                  width={680}
                />

                <div className="sourcing-hero-overlay absolute inset-x-4 bottom-4 min-h-[110px] rounded-[10px] bg-white px-5 py-5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:inset-x-6 sm:bottom-6 sm:min-h-[124px] sm:px-6 sm:py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-['Poppins',sans-serif] text-base font-semibold text-[#1d1d1d] sm:text-[1.1rem]">
                        {sourcingHero.cardTitle}
                      </h3>
                      <p className="mt-2 max-w-[420px] font-['Poppins',sans-serif] text-xs leading-5 text-[#666666] sm:text-[13px]">
                        {sourcingHero.cardDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="sourcing-hero-media overflow-hidden rounded-[12px] shadow-[0_26px_65px_rgba(27,0,30,0.14)] lg:ml-auto lg:max-w-[500px]">
                <Image
                  alt="Supplier planning around a laptop"
                  className="sourcing-hero-media-image h-[285px] w-full object-cover sm:h-[385px] lg:h-[455px]"
                  height={455}
                  sizes="(max-width: 1024px) 100vw, 500px"
                  src={sourcingHero.imageSecondary}
                  width={500}
                loading="lazy" />
              </div>

              <div className="lg:ml-auto lg:max-w-[500px]">
                <p className="mt-5 font-['Poppins',sans-serif] text-[14px] leading-7 text-[#4d4d4d] sm:text-[15px] sm:leading-7">
                  {sourcingHero.body}
                </p>

                <a
                  className="mt-5 inline-flex h-[52px] items-center justify-center rounded-[7px] bg-[#5f0c66] px-8 font-['Poppins',sans-serif] text-sm font-semibold text-white transition hover:bg-[#74217a] sm:h-[58px] sm:px-10 sm:text-base"
                  href="#rfq"
                >
                  {sourcingHero.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RFQSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#5f0c66] py-16 sm:py-20 lg:py-24" id="rfq">
      <Image
        alt=""
        className="absolute inset-0 size-full object-cover object-center opacity-[0.1]"
        fill
        sizes="100vw"
        src="/sourcing/rfq-pattern.webp"
      loading="lazy" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[720px] text-center text-white">
        
       
        </div>

        <div className="mt-10">
          <SourcingRFQForm />
        </div>
      </div>
    </section>
  );
}

export default function SourcingPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const page = pageRef.current;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".sourcing-feature-section", page);

      sections.forEach((section) => {
        const isDomestic = section.dataset.sectionId === "domestic";
        const isReverse = section.dataset.reverse === "true";
        const image = section.querySelector(".sourcing-feature-image");
        const imageInner = image?.querySelector(".sourcing-feature-image-img");
        const copy = section.querySelector(".sourcing-feature-copy");
        const featureCards = gsap.utils.toArray(".sourcing-feature-card-body", section);
        const animatedItems = [image, imageInner, copy, ...featureCards].filter(Boolean);
        const cardDuration = isDomestic ? 0.82 : 0.76;
        const cardStagger = isDomestic ? 0.14 : 0.12;

        if (animatedItems.length) {
          gsap.set(animatedItems, {
            force3D: true,
            willChange: "transform, opacity",
          });
        }

        if (image && imageInner) {
          gsap.set(image, {
            autoAlpha: 0,
          });

          gsap.set(imageInner, {
            scale: 1.02,
            transformOrigin: "center top",
            yPercent: -105,
          });
        }

        if (featureCards.length) {
          gsap.set(featureCards, {
            autoAlpha: 0,
            x: isReverse ? 36 : -36,
          });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        if (image && imageInner) {
          tl.fromTo(
            image,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.05, ease: "none" },
            0
          ).to(
            imageInner,
            {
              duration: 1.05,
              force3D: true,
              scale: 1,
              yPercent: 0,
            },
            0
          );
        }

        if (copy) {
          tl.from(
            copy,
            {
              autoAlpha: 0,
              duration: 0.62,
              force3D: true,
              overwrite: "auto",
              y: 20,
            },
            0.16
          );
        }

        if (featureCards.length) {
          tl.to(
            featureCards,
            {
              autoAlpha: 1,
              duration: cardDuration,
              force3D: true,
              overwrite: "auto",
              stagger: cardStagger,
              x: 0,
            },
            0.24
          );
        }

        tl.eventCallback("onComplete", () => {
          if (animatedItems.length) {
            gsap.set(animatedItems, { clearProps: "willChange" });
          }
        });
      });

      ScrollTrigger.refresh();
    }, page);

    const cleanupRefresh = createScrollTriggerRefresh(ScrollTrigger, page);

    return () => {
      cleanupRefresh();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen overflow-x-hidden bg-[#f5f5f5] text-[#141414]">
      <HeroSection />

      {sourcingSections.map((section) => (
        <SourcingFeatureSection key={section.id} section={section} />
      ))}

      <AdvantageList />
      <RFQSection />
      <Footer />
    </main>
  );
}
