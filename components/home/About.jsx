import Image from "next/image";
import { assets } from "../data";
import { ArrowIcon, SectionTag } from "../ui";

export default function About() {
  return (
    <section id="about" className="bg-[#f7f3ef] py-12 sm:py-14 lg:h-screen lg:py-0">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-6 lg:h-screen lg:grid-cols-[minmax(320px,0.88fr)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-10">
        <div>
          <SectionTag className="-translate-y-2 flex items-center gap-4 font-ibrand text-[1.65rem] font-medium normal-case tracking-[0.04em] !text-[#5f0c66] sm:text-[1.95rem] lg:text-[2.05rem]">
            <span className="size-[14px] rounded-full bg-[#5f0c66] sm:size-4" />
            <span className="translate-x-4">About Tijaruk</span>
          </SectionTag>
          <div className="mt-4 overflow-hidden rounded-[12px] shadow-[0_24px_55px_rgba(0,0,0,0.12)] lg:max-w-[520px]">
            <Image
              alt="Team working together"
              className="h-[410px] w-full object-cover"
              height={410}
              sizes="(max-width: 1024px) 100vw, 520px"
              src={assets.aboutImage}
              width={520}
            />
          </div>
        </div>

        <div className="flex w-full max-w-[620px] flex-col items-start justify-center lg:justify-self-start">
          <h2 className="w-full font-ibrand text-[2rem] font-medium leading-[1.12] text-[#333333] sm:text-[2.55rem] lg:text-[2.9rem]">
            <span className="block">We are your complete</span>
            <span className="mt-2 block">trade and growth partner.</span>
          </h2>
          <div className="mt-5 w-full font-['Poppins',sans-serif] text-[14px] leading-7 text-[#696969] sm:text-[15px] sm:leading-8">
            <p>
              Tijaruk connects Saudi Arabia-based wholesalers, suppliers, and retailers to global
              markets through trusted partnerships, transparent pricing, and complete business
              support. Our vision is to be the most trusted digital bridge between Saudi Arabia
              and the world.
            </p>
          </div>
          <a
            className="mt-5 inline-flex items-center gap-3 self-start rounded-md bg-[#5f0c66] px-9 py-4 font-['Poppins',sans-serif] text-base font-semibold text-white transition hover:bg-[#7a0c82]"
            href="/about"
          >
            Learn More
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
