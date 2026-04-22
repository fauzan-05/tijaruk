"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollTriggerRefresh } from "../animation/scrollTriggerRefresh";
import { assets, serviceCards } from "../data";
import { SectionTag } from "../ui";

gsap.registerPlugin(ScrollTrigger);

const serviceCardPositions = [
  "left-1/2 top-[210px] -translate-x-1/2 sm:left-[28px] sm:top-[80px] sm:translate-x-0 lg:left-[60px] lg:top-[250px]",
  "left-1/2 top-[405px] -translate-x-1/2 sm:left-auto sm:right-[20px] sm:top-[80px] sm:translate-x-0 lg:left-[800px] lg:top-[250px] lg:right-auto",
  "left-1/2 top-[600px] -translate-x-1/2 sm:left-1/2 sm:top-[330px] sm:-translate-x-1/2 lg:left-[430px] lg:top-[575px] lg:translate-x-0",
  "left-1/2 top-[770px] -translate-x-1/2 sm:left-[28px] sm:top-[580px] sm:translate-x-0 lg:left-[60px] lg:top-[930px]",
  "left-1/2 top-[965px] -translate-x-1/2 sm:left-auto sm:right-[20px] sm:top-[580px] sm:translate-x-0 lg:left-[800px] lg:top-[930px] lg:right-auto",
  "left-1/2 top-[1160px] -translate-x-1/2 sm:left-1/2 sm:top-[830px] sm:-translate-x-1/2 lg:left-[430px] lg:top-[1275px] lg:translate-x-0",
];

function AsteriskIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="12">
        <path d="M50 6v88" />
        <path d="M6 50h88" />
        <path d="M18 18l64 64" />
        <path d="M82 18 18 82" />
      </g>
    </svg>
  );
}

const serviceCardCopy = {
  "01": ["Import & Export", "Solutions"],
  "02": ["Business Setup", "in KSA"],
  "03": ["Entrepreneur", "Development"],
  "04": ["Branding &", "Marketing"],
  "05": ["Business Setup", "in KSA"],
  "06": ["Global Product", "Marketing"],
};

const serviceCardAsteriskPositions = {
  "01": "right-[-14px] top-[-10px] size-[110px] sm:right-[-16px] sm:top-[-12px] sm:size-[136px] lg:right-[-18px] lg:top-[-12px] lg:size-[172px]",
  "02": "left-[-14px] top-[-10px] size-[110px] sm:left-[-16px] sm:top-[-12px] sm:size-[136px] lg:left-[-18px] lg:top-[-12px] lg:size-[172px]",
  "03": "right-[-14px] top-[-10px] size-[110px] sm:right-[-16px] sm:top-[-12px] sm:size-[136px] lg:right-[-18px] lg:top-[-12px] lg:size-[172px]",
  "04": "left-[-18px] bottom-[-18px] size-[116px] sm:left-[-20px] sm:bottom-[-20px] sm:size-[140px] lg:left-[-24px] lg:bottom-[-24px] lg:size-[176px]",
  "05": "right-[-18px] bottom-[-18px] size-[116px] sm:right-[-20px] sm:bottom-[-20px] sm:size-[140px] lg:right-[-24px] lg:bottom-[-24px] lg:size-[176px]",
  "06": "left-[-18px] bottom-[-18px] size-[116px] sm:left-[-20px] sm:bottom-[-20px] sm:size-[140px] lg:left-[-24px] lg:bottom-[-24px] lg:size-[176px]",
};

function ServiceCard({ id, positionClassName }) {
  const isLight = id === "03" || id === "06";
  const numberOnRight = id === "02" || id === "05";
  const lines = serviceCardCopy[id] ?? [id, ""];
  const asteriskClassName = serviceCardAsteriskPositions[id] ?? "right-0 top-0 size-[180px]";

  return (
    <article
      className={[
        "service-what-card absolute overflow-hidden rounded-none",
        positionClassName,
        "h-[172px] w-[239px] sm:h-[206px] sm:w-[274px] lg:h-[314px] lg:w-[353px]",
        isLight
          ? "bg-white text-black"
          : "bg-[#5f0c66] text-white",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          asteriskClassName,
          isLight ? "text-[#efe9e4] opacity-45" : "text-[#8f0b9e] opacity-40",
        ].join(" ")}
      >
        <AsteriskIcon className="size-full" />
      </div>

      <span
        className={[
          "absolute top-4 font-ibrand text-[30px] font-semibold leading-none text-[#e39b4d] sm:top-5 sm:text-[38px] lg:top-7 lg:text-[54px]",
          numberOnRight
            ? "right-4 sm:right-5 lg:right-7"
            : "left-4 sm:left-5 lg:left-7",
        ].join(" ")}
      >
        {id}
      </span>

      <h3
        className={[
          "absolute left-1/2 top-[69%] w-[10.5ch] -translate-x-1/2 -translate-y-1/2 text-center font-ibrand font-semibold leading-[1.02] sm:top-[69%] lg:top-[71%]",
          isLight ? "text-black" : "text-white",
          "text-[1rem] sm:text-[1.18rem] lg:text-[2rem] lg:leading-[1.04]",
        ].join(" ")}
      >
        <span className="block">{lines[0]}</span>
        <span className="block">{lines[1]}</span>
      </h3>
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsTrackRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !introRef.current || !cardsTrackRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const cardsTrack = cardsTrackRef.current;

      gsap.fromTo(
        introRef.current,
        { autoAlpha: 0, y: -36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      const getScrollDistance = () => {
        const viewportHeight = cardsTrack.parentElement?.offsetHeight || window.innerHeight;
        const lastCard = cardsTrack.querySelector(".service-what-card:last-child");

        if (lastCard) {
          const lastCardCenterOffset = Math.max(
            160,
            (viewportHeight - lastCard.offsetHeight) * 0.5
          );

          return Math.max(
            0,
            lastCard.offsetTop + lastCard.offsetHeight - viewportHeight + lastCardCenterOffset
          );
        }

        return Math.max(0, cardsTrack.scrollHeight - viewportHeight);
      };

      gsap.set(cardsTrack, {
        y: 0,
        willChange: "transform",
      });

      gsap.set(introRef.current, {
        willChange: "transform",
      });

      const pinnedScroll = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pinnedScroll
        .to(
          cardsTrack,
          {
            y: () => -getScrollDistance(),
            ease: "none",
          },
          0
        )
        .to(
          introRef.current,
          {
            y: () => -Math.min(320, window.innerHeight * 0.42),
            ease: "none",
          },
          0
        );

      ScrollTrigger.refresh();
    }, section);

    const cleanupRefresh = createScrollTriggerRefresh(ScrollTrigger, section);

    return () => {
      cleanupRefresh();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative isolate h-screen overflow-hidden bg-[#1f161d]"
    >
      <Image
        alt=""
        className="absolute inset-0 size-full object-cover object-[center_42%]"
        fill
         loading="lazy"
        sizes="100vw"
        src={assets.servicesImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,10,16,0.42)_0%,rgba(22,13,19,0.36)_18%,rgba(16,10,15,0.42)_100%)]" />
      <div
        ref={introRef}
        className="absolute left-4 top-10 z-20 flex max-w-[300px] flex-col items-start text-left sm:left-6 sm:top-12 sm:max-w-[360px] lg:left-10 lg:top-14 lg:max-w-[430px]"
      >
        <SectionTag className="block text-left text-[1.2rem] normal-case tracking-normal text-[#e3a054] sm:text-[1.38rem] lg:text-[1.48rem]">
          What do We Do?
        </SectionTag>
        <h2 className="mt-3 font-ibrand text-[1.95rem] leading-[1.04] text-white sm:mt-4 sm:text-[2.2rem] lg:mt-4 lg:text-[2.55rem]">
          <span className="block sm:whitespace-nowrap">We make trade and</span>
          <span className="mt-2 block sm:whitespace-nowrap">business simple.</span>
        </h2>
      </div>

      <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="relative mx-auto h-[calc(100vh-64px)] w-full max-w-[680px] overflow-hidden sm:h-[calc(100vh-80px)] sm:max-w-[760px] lg:h-[calc(100vh-96px)] lg:max-w-[1440px]">
          <div
            ref={cardsTrackRef}
            className="relative mx-auto h-[1380px] max-w-[320px] sm:h-[1180px] sm:max-w-[760px] lg:h-[1700px] lg:max-w-[1200px]"
          >
            {serviceCards.map((card, index) => (
              <ServiceCard key={card.id} id={card.id} positionClassName={serviceCardPositions[index]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
