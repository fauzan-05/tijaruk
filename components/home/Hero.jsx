import Image from "next/image";
import { assets } from "../data";
import Navbar from "../shares/Navbar";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[620px] overflow-hidden bg-[#1d0b26] sm:min-h-[680px] lg:h-screen lg:min-h-[560px]"
    >
      <Image
        alt=""
        className="absolute inset-0 size-full object-cover object-center"
        fill
        priority
        sizes="100vw"
        src={assets.heroImage}
      />
      <div className="absolute inset-0 bg-[#220025]/60" />

      <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] flex-col px-4 pb-8 pt-2 sm:min-h-[680px] sm:px-6 lg:h-full lg:min-h-[560px] lg:px-10 lg:pb-6 lg:pt-4">
        <Navbar />

        <div className="flex flex-1 items-start pt-16 sm:pt-20 lg:pt-[74px]">
          <div className="max-w-[820px]">
            <h1 className="font-['Manrope',sans-serif] text-[2.7rem] font-extrabold leading-[0.95] tracking-[0.02em] text-white sm:text-[3.55rem] lg:text-[4.15rem]">
              <span className="block">Tijaruk got your</span>
              <span className="mt-3 block">trade covered.</span>
            </h1>

            <div className="mt-5 w-full max-w-[620px] sm:relative sm:mt-6">
              <div className="hidden h-[154px] w-px bg-white/90 sm:absolute sm:left-0 sm:top-0 sm:block" />
              <div className="overflow-hidden rounded-sm shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:ml-5 sm:w-[260px]">
                <Image
                  alt="Trade partnership preview"
                  className="h-[145px] w-full object-cover"
                  height={145}
                  priority
                  sizes="(max-width: 640px) 100vw, 260px"
                  src={assets.aboutImage}
                  width={260}
                />
                </div>

              <p className="mt-5 max-w-[560px] font-['Poppins',sans-serif] text-[14px] leading-[21px] text-white sm:text-[16px] sm:leading-[24px]">
                Tijaruk - Your Complete Trade & Growth Partner. Grow your business with us - from
                sourcing to branding, globally.
              </p>

              <a
                className="mt-4 inline-flex h-[40px] min-w-[150px] items-center justify-center rounded-[1px] bg-[#5f0c66] px-7 font-['Poppins',sans-serif] text-[15px] font-semibold text-white transition hover:bg-[#7a0c82] sm:h-[44px] sm:min-w-[164px] sm:text-[16px]"
                href="#services"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
