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
  "left-1/2 top-[220px] -translate-x-1/2 sm:left-auto sm:right-[-42px] sm:top-1 sm:translate-x-[26%] lg:right-[-30px] lg:top-2 lg:translate-x-[26%]",
  "left-1/2 top-[430px] -translate-x-1/2 sm:left-[34%] sm:top-[18%] sm:translate-x-0 lg:left-[34%] lg:top-[20%]",
  "left-1/2 top-[640px] -translate-x-1/2 sm:left-[-6px] sm:top-[37%] sm:-translate-x-[36%] lg:left-0 lg:top-[39%] lg:-translate-x-[36%]",
  "left-1/2 top-[850px] -translate-x-1/2 sm:left-auto sm:right-[-42px] sm:top-[39%] sm:translate-x-[26%] lg:right-[-30px] lg:top-[41%] lg:translate-x-[26%]",
  "left-1/2 top-[1060px] -translate-x-1/2 sm:left-[34%] sm:top-[60%] sm:translate-x-0 lg:left-[34%] lg:top-[62%]",
  "left-1/2 top-[1270px] -translate-x-1/2 sm:left-[-6px] sm:top-[81%] sm:-translate-x-[36%] lg:left-0 lg:top-[83%] lg:-translate-x-[36%]",
];

function ServiceCard({ id, title, tone, positionClassName }) {
  const isLight = tone === "light";

  return (
    <article
      className={[
        "service-what-card absolute flex h-[180px] w-[164px] flex-col justify-between overflow-hidden p-4 shadow-[0_14px_32px_rgba(0,0,0,0.13)] sm:h-[208px] sm:w-[194px] sm:p-5 lg:h-[250px] lg:w-[264px] lg:p-6 xl:h-[266px] xl:w-[278px]",
        positionClassName,
        isLight
          ? "border border-[#eee8e1] bg-[#fffdfb] text-[#171717]"
          : "bg-[#690c71] text-white",
      ].join(" ")}
    >
      {!isLight && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08))]" />
        </>
      )}

      <span className="relative font-ibrand text-[1.9rem] font-semibold leading-none text-[#e39b4d] sm:text-[2.15rem] lg:text-[2.35rem]">
        {id}
      </span>

      <h3 className="relative mx-auto my-auto max-w-[12ch] text-center font-ibrand text-[1.08rem] font-semibold leading-[1.15] sm:text-[1.24rem] lg:text-[1.52rem]">
        {title}
      </h3>

      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute font-['Manrope',sans-serif] text-[5.2rem] font-light leading-none sm:text-[6rem] lg:text-[6.8rem]",
          isLight ? "-left-2 bottom-0 text-[#ece6e0]" : "right-2 top-0 text-[#7a1682]",
        ].join(" ")}
      >
        *
      </span>
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
            toggleActions: "play none reverse none",
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
      className="relative isolate h-screen overflow-hidden bg-[#12080d]"
    >
      <Image
        alt=""
        className="absolute inset-0 size-full object-cover object-center"
        fill
        priority
        sizes="100vw"
        src={assets.servicesImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,6,10,0.58)_0%,rgba(19,10,15,0.54)_18%,rgba(20,8,17,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_right_center,rgba(91,9,101,0.22),transparent_28%)]" />
      <div
        ref={introRef}
        className="absolute left-4 top-10 z-20 flex max-w-[340px] flex-col items-start text-left sm:left-6 sm:top-12 sm:max-w-[420px] lg:left-10 lg:top-14 lg:max-w-[520px]"
      >
        <SectionTag className="block text-left text-[1.2rem] normal-case tracking-normal text-[#e3a054] sm:text-[1.38rem] lg:text-[1.48rem]">
          What do We Do?
        </SectionTag>
        <h2 className="mt-3 font-ibrand text-[2.15rem] leading-[1.04] text-white sm:mt-4 sm:text-[2.6rem] lg:mt-5 lg:text-[3rem]">
          <span className="block sm:whitespace-nowrap">We make trade and</span>
          <span className="mt-2 block sm:whitespace-nowrap">business simple.</span>
        </h2>
      </div>

      <div className="relative mx-auto h-full w-full max-w-[1440px] px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="relative mx-auto h-[calc(100vh-64px)] max-w-[680px] overflow-hidden sm:h-[calc(100vh-80px)] sm:max-w-[760px] lg:h-[calc(100vh-96px)] lg:max-w-[1040px] xl:max-w-[1120px]">
          <div
            ref={cardsTrackRef}
            className="relative mx-auto h-[1500px] max-w-[470px] sm:h-[1120px] sm:max-w-[540px] lg:h-[1600px] lg:max-w-[760px] xl:h-[1680px] xl:max-w-[860px]"
          >
            {serviceCards.map((card, index) => (
              <ServiceCard
                key={card.id}
                id={card.id}
                positionClassName={serviceCardPositions[index]}
                title={card.title}
                tone={card.tone}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
