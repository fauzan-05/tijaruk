"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function StarRating() {
  return (
    <div className="flex items-center gap-1 text-[#f3a638]">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className="h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="m10 1.8 2.5 5.1 5.6.8-4 3.9.9 5.5-5-2.7-5 2.7.9-5.5-4-3.9 5.6-.8L10 1.8Z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, compact = false, priority = false }) {
  const baseImageRef = useRef(null);
  const hoverImageRef = useRef(null);
  const hoverTimelineRef = useRef(null);
  const hoverImage =
    product.slug === "rice" ? product.hoverImage || "/products/rice02.png?v=3" : product.hoverImage;
  const hasHoverImage = Boolean(hoverImage);
  const imageClass = `w-full object-cover ${compact ? "h-[200px] sm:h-[220px] lg:h-[240px]" : "h-[240px] sm:h-[285px] lg:h-[300px]"}`;

  useEffect(() => {
    if (!hoverImage) {
      return undefined;
    }

    const preloadImage = window.document.createElement("img");
    preloadImage.decoding = "async";
    preloadImage.src = hoverImage;

    return () => {
      preloadImage.src = "";
    };
  }, [hoverImage]);

  useEffect(() => {
    return () => {
      hoverTimelineRef.current?.kill();
    };
  }, []);

  const playImageFade = () => {
    if (!hasHoverImage || !baseImageRef.current || !hoverImageRef.current) {
      return;
    }

    hoverTimelineRef.current?.kill();

    hoverTimelineRef.current = gsap.timeline({
      defaults: {
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      },
    });

    hoverTimelineRef.current
      .to(baseImageRef.current, { scale: 1.04 }, 0)
      .to(hoverImageRef.current, { autoAlpha: 1 }, 0);
  };

  const resetImageFade = () => {
    if (!hasHoverImage || !baseImageRef.current || !hoverImageRef.current) {
      return;
    }

    hoverTimelineRef.current?.kill();

    hoverTimelineRef.current = gsap.timeline({
      defaults: {
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: true,
      },
    });

    hoverTimelineRef.current
      .to(baseImageRef.current, { scale: 1 }, 0)
      .to(hoverImageRef.current, { autoAlpha: 0 }, 0);
  };

  return (
    <article
      className="group rounded-[14px] border border-[#dfdddd] bg-white p-3 shadow-[0_4px_18px_rgba(0,0,0,0.12)]"
      onPointerEnter={playImageFade}
      onPointerLeave={resetImageFade}
    >
      <div
        className="relative overflow-hidden rounded-[12px]"
      >
        <div ref={baseImageRef}>
          <Image
            alt={product.name}
            className={imageClass}
            height={331}
            loading={priority ? "eager" : undefined}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={product.image}
            width={400}
          />
        </div>

        {hasHoverImage ? (
          <img
            ref={hoverImageRef}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-10 opacity-0 ${imageClass}`}
            decoding="async"
            loading="eager"
            src={hoverImage}
          />
        ) : null}
      </div>

      <div className={`px-2 text-center ${compact ? "pb-1 pt-3" : "pb-1 pt-4"}`}>
        <h2 className={`font-ibrand leading-none text-[#373737] ${compact ? "text-[1.1rem] sm:text-[1.2rem]" : "text-[1.22rem] sm:text-[1.35rem]"}`}>
          {product.name}
        </h2>

        <p className={`mx-auto max-w-[320px] font-['Poppins',sans-serif] text-[#8a8888] ${compact ? "mt-2 text-[10px] leading-[16px] sm:text-[11px]" : "mt-3 text-[11px] leading-[17px] sm:text-[12px] sm:leading-[18px]"}`}>
          {product.description}
        </p>

        <div className={`flex items-center justify-center gap-2 text-[#808080] ${compact ? "mt-2 text-[10px] sm:text-[11px]" : "mt-3 text-[11px] sm:text-[12px]"}`}>
          <StarRating />
          <span>{product.reviews} reviews</span>
        </div>

        <div className={`flex items-center justify-center ${compact ? "mt-3" : "mt-4"}`}>
          <Link
            className={`inline-flex items-center justify-center gap-4 rounded-[999px] bg-[#5f0c66] px-5 font-['Poppins',sans-serif] font-semibold text-white transition hover:bg-[#74217a] ${compact ? "h-[36px] min-w-[190px] text-[10px] sm:text-[11px]" : "h-[38px] min-w-[206px] text-[11px] sm:h-[40px] sm:text-[12px]"}`}
            href={`/products/${product.slug}`}
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white" />
              Order now
            </span>
            <span>${product.price.replace(" USD", "")} USD</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
