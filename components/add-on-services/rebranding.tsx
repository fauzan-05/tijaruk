// @ts-nocheck
"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Boxes,
  Globe2,
  PackageCheck,
  PenTool,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Footer from "../shares/Footer";
import Navbar from "../shares/Navbar";

const HERO_IMAGE =
  "https://www.figma.com/api/mcp/asset/0660c01b-4d13-4aaa-8590-2e769f0fb0f0";

const processSteps = [
  {
    id: "01",
    title: "Brief & Discovery",
    description:
      "We capture your brand vision, target audience, product specifications, and market context through a structured intake process.",
  },
  {
    id: "02",
    title: "Identity Design",
    description:
      "Our design team develops logo placements, label artwork, color palettes, and packaging concepts aligned to your brand positioning.",
  },
  {
    id: "03",
    title: "Approval & Production",
    description:
      "After sign-off on design proofs, we coordinate packaging production, print runs, and product labeling at scale.",
  },
  {
    id: "04",
    title: "Quality Check & Dispatch",
    description:
      "Pre-shipment inspection ensures brand consistency across every unit before products are dispatched to your warehouse or market.",
  },
];

const coreServices = [
  {
    id: "01",
    title: "Product Rebranding",
    description:
      "Full white-label transformation - apply your brand name, identity, and positioning to sourced products across any category.",
    icon: PenTool,
  },
  {
    id: "02",
    title: "Custom Packaging Design",
    description:
      "Retail boxes, pouches, tubes, cartons - designed to your specifications with print-ready files and production management included.",
    icon: PackageCheck,
  },
  {
    id: "03",
    title: "Label & Logo Integration",
    description:
      "Precision placement of brand marks, certification logos, barcodes, and regulatory labels across all product touchpoints.",
    icon: BadgeCheck,
  },
  {
    id: "04",
    title: "Private Brand Development",
    description:
      "Launch your own label from scratch - brand name ideation, trademark guidance, identity system, and complete brand guidelines.",
    icon: Sparkles,
  },
  {
    id: "05",
    title: "Brand Identity Enhancement",
    description:
      "Refresh and modernise existing brand assets - photography direction, colour systems, typography standards, and point-of-sale materials.",
    icon: TrendingUp,
  },
  {
    id: "06",
    title: "Market-Ready Product Solutions",
    description:
      "Compliance labelling, destination-market formatting, language localisation, and certifications to ensure shelf-readiness in any country.",
    icon: Globe2,
  },
];

const inquiryBenefits = [
  "Response within 24 business hours",
  "No-obligation, fully confidential",
  "Dedicated brand consultant assigned",
  "Free design concept on qualified RFQs",
  "Transparent, itemised pricing",
];

function RequiredLabel({ children }) {
  return (
    <label className="font-['Poppins',sans-serif] text-sm font-medium text-[#313131] sm:text-[15px]">
      {children} <span className="text-[#e39b4d]">*</span>
    </label>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="mt-2 h-12 w-full rounded-[5px] border-[2px] border-[#dadada] bg-white px-3 font-['Poppins',sans-serif] text-sm text-[#2b2b2b] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#5f0c66]"
    />
  );
}

function TextArea(props) {
  const { className = "", ...rest } = props;

  return (
    <textarea
      {...rest}
      className={`mt-2 min-h-[132px] w-full resize-y rounded-[5px] border-[2px] border-[#dadada] bg-white px-3 py-3 font-['Poppins',sans-serif] text-sm text-[#2b2b2b] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#5f0c66] ${className}`}
    />
  );
}

function SelectInput(props) {
  return (
    <select
      {...props}
      className="mt-2 h-12 w-full rounded-[5px] border-[2px] border-[#dadada] bg-white px-3 font-['Poppins',sans-serif] text-sm text-[#6c6c6c] outline-none transition focus:border-[#5f0c66]"
    />
  );
}

function SectionDivider({ title }) {
  return (
    <div className="flex items-center gap-4">
      <p className="shrink-0 font-['Poppins',sans-serif] text-[13px] font-medium uppercase tracking-[0.02em] text-[#848484] sm:text-base">
        {title}
      </p>
      <span className="h-px flex-1 bg-[#d1d1d1]" />
    </div>
  );
}

export default function RebrandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f5] text-[#161616]">
      <section className="px-4 pb-10 pt-3 sm:px-6 sm:pb-14 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Navbar />

          <div className="relative mt-2 h-[390px] overflow-hidden rounded-[12px] sm:mt-3 sm:h-[470px] lg:h-[549px]">
            <Image
              alt="Port cranes and cargo containers for rebranding services"
              className="h-full w-full object-cover"
              fill
              priority
              sizes="100vw"
              src={HERO_IMAGE}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,0,37,0.82)_0%,rgba(95,12,102,0.68)_46%,rgba(34,0,37,0.34)_100%)]" />

            <div className="relative flex h-full items-center px-6 sm:px-8 lg:px-[4rem]">
              <div className="max-w-[780px] translate-y-8 text-white sm:translate-y-10 lg:translate-y-12">
                <h1 className="font-ibrand text-[2.75rem] leading-[0.96] sm:text-[3.6rem] lg:text-[4rem]">
                  Transform Products
                  <span className="block">Into Your Own Brand</span>
                </h1>
                <p className="mt-5 max-w-[760px] font-['Poppins',sans-serif] text-[15px] leading-[1.65] text-white/95 sm:text-[18px] lg:text-[20px] lg:leading-[1.45]">
                  Transform existing products into your own brand identity with
                  professional rebranding and market-ready solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-16 lg:pb-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10">
          <div>
            <p className="font-['Poppins',sans-serif] text-sm font-medium text-[#5f0c66]">
              About the Service
            </p>
            <h2 className="mt-2 font-ibrand text-[2.2rem] leading-[0.95] text-black sm:text-[2.8rem] lg:text-[3.1rem]">
              Brand Identity
              <span className="block text-[#5f0c66]">Reinvented</span>
            </h2>
            <div className="mt-6 max-w-[680px] space-y-4 font-['Poppins',sans-serif] text-[14px] leading-[1.65] text-[#7c7c7c] sm:text-[15px]">
              <p>
                Rebranding is more than a new logo. It is a complete
                repositioning of your product in the market - from the visual
                language on the packaging to the story told at the point of
                sale. We help businesses take existing products and elevate them
                into coherent, confident brand identities that resonate with
                their target customers.
              </p>
              <p>
                Whether you&apos;re entering a new market, consolidating a
                product line, or launching a private label for the first time,
                our end-to-end rebranding service covers every detail from
                artwork and packaging to regulatory compliance and logistics.
              </p>
            </div>
          </div>

          <div className="space-y-0 lg:pt-10">
            {processSteps.map((step, index) => (
              <article
                key={step.id}
                className={`grid grid-cols-[40px_1fr] gap-3 py-4 ${
                  index === 0 ? "pt-0" : "border-t border-[#d8d8d8]"
                }`}
              >
                <p className="font-['Poppins',sans-serif] text-[1.5rem] font-medium leading-none text-[#5f0c66] sm:text-[1.75rem]">
                  {step.id}
                </p>
                <div>
                  <h3 className="font-['Poppins',sans-serif] text-lg font-medium text-black sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[560px] font-['Poppins',sans-serif] text-[13px] leading-[1.6] text-[#717171] sm:text-[14px]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <p className="font-['Poppins',sans-serif] text-base font-medium text-[#5f0c66] sm:text-2xl">
            Core Services
          </p>
          <h2 className="mt-2 font-['Poppins',sans-serif] text-[2.25rem] font-medium leading-tight text-black sm:text-[3rem] lg:text-[3.1rem]">
            What we do best
          </h2>

          <div className="mt-8 grid overflow-hidden rounded-[5px] border border-[#d9d9d9] bg-[#f5f5f5] sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  className="min-h-[235px] border-b border-[#d9d9d9] p-6 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-[276px] lg:p-7 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                >
                  <p className="font-['Poppins',sans-serif] text-[2rem] font-medium leading-none text-black">
                    {service.id}
                  </p>
                  <div className="mt-5 flex h-[57px] w-[59px] items-center justify-center rounded-[5px] bg-[#5f0c66] text-white">
                    <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 font-['Poppins',sans-serif] text-xl font-medium leading-snug text-black">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-['Poppins',sans-serif] text-[15px] leading-[1.65] text-[#878787]">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 lg:pb-32">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-10">
          <aside className="lg:pt-4">
            <p className="font-['Poppins',sans-serif] text-sm font-semibold text-[#5f0c66] sm:text-xl">
              Product Inquiry
            </p>
            <h2 className="mt-3 font-['Poppins',sans-serif] text-[2.45rem] font-semibold leading-[1.08] text-[#2b2b2b] sm:text-[3rem]">
              Start your
              <span className="block text-[#e39b4d]">Rebranding</span>
              <span className="block">Journey</span>
            </h2>
            <p className="mt-6 max-w-[470px] font-['Poppins',sans-serif] text-[16px] leading-[1.7] text-black">
              Complete the form with your product and brand requirements. Our
              specialists will reply with a tailored proposal within one
              business day.
            </p>

            <ul className="mt-8 space-y-3 font-['Poppins',sans-serif] text-[16px] leading-snug text-black">
              {inquiryBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-[#5f0c66]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 h-px max-w-[440px] bg-[#cfcfcf]" />
          </aside>

          <form
            action="#"
            className="rounded-[30px] border border-[#dadada] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.04)] sm:p-8 lg:p-12"
          >
            <h3 className="font-ibrand text-[2.4rem] leading-none text-black sm:text-[2.85rem]">
              Submit Your RFQ
            </h3>
            <p className="mt-3 font-['Poppins',sans-serif] text-[15px] leading-[1.6] text-[#868686] sm:text-xl">
              Fields marked * are required. All details are kept strictly
              confidential.
            </p>

            <div className="mt-8">
              <SectionDivider title="Product Information" />
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <RequiredLabel>Product Category</RequiredLabel>
                <SelectInput defaultValue="">
                  <option value="" disabled>
                    Select a Category
                  </option>
                  <option>Food & Grocery</option>
                  <option>Consumer Goods</option>
                  <option>Industrial Products</option>
                  <option>Health & Beauty</option>
                </SelectInput>
              </div>
              <div>
                <RequiredLabel>Product Name</RequiredLabel>
                <TextInput type="text" />
              </div>
              <div>
                <RequiredLabel>Required Quantity</RequiredLabel>
                <TextInput type="text" />
              </div>
              <div>
                <RequiredLabel>Target Country / Delivery Location</RequiredLabel>
                <TextInput type="text" />
              </div>
            </div>

            <div className="mt-6">
              <RequiredLabel>Product Description</RequiredLabel>
              <TextArea />
            </div>

            <div className="mt-6">
              <RequiredLabel>Preferred Packaging Details</RequiredLabel>
              <TextArea className="min-h-[180px]" />
            </div>

            <div className="mt-8">
              <SectionDivider title="Your Contact Details" />
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <RequiredLabel>Company Name</RequiredLabel>
                <TextInput type="text" />
              </div>
              <div>
                <RequiredLabel>Contact Person Name</RequiredLabel>
                <TextInput type="text" />
              </div>
              <div>
                <RequiredLabel>Required Quantity</RequiredLabel>
                <TextInput type="text" />
              </div>
              <div>
                <RequiredLabel>Phone Number</RequiredLabel>
                <TextInput type="tel" />
              </div>
            </div>

            <div className="mt-6">
              <RequiredLabel>Additional Requirements</RequiredLabel>
              <TextArea />
            </div>

            <button
              className="mt-8 h-[60px] w-full rounded-[5px] bg-[#5f0c66] font-['Poppins',sans-serif] text-lg font-semibold text-white shadow-[4px_4px_9px_2px_rgba(0,0,0,0.25)] transition hover:bg-[#76117e]"
              type="submit"
            >
              Send RFQ
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
