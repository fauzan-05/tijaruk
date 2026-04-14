"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { assets, navItems } from "../data";
import { UserIcon } from "../ui";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const isContactPage = normalizedPath === "/contact";

  const isActiveLink = (href) => {
    if (href === "/") {
      return normalizedPath === "/";
    }

    return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
  };

  const navigateWithPreloader = (href) => (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (isActiveLink(href)) {
      setIsMenuOpen(false);
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);
    window.dispatchEvent(new Event("tijaruk:show-preloader"));

    window.setTimeout(() => {
      router.push(href);
    }, 650);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const prefetchTargets = new Set(navItems.map((item) => item.href));
    prefetchTargets.add("/contact");

    prefetchTargets.forEach((href) => {
      router.prefetch(href);
    });
  }, [router]);

  const navbar = (
    <div className="fixed left-0 right-0 top-2 z-[2147483646] mx-auto w-full max-w-[1440px] px-4 py-1 sm:px-6 lg:px-10">
      <div className="flex items-center gap-3">
        <header className="relative z-[2147483646] w-full rounded-[6px] bg-[#5f0c66] px-4 py-1 shadow-[0_16px_45px_rgba(0,0,0,0.18)] sm:px-5 lg:px-7">
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <Link href="/" prefetch onClick={navigateWithPreloader("/")}>
                <img
                  alt="Tijaruk"
                  className="h-10 max-w-[72px] object-contain sm:h-10 sm:max-w-[84px]"
                  loading="eager"
                  src={assets.logo}
                />
              </Link>
            </div>

            <nav className="hidden flex-1 items-center justify-center gap-x-6 gap-y-3 font-['Poppins',sans-serif] text-sm font-medium text-white/90 sm:text-base lg:flex lg:gap-x-8">
              {navItems.map((item) => {
                const isActive = isActiveLink(item.href);

                return (
                  <Link
                    key={item.label}
                    className="group relative inline-flex h-8 items-center justify-center leading-none text-white/90 transition hover:text-white"
                    href={item.href}
                    prefetch
                    onClick={navigateWithPreloader(item.href)}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-[#e39b4d] transition-all duration-300 ease-out ${
                        isActive ? "w-11" : "w-0 group-hover:w-11"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <Link
                className={`inline-flex h-8 items-center justify-center rounded-[5px] px-4 font-['Poppins',sans-serif] text-sm font-semibold leading-none transition ${
                  isContactPage
                    ? "bg-[#f5d4a8] text-[#5f0c66]"
                    : "bg-white text-[#5f0c66] hover:bg-[#f5d4a8]"
                }`}
                href="/contact"
                prefetch
                onClick={navigateWithPreloader("/contact")}
              >
                Contact Us
              </Link>
            </div>

            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-[5px] text-white transition hover:bg-white/10 lg:hidden"
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </button>
          </div>

          {isMenuOpen ? (
            <div className="border-t border-white/10 pt-3 lg:hidden">
              <nav className="flex flex-col gap-2 font-['Poppins',sans-serif] text-sm font-medium text-white/90">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="rounded-[5px] px-2 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                    href={item.href}
                    prefetch
                    onClick={navigateWithPreloader(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  className="mt-2 inline-flex h-10 items-center justify-center rounded-[5px] bg-white px-4 font-['Poppins',sans-serif] text-sm font-semibold leading-none text-[#5f0c66] transition hover:bg-[#f5d4a8]"
                  href="/contact"
                  prefetch
                  onClick={navigateWithPreloader("/contact")}
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          ) : null}
        </header>

        <div className="hidden size-11 shrink-0 items-center justify-center rounded-full bg-[#5f0c66] text-white ring-1 ring-white/15 sm:flex">
          <UserIcon />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMounted ? createPortal(navbar, document.body) : null}
      <div aria-hidden="true" className="h-[54px] sm:h-[56px]" />
    </>
  );
}
