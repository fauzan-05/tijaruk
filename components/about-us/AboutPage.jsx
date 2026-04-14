"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollTriggerRefresh } from "../animation/scrollTriggerRefresh";
import CoreValuesAccordion from "./CoreValuesAccordion";
import Footer from "../shares/Footer";
import Navbar from "../shares/Navbar";
import { aboutHero, coreValues, missionVision, whoWeAre, whyWeExist } from "./aboutData";

gsap.registerPlugin(ScrollTrigger);

function SectionEyebrow({ children }) {
  return (
    <p className="font-['Poppins',sans-serif] text-sm font-semibold uppercase tracking-[0.22em] text-[#e39b4d] sm:text-base">
      {children}
    </p>
  );
}

function RemoteImage({
  alt,
  className = "",
  revealGroup = "who",
  revealOrder,
  src,
  priority = false,
}) {
  const frameRevealProps = revealOrder
    ? {
        "data-reveal-order": revealOrder,
        [`data-${revealGroup}-frame`]: "",
      }
    : {};
  const imageRevealProps = revealOrder
    ? {
        "data-reveal-order": revealOrder,
        [`data-${revealGroup}-image`]: "",
      }
    : {};

  return (
    <div
      {...frameRevealProps}
      className={`relative overflow-hidden rounded-[14px] shadow-[0_24px_60px_rgba(34,0,37,0.12)] ${className}`}
    >
      <div {...imageRevealProps} className="absolute inset-0">
        <Image
          alt={alt}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 33vw"
          priority={priority}
          src={src}
        />
      </div>
    </div>
  );
}

function ValueCard({ image, title }) {
  return (
    <article className="overflow-hidden rounded-[10px] border border-[#d8d3cf] bg-white shadow-[0_16px_40px_rgba(37,16,44,0.06)]">
      <div className="h-44 overflow-hidden">
        <Image
          alt={title}
          className="h-full w-full object-cover"
          height={176}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={image}
          width={420}
        />
      </div>
      <div className="flex min-h-[108px] items-center justify-center px-5 py-6 text-center">
        <h3 className="font-ibrand text-[1.7rem] leading-[1.05] text-[#161616]">{title}</h3>
      </div>
    </article>
  );
}

export default function AboutPage() {
  const whoSectionRef = useRef(null);
  const whyHeadingRef = useRef(null);
  const whySectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!whoSectionRef.current || !whyHeadingRef.current || !whySectionRef.current) return;
    const page = whoSectionRef.current.closest("main");

    const ctx = gsap.context(() => {
      const createCurtainReveal = ({
        axis = "y",
        frameSelector,
        imageSelector,
        section,
        stagger = 0.46,
        start = "top 72%",
        trigger = section,
      }) => {
        const frames = gsap.utils
          .toArray(frameSelector, section)
          .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder));
        const images = gsap.utils
          .toArray(imageSelector, section)
          .sort((a, b) => Number(a.dataset.revealOrder) - Number(b.dataset.revealOrder));

        if (!images.length) return;

        const positionProp = axis === "x" ? "xPercent" : "yPercent";

        gsap.set(frames, {
          autoAlpha: 0,
          willChange: "opacity",
        });

        gsap.set(images, {
          autoAlpha: 1,
          force3D: true,
          scale: 1,
          transformOrigin: axis === "x" ? "left center" : "center top",
          willChange: "transform",
          [positionProp]: -105,
        });

        const tl = gsap.timeline({
          defaults: { duration: 0.74, ease: "power2.out" },
          onComplete: () => {
            gsap.set(frames, { clearProps: "willChange" });
            gsap.set(images, { clearProps: "willChange" });
          },
          onReverseComplete: () => {
            gsap.set(frames, { autoAlpha: 0 });
          },
          scrollTrigger: {
            trigger,
            start,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        images.forEach((image, index) => {
          const position = index * stagger;

          if (frames[index]) {
            tl.fromTo(
              frames[index],
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.01, ease: "none" },
              position
            );
          }

          tl.to(
            image,
            {
              force3D: true,
              [positionProp]: 0,
            },
            position
          );
        });
      };

      createCurtainReveal({
        frameSelector: "[data-who-frame]",
        imageSelector: "[data-who-image]",
        section: whoSectionRef.current,
      });

      createCurtainReveal({
        axis: "x",
        frameSelector: "[data-why-frame]",
        imageSelector: "[data-why-image]",
        section: whySectionRef.current,
        stagger: 0.5,
        start: "top 18%",
        trigger: whyHeadingRef.current,
      });

      ScrollTrigger.refresh();
    });

    const cleanupRefresh = createScrollTriggerRefresh(ScrollTrigger, page);

    return () => {
      cleanupRefresh();
      ctx.revert();
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#f5f5f5] text-[#151525]">
      <section
        className="relative isolate overflow-hidden bg-[#220025] text-white sm:pt-6 lg:h-screen lg:min-h-[760px]"
        id="about"
      >
        <Image
          alt=""
          className="absolute inset-0 size-full object-cover object-center opacity-45"
          fill
          priority
          sizes="100vw"
          src={aboutHero.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,0,37,0.66)_0%,rgba(34,0,37,0.74)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col px-4 sm:px-6 lg:px-10">
          <Navbar />

          <div className="grid flex-1 content-center gap-10 py-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(180px,0.35fr)] lg:items-center">
            <div className="w-full max-w-[980px] rounded-[24px] border border-white/20 bg-white/18 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.14)] backdrop-blur-[10px] sm:p-8 lg:p-10">
              <h1 className="font-ibrand text-[2.75rem] leading-[0.92] text-[#e39b4d] sm:text-[3.45rem] lg:text-[4.25rem]">
                {aboutHero.title}
              </h1>

              <div className="mt-10 space-y-5 font-['Poppins',sans-serif] text-[17px] font-medium leading-[1.7] text-white/92 sm:text-[18px] sm:leading-[1.75] lg:max-w-[720px]">
                {aboutHero.description.map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      <section ref={whoSectionRef} className="bg-white -mt-4 py-16 sm:-mt-6 sm:py-20 lg:-mt-8 lg:py-24">
        <div className="mx-auto mt-6 grid max-w-[1320px] gap-10 px-4 sm:px-6 lg:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.78fr)] lg:items-start lg:px-10">
          <div className="max-w-[620px]">
            <SectionEyebrow>{whoWeAre.eyebrow}</SectionEyebrow>
            <h4 className="mt-12 font-ibrand text-[1.4rem] leading-[1.02] text-[#5f0c66] sm:text-[1.9rem] lg:text-[2.2rem]">
              {whoWeAre.title}
            </h4>

            <div className="mt-6 space-y-4 font-['Poppins',sans-serif] text-[14px] leading-7 text-[#5a5a5a] sm:text-[15px] sm:leading-[1.8]">
              {whoWeAre.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <RemoteImage
              alt={whoWeAre.images[0].alt}
              className="h-[200px] sm:h-[220px] lg:h-[245px] lg:w-[82%] lg:justify-self-end lg:translate-x-[10%]"
              priority
              revealOrder={1}
              src={whoWeAre.images[0].src}
            />
            <RemoteImage
              alt={whoWeAre.images[1].alt}
              className="h-[200px] translate-y-4 sm:mt-10 sm:h-[220px] lg:h-[245px] lg:w-[82%] lg:justify-self-center lg:translate-y-24"
              revealOrder={3}
              src={whoWeAre.images[1].src}
            />
            <RemoteImage
              alt={whoWeAre.images[2].alt}
              className="h-[200px] sm:col-span-1 sm:h-[220px] lg:-mt-8 lg:h-[245px] lg:w-[82%] lg:justify-self-end lg:translate-x-[10%]"
              revealOrder={2}
              src={whoWeAre.images[2].src}
            />
          </div>
        </div>
      </section>

      <section ref={whySectionRef} className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.95fr)] lg:items-start">
            <div ref={whyHeadingRef} className="max-w-[500px]">
              <SectionEyebrow>{whyWeExist.eyebrow}</SectionEyebrow>
              <h2 className="mt-4 font-ibrand text-[2.1rem] leading-[0.95] text-[#5f0c66] sm:text-[2.7rem] lg:text-[3.3rem]">
                {whyWeExist.title}
              </h2>
            </div>

            <div className="space-y-5 font-['Poppins',sans-serif] text-[15px] leading-7 text-[#656565] sm:text-[17px] sm:leading-8">
              {whyWeExist.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            {whyWeExist.images.map((image, index) => (
              <RemoteImage
                key={image.src}
                alt={image.alt}
                className="h-[250px] sm:h-[320px] lg:h-[360px]"
                revealGroup="why"
                revealOrder={index + 1}
                src={image.src}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.8fr)]">
            <div className="space-y-10">
              {missionVision.map((item) => (
                <article key={item.title} className="max-w-[690px]">
                  <h2 className="font-ibrand text-[2rem] leading-none text-[#151525] sm:text-[2.6rem]">
                    {item.title}
                  </h2>
                  <div className="mt-5 space-y-4 font-['Poppins',sans-serif] text-[15px] leading-7 text-[#4e4e4e] sm:text-[17px] sm:leading-8">
                    {item.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-6 lg:space-y-8">
              {missionVision.map((item) => (
                <RemoteImage
                  key={item.image.src}
                  alt={item.image.alt}
                  className="h-[260px] sm:h-[340px] lg:h-[360px]"
                  src={item.image.src}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <h2 className="font-ibrand text-[2rem] font-medium leading-none text-[#5f0c66] sm:text-[2.45rem]">
            Our Core Values
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:hidden">
            {coreValues.map((value) => (
              <ValueCard key={value.title} image={value.image} title={value.title} />
            ))}
          </div>

          <CoreValuesAccordion values={coreValues} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
