"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollTriggerRefresh } from "../animation/scrollTriggerRefresh";
import { benefitCards } from "../data";
import { ArrowIcon, BenefitIcon } from "../ui";

gsap.registerPlugin(ScrollTrigger);

function BenefitCard({ title, icon }) {
  return (
    <article className="relative overflow-hidden rounded-[18px] bg-white p-7 shadow-[0_20px_60px_rgba(26,15,44,0.12)] lg:min-h-[190px] lg:w-full">
      <div className="relative flex h-full flex-col gap-7">
        <BenefitIcon type={icon} />
        <h3 className="max-w-[12ch] font-['Manrope',sans-serif] text-[1.05rem] font-bold leading-[1.45] text-[#5f0c66] sm:text-[1.15rem]">
          {title}
        </h3>
      </div>
    </article>
  );
}

export default function Benefits() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !panelRef.current) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const revealItems = gsap.utils.toArray("[data-benefit-reveal]", panel);

      gsap.set(panel, {
        autoAlpha: 0,
        force3D: true,
        scale: 0.985,
        willChange: "transform, opacity",
        y: 28,
      });

      gsap.set(revealItems, {
        autoAlpha: 0,
        force3D: true,
        willChange: "transform, opacity",
        y: 18,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set([panel, ...revealItems], { clearProps: "willChange" });
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
          toggleActions: "play none none none",
        },
      });

      tl.to(panel, {
        autoAlpha: 1,
        duration: 1.05,
        scale: 1,
        y: 0,
      }).to(
        revealItems,
        {
          autoAlpha: 1,
          duration: 0.72,
          stagger: 0.1,
          y: 0,
        },
        0.22
      );
    }, sectionRef);

    const cleanupRefresh = createScrollTriggerRefresh(ScrollTrigger, sectionRef.current);

    return () => {
      cleanupRefresh();
      ctx.revert();
    };
  }, []);

  const scrollOneCard = (direction) => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector("[data-benefit-card]");
    if (!firstCard) return;

    const gap = 14; // gap-3.5
    const cardWidth = firstCard.getBoundingClientRect().width;
    const distance = cardWidth + gap;

    trackRef.current.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  const showPrevious = () => {
    scrollOneCard(-1);
  };

  const showNext = () => {
    scrollOneCard(1);
  };

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="px-4 py-8 sm:px-6 sm:py-10 lg:px-0 lg:py-12"
    >
      <div
        ref={panelRef}
        className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[10px] bg-[#5f0c66] px-6 py-8 shadow-[0_30px_80px_rgba(68,7,82,0.25)] sm:px-8 lg:min-h-[540px] lg:px-[2.5rem] lg:py-[1.8rem]"
      >
        <div className="absolute inset-0 opacity-[0.1]">
          <img
            alt=""
            className="size-full object-cover"
            decoding="async"
            loading="lazy"
            src="/sourcing/rfq-pattern.png"
          />
        </div>

        <div className="relative">
          <h2
            data-benefit-reveal
            className="max-w-[12.5ch] font-['ibrand',sans-serif] text-[2.15rem] font-semibold leading-[0.95] text-white sm:text-[2.45rem] lg:text-[2.8rem]"
          >
            <span className="block whitespace-nowrap">We make trade and</span>
            <span className="mt-1 block whitespace-nowrap">business simple.</span>
          </h2>

          <div data-benefit-reveal className="mt-7 overflow-hidden pr-4 lg:pr-[1.6rem]">
            <div
              ref={trackRef}
              className="flex gap-3.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {benefitCards.map((card) => (
                <div
                  key={card.title}
                  data-benefit-card
                  className="w-full shrink-0 lg:w-[calc((100%-1.75rem)/3)]"
                >
                  <BenefitCard {...card} />
                </div>
              ))}
            </div>
          </div>

          <div data-benefit-reveal className="mt-12 flex items-center justify-center gap-3">
            <button
              aria-label="Previous"
              className="flex size-[3rem] items-center justify-center rounded-full bg-white text-[#5f0c66] transition hover:bg-[#f4dcb8]"
              onClick={showPrevious}
              type="button"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              aria-label="Next"
              className="flex size-[3rem] items-center justify-center rounded-full bg-white text-[#5f0c66] transition hover:bg-[#f4dcb8]"
              onClick={showNext}
              type="button"
            >
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
