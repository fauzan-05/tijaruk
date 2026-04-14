"use client";

import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { createScrollTriggerRefresh } from "../animation/scrollTriggerRefresh";
import Footer from "../shares/Footer";
import Navbar from "../shares/Navbar";
import ProductCard from "./ProductCard";

gsap.registerPlugin(ScrollTrigger);

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

function ShippingIcon() {
  return (
    <svg
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 7h10v8H3z" />
      <path d="M13 10h4l2 2v3h-6z" />
      <circle cx="8" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
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

export default function ProductDetailPage({ product, relatedProducts }) {
  const detailImages = [product.image, ...(product.galleryImages || [])];
  const [quantity, setQuantity] = useState(product.minimumOrder);
  const [unit, setUnit] = useState(product.units[0]);
  const [activeTab, setActiveTab] = useState("Product info");
  const [activeSourceMode, setActiveSourceMode] = useState(product.sourceModes[0]);
  const detailPinRef = useRef(null);
  const imageViewportRef = useRef(null);
  const imageTrackRef = useRef(null);
  const relatedRef = useRef(null);

  const tabContent =
    activeTab === "Product info" ? product.infoText : product.descriptionText;

  const scrollRelated = (direction) => {
    const node = relatedRef.current;

    if (!node) {
      return;
    }

    node.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    if (detailImages.length <= 1) {
      return undefined;
    }

    const pinSection = detailPinRef.current;
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {

      media.add("(min-width: 1024px)", () => {
        const imageViewport = imageViewportRef.current;
        const imageTrack = imageTrackRef.current;

        if (!pinSection || !imageViewport || !imageTrack) {
          return undefined;
        }

        const getScrollDistance = () =>
          Math.max(0, imageTrack.scrollHeight - imageViewport.offsetHeight);

        gsap.set(imageTrack, {
          y: 0,
          willChange: "transform",
        });

        const tween = gsap.to(imageTrack, {
          y: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            start: "top top+=32",
            end: () => `+=${getScrollDistance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(imageTrack, { clearProps: "transform,willChange" });
        };
      });

      ScrollTrigger.refresh();
    }, detailPinRef);

    const cleanupRefresh = createScrollTriggerRefresh(ScrollTrigger, pinSection);

    return () => {
      cleanupRefresh();
      media.revert();
      ctx.revert();
    };
  }, [detailImages.length, product.slug]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f5] text-[#161616]">
      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <Navbar />

          <div
            ref={detailPinRef}
            className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start"
          >
            <div
              ref={imageViewportRef}
              className="mx-auto w-full max-w-[560px] lg:mx-0 lg:h-[560px] lg:overflow-hidden"
            >
              <div ref={imageTrackRef} className="flex flex-col gap-5">
                {detailImages.map((image, index) => (
                  <div
                    key={image}
                    className="overflow-hidden rounded-[25px] shadow-[0_28px_70px_rgba(0,0,0,0.12)]"
                  >
                    <Image
                      alt={index === 0 ? product.name : `${product.name} view ${index + 1}`}
                      className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[560px]"
                      height={560}
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      src={image}
                      width={560}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:self-start lg:px-2 lg:pt-3">
              <div className="flex items-center gap-2 text-[12px] text-[#7b7b7b]">
                <StarRating />
                <span>{product.reviews} reviews</span>
              </div>

              <h1 className="mt-2 font-ibrand text-[2.15rem] leading-none text-[#373737] sm:text-[2.65rem]">
                {product.name}
              </h1>
              <p className="mt-2 font-['Poppins',sans-serif] text-[0.98rem] font-semibold text-[#2f2f2f]">
                ${product.detailPrice}
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {product.sourceModes.map((mode, index) => {
                  const isActive = activeSourceMode === mode;

                  return (
                    <button
                      key={mode}
                      className={`h-[46px] rounded-[28px] px-5 font-['Poppins',sans-serif] text-[13px] font-semibold transition ${
                        isActive
                          ? "bg-[#5f0c66] text-white"
                          : index === 1
                            ? "border-2 border-[#8b2ba5] bg-white text-[#6f2486]"
                            : "bg-[#fcdeff] text-[#5f0c66]"
                      }`}
                      type="button"
                      onClick={() => setActiveSourceMode(mode)}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 font-['Poppins',sans-serif] text-[14px] text-[#6b6b6b]">
                Enter minimum order upto {product.minimumOrder}
                {product.units[0]}
              </p>

              <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row">
                <div className="flex h-[48px] items-center rounded-[28px] bg-[#fcdeff] px-2.5 text-[#5f0c66]">
                  <button
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[20px] leading-none transition hover:bg-white/70"
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                  >
                    +
                  </button>
                  <span className="min-w-[34px] text-center font-['Poppins',sans-serif] text-[17px] text-black">
                    {quantity}
                  </span>
                  <button
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[20px] leading-none transition hover:bg-white/70"
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(product.minimumOrder, value - 1))
                    }
                  >
                    -
                  </button>
                </div>

                <label className="relative">
                  <select
                    className="h-[48px] appearance-none rounded-[28px] border-none bg-[#fcdeff] px-4 pr-9 font-['Poppins',sans-serif] text-[17px] text-black outline-none"
                    value={unit}
                    onChange={(event) => setUnit(event.target.value)}
                  >
                    {product.units.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#5f0c66]">
                    <ArrowIcon direction="right" />
                  </span>
                </label>

                <Link
                  className="inline-flex h-[48px] flex-1 items-center justify-center rounded-[28px] bg-[#5f0c66] px-6 font-['Poppins',sans-serif] text-[15px] font-semibold text-white transition hover:bg-[#74217a]"
                  href={`/sourcing#rfq`}
                >
                  Send RFQ
                </Link>
              </div>

              <p className="mt-4 text-[0px]">
                <span className="font-['Poppins',sans-serif] text-[16px] text-[#323232]">
                  Categories:
                </span>
                <span className="font-['Poppins',sans-serif] text-[16px] text-[#323232]">
                  {" "}
                </span>
                <span className="font-['Poppins',sans-serif] text-[16px] font-semibold text-[#191919]">
                  {product.categoriesLabel}
                </span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Product info", "Product description"].map((tab, index) => {
                  const isActive = activeTab === tab;

                  return (
                    <button
                      key={tab}
                      className={`h-[40px] rounded-[24px] px-5 font-['Poppins',sans-serif] text-[12px] font-medium transition ${
                        isActive
                          ? index === 0
                            ? "bg-[#5f0c66] text-white"
                            : "bg-[#e39b4d] text-white"
                          : "border border-[#d8cddd] bg-white text-[#5f0c66]"
                      }`}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 max-w-[620px] font-['Poppins',sans-serif] text-[15px] leading-[26px] text-[#6b6b6b]">
                {tabContent}
              </p>

              <div className="mt-5 flex flex-wrap gap-6 text-[#000000]">
                <div className="flex items-center gap-2 font-['Poppins',sans-serif] text-[15px]">
                  <ShippingIcon />
                  <span>{product.features[0]}</span>
                </div>
                <div className="flex items-center gap-2 font-['Poppins',sans-serif] text-[15px]">
                  <PaymentsIcon />
                  <span>{product.features[1]}</span>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-['Poppins',sans-serif] text-[2.2rem] font-semibold leading-none text-black sm:text-[3rem]">
                Related Products
              </h2>

              <div className="hidden items-center gap-3 sm:flex">
                <button
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#5f0c66] text-white transition hover:bg-[#74217a]"
                  type="button"
                  onClick={() => scrollRelated("left")}
                >
                  <ArrowIcon />
                </button>
                <button
                  className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#5f0c66] text-white transition hover:bg-[#74217a]"
                  type="button"
                  onClick={() => scrollRelated("right")}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>

            <div
              ref={relatedRef}
              className="mt-10 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.slug} className="min-w-[320px] flex-1 lg:min-w-0">
                  <ProductCard compact product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
