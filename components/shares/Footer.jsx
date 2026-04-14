import Link from "next/link";
import Image from "next/image";
import { assets, exploreLinks, socialLinks } from "../data";

export default function Footer() {
  return (
    <footer className="bg-[#5f0c66] pb-24 pt-24 text-white">
      <div className="mx-auto grid max-w-[1444px] grid-cols-2 gap-x-8 gap-y-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.75fr_0.75fr] lg:px-10">
        <div className="col-span-2 lg:col-span-1 lg:pl-10">
          <div className="relative -top-7 inline-block">
            <Image
              alt="Tijaruk"
              className="h-auto w-[96px]"
              height={48}
              sizes="96px"
              src={assets.logo}
              width={96}
            />
          </div>
          <p className="relative -top-3 max-w-none font-['Poppins',sans-serif] text-sm leading-6 text-white/80">
            <span className="block whitespace-nowrap">With Tijaruk, your trade and business journey</span> 
            <span className="block">moves forward into a new beginning.</span>
          </p>
          <form className="mt-20 flex max-w-md flex-col gap-3 sm:flex-row" action="#">
            <input
              className="h-14 flex-1 rounded-[6px] border border-white/20 bg-transparent px-5 text-base text-white outline-none placeholder:text-white/55 focus:border-[#e39b4d] sm:h-12 sm:px-4 sm:text-sm"
              placeholder="E-mail address"
              type="email"
            />
            <button
              className="h-14 rounded-[6px] bg-[#e39b4d] px-7 text-base font-semibold text-[#4d0d54] transition hover:bg-[#f0b163] sm:h-12 sm:px-6 sm:text-sm"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="relative lg:left-64">
          <div className="inline-block min-w-[120px]">
            <p className="whitespace-nowrap font-['Poppins',sans-serif] text-xl font-semibold text-[#e39b4d]">
              Follow Us
            </p>
            <ul className="mt-3 space-y-1 font-['Poppins',sans-serif] text-white/85">
              {socialLinks.map((item) => (
                <li key={item}>
                  <a className="transition hover:text-white" href="#home">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:pl-24">
            <p className="font-['Poppins',sans-serif] text-xl font-semibold text-[#e39b4d]">Explore</p>
          <ul className="mt-2 space-y-1 font-['Poppins',sans-serif] text-white/85">
            {exploreLinks.map((item) => (
              <li key={item.label}>
                <Link className="transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
