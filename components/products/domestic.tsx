// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "../shares/Footer";
import Navbar from "../shares/Navbar";
import { productCards } from "./productsData";

const HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/c4fb49cf-0f5e-4924-957f-3f0fb7c6e2bf";

const DOMESTIC_PRODUCTS = ["vegetable-oil", "spices", "rice"];
const PRODUCTS_PER_PAGE = 3;

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

function ArrowIcon({ direction = "left" }) {
  return (
    <svg
      className={`h-4 w-4 ${direction === "right" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function DomesticProductCard({ product }) {
  const baseImageRef = useRef(null);
  const hoverImageRef = useRef(null);
  const hoverTimelineRef = useRef(null);
  const hoverImage = product.slug === "rice" ? product.hoverImage || "/products/rice02.png?v=3" : product.hoverImage;
  const hasHoverImage = Boolean(hoverImage);

  useEffect(() => {
    if (!hoverImage) return undefined;
    const preloadImage = window.document.createElement("img");
    preloadImage.decoding = "async";
    preloadImage.src = hoverImage;
    return () => { preloadImage.src = ""; };
  }, [hoverImage]);

  useEffect(() => {
    return () => { hoverTimelineRef.current?.kill(); };
  }, []);

  const playImageFade = () => {
    if (!hasHoverImage || !baseImageRef.current || !hoverImageRef.current) return;
    hoverTimelineRef.current?.kill();
    hoverTimelineRef.current = gsap.timeline({ defaults: { duration: 0.45, ease: "power3.out", overwrite: true } });
    hoverTimelineRef.current.to(baseImageRef.current, { scale: 1.04 }, 0).to(hoverImageRef.current, { autoAlpha: 1 }, 0);
  };

  const resetImageFade = () => {
    if (!hasHoverImage || !baseImageRef.current || !hoverImageRef.current) return;
    hoverTimelineRef.current?.kill();
    hoverTimelineRef.current = gsap.timeline({ defaults: { duration: 0.4, ease: "power3.inOut", overwrite: true } });
    hoverTimelineRef.current.to(baseImageRef.current, { scale: 1 }, 0).to(hoverImageRef.current, { autoAlpha: 0 }, 0);
  };

  return (
    <article 
      className="group rounded-[16px] bg-white p-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-4"
      onPointerEnter={playImageFade}
      onPointerLeave={resetImageFade}
    >
      <div className="relative overflow-hidden rounded-[12px] bg-gray-100">
        <Image
          ref={baseImageRef}
          alt={product.name}
          className="h-[220px] w-full object-cover sm:h-[250px] lg:h-[260px]"
          height={331}
          loading="lazy"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"
          src={product.image}
          width={400}
        />
        
        {hasHoverImage ? (
          <img
            ref={hoverImageRef}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 h-[220px] w-full object-cover opacity-0 sm:h-[250px] lg:h-[260px]"
            decoding="async"
            loading="lazy"
            src={hoverImage}
          />
        ) : null}
      </div>

      <div className="px-2 pb-2 pt-4 text-center">
        <h2 className="font-['Poppins',sans-serif] text-[14px] font-bold text-[#333] sm:text-[15px]">
          {product.name.toUpperCase()}
        </h2>

        <p className="mx-auto mt-2 max-w-[320px] font-['Poppins',sans-serif] text-[12px] leading-[1.5] text-[#8a8888] sm:text-[13px]">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#808080] sm:text-[13px]">
          <StarRating />
          <span>{product.reviews} reviews</span>
        </div>

        <div className="mt-5 flex justify-center">
          <Link
            className="relative inline-flex h-[42px] w-full max-w-[260px] items-center justify-center rounded-[999px] bg-[#5f0c66] font-['Poppins',sans-serif] text-[13px] font-medium text-white transition hover:bg-[#7a1d84]"
            href="/sourcing#rfq"
          >
            <span className="absolute left-5 h-1.5 w-1.5 rounded-full bg-white" />
            <span>Send RFQ</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SectionHeading() {
  return (
    <div className="inline-flex flex-col items-start">
      <h2 className="font-ibrand text-[2rem] leading-none text-[#5f0c66] sm:text-[2.35rem]">
        Products
      </h2>
      <div className="relative mt-2 flex w-full items-center">
        <span className="h-[4px] w-full rounded-full bg-[#5f0c66]" />
        <span className="absolute -right-1 h-[10px] w-[10px] rounded-full bg-[#5f0c66]" />
      </div>
    </div>
  );
}

export default function DomesticPage() {
  const domesticProducts = useMemo(() => {
    const baseProducts = DOMESTIC_PRODUCTS.map((slug) =>
      productCards.find((product) => product.slug === slug)
    ).filter(Boolean);
    
    // Duplicate 5 times to show 5 pages in pagination
    return Array(5).fill(baseProducts).flat();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(domesticProducts.length / PRODUCTS_PER_PAGE)
  );

  const visibleProducts = domesticProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    const nextPage = Math.min(totalPages, Math.max(1, page));
    setCurrentPage(nextPage);
    
    // Smooth scroll to top of products section
    const element = document.getElementById("products-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f5] text-[#161616]">
      <section className="px-4 pb-12 pt-3 sm:px-6 sm:pb-16 lg:px-10 lg:pt-3">
        <div className="mx-auto max-w-[1440px]">
          <Navbar />

          <div className="relative mt-2 h-[400px] overflow-hidden rounded-[12px] sm:mt-3 sm:h-[480px] lg:mt-3 lg:h-[549px]">
            <div className="absolute inset-0">
              <Image
                alt="Domestic sourcing"
                className="h-full w-full object-cover"
                fill
                loading="lazy"
                sizes="100vw"
                src={HERO_IMAGE}
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,0,37,0.74)_0%,rgba(95,12,102,0.64)_42%,rgba(34,0,37,0.2)_100%)]" />

            <div className="relative flex h-full items-center px-6 sm:px-8 lg:px-[4rem]">
              <div className="max-w-[820px] translate-y-8 text-white sm:translate-y-10 lg:translate-y-12">
                <h1 className="font-ibrand text-[2.6rem] leading-[0.92] sm:text-[3.2rem] lg:text-[3.95rem]">
                  Domestic
                </h1>

                <div className="mt-4 space-y-5 font-['Poppins',sans-serif] text-[15px] leading-[1.55] text-white/95 sm:text-[16px] sm:leading-[1.6] lg:max-w-[816px] lg:text-[20px] lg:leading-[1.3]">
                  <p>
                    At Tijaruk, we empower Saudi businesses, entrepreneurs, and
                    global partners to thrive in today&apos;s fast-moving trade
                    environment. From importing and exporting to business setup,
                    branding, and automation, we provide end-to-end support
                    designed to make every stage of your journey smoother.
                  </p>
                  <p>
                    Whether you are starting fresh, scaling your operations, or
                    taking your products global, our team is here to guide you
                    with trusted expertise and personalized solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products-section" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionHeading />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <DomesticProductCard key={`${product.slug}-${index}`} product={product} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-[6px] bg-white px-2 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <button
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] text-[#6a1472] transition hover:bg-[#f4ecf6] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPage === 1}
                type="button"
                onClick={() => goToPage(currentPage - 1)}
              >
                <ArrowIcon />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;

                return (
                  <button
                    key={page}
                    aria-current={isActive ? "page" : undefined}
                    className={`h-9 min-w-[38px] rounded-[6px] px-3 font-['Poppins',sans-serif] text-sm transition ${
                      isActive
                        ? "bg-[#5f0c66] text-white shadow-[3px_3px_7px_rgba(0,0,0,0.18)]"
                        : "bg-[#e9e9e9] text-[#5f0c66] hover:bg-[#ddd6df]"
                    }`}
                    type="button"
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-[6px] text-[#6a1472] transition hover:bg-[#f4ecf6] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPage === totalPages}
                type="button"
                onClick={() => goToPage(currentPage + 1)}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
