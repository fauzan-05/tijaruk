// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "../shares/Footer";
import Navbar from "../shares/Navbar";
import { productCards } from "./productsData";

const HERO_IMAGE = "/international/hero.webp";
const WHITE_LABELING_IMAGE = "/international/white-labeling.webp";
const LOGISTICS_IMAGE = "/international/rebranding.webp";

const INTERNATIONAL_PRODUCTS = ["vegetable-oil", "spices", "rice"];
const PRODUCTS_PER_PAGE = 3;

const INTERNATIONAL_PRODUCT_IMAGES = {
  "vegetable-oil": "/international/vegetable-oil.webp",
  spices: "/international/spices.webp",
  rice: "/international/rice.webp",
};

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

function ServiceTile({ image, label, href = "/sourcing#rfq", primary = false }) {
  return (
    <article className="group relative min-h-[270px] overflow-hidden rounded-[3px] bg-[#d9d9d9] sm:min-h-[330px] lg:min-h-[428px]">
      <Image
        alt={label}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        fill
        loading="lazy"
        sizes="(max-width: 767px) 100vw, 50vw"
        src={image}
      />
      {primary ? (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="absolute inset-0 bg-black/60" />
          <Link
            className="absolute bottom-6 left-5 flex translate-y-4 items-center transition-all duration-500 hover:scale-[1.02] group-hover:translate-y-0"
            href={href}
          >
            <div className="flex h-[56px] items-center rounded-l-[3px] rounded-r-[100px] border-l-[16px] border-[#5f0c66] bg-white pl-4 pr-10 font-['Poppins',sans-serif] text-[1.25rem] font-medium tracking-tight leading-none text-[#5f0c66] shadow-[0_10px_28px_rgba(0,0,0,0.18)] sm:h-[64px] sm:pl-5 sm:pr-14 sm:text-[1.4rem]">
              {label}
            </div>
            <div className="relative z-10 -ml-10 flex h-[46px] w-[54px] items-center justify-center rounded-l-[3px] rounded-r-[100px] bg-[#5f0c66] text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] sm:h-[52px] sm:w-[60px]">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m0 0l-6-6m6 6l-6 6" />
              </svg>
            </div>
          </Link>
        </div>
      ) : null}
    </article>
  );
}

function ProductCard({ product }) {
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
      className="group rounded-[14px] bg-white p-3 shadow-[0_4px_18px_rgba(0,0,0,0.18)] sm:p-4"
      onPointerEnter={playImageFade}
      onPointerLeave={resetImageFade}
    >
      <div className="relative overflow-hidden rounded-[12px] bg-gray-100">
        <Image
          ref={baseImageRef}
          alt={product.name}
          className="h-[220px] w-full object-cover sm:h-[250px] lg:h-[331px]"
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
            className="pointer-events-none absolute inset-0 z-10 h-[220px] w-full object-cover opacity-0 sm:h-[250px] lg:h-[331px]"
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

export default function InternationalPage() {
  const internationalProducts = useMemo(() => {
    const baseProducts = INTERNATIONAL_PRODUCTS.map((slug) =>
      productCards.find((product) => product.slug === slug)
    )
      .filter(Boolean)
      .map((product) => ({
        ...product,
        image: INTERNATIONAL_PRODUCT_IMAGES[product.slug] || product.image,
      }));

    return Array(5).fill(baseProducts).flat();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(internationalProducts.length / PRODUCTS_PER_PAGE)
  );

  const visibleProducts = internationalProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    const nextPage = Math.min(totalPages, Math.max(1, page));
    setCurrentPage(nextPage);

    const element = document.getElementById("international-products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f5] text-[#161616]">
      <section className="px-4 pb-10 pt-3 sm:px-6 sm:pb-14 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Navbar />

          <div className="relative mt-2 h-[400px] overflow-hidden rounded-[12px] sm:mt-3 sm:h-[480px] lg:mt-3 lg:h-[549px]">
            <Image
              alt="International shipping vessel"
              className="h-full w-full object-cover"
              fill
              priority
              sizes="100vw"
              src={HERO_IMAGE}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,0,37,0.78)_0%,rgba(95,12,102,0.66)_48%,rgba(34,0,37,0.24)_100%)]" />

            <div className="relative flex h-full items-center px-6 sm:px-8 lg:px-[4rem]">
              <div className="max-w-[890px] translate-y-8 text-white sm:translate-y-10 lg:translate-y-12">
                <h1 className="font-ibrand text-[2.6rem] leading-[0.92] sm:text-[3.2rem] lg:text-[3.95rem]">
                  International
                </h1>

                <div className="mt-4 space-y-5 font-['Poppins',sans-serif] text-[15px] leading-[1.55] text-white/95 sm:text-[16px] sm:leading-[1.6] lg:max-w-[928px] lg:text-[20px] lg:leading-[1.3]">
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

      <section className="pb-8 sm:pb-10 lg:pb-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <h2 className="font-ibrand text-[2.35rem] leading-none text-black sm:text-[2.9rem] lg:text-[3.2rem]">
            Add-on Services
          </h2>

          <div className="mt-7 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ServiceTile
              image={WHITE_LABELING_IMAGE}
              label="White-labeling"
              href="/add-on-services/while"
              primary
            />
            <ServiceTile
              image={LOGISTICS_IMAGE}
              label="Rebranding"
              href="/add-on-services/rebranding"
              primary
            />
          </div>
        </div>
      </section>

      <section id="international-products" className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionHeading />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visibleProducts.map((product, index) => (
              <ProductCard key={`${product.slug}-${index}`} product={product} />
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
