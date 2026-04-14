"use client";

import { useState } from "react";

const tabs = ["Domestic", "International"];

export default function SourcingRFQForm() {
  const [mode, setMode] = useState("Domestic");

  return (
    <form
      action="#"
      className="mx-auto w-full max-w-[820px] rounded-[16px] bg-white p-5 shadow-[0_28px_80px_rgba(36,0,42,0.22)] sm:p-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="mx-auto flex w-full max-w-[290px] rounded-[8px] bg-[#f1f2f6] p-1">
        {tabs.map((tab) => {
          const isActive = mode === tab;

          return (
            <button
              key={tab}
              className={`flex-1 rounded-[6px] px-4 py-2.5 font-['Poppins',sans-serif] text-sm font-semibold transition ${
                isActive ? "bg-[#5f0c66] text-white" : "text-[#2d2d2d]"
              }`}
              type="button"
              onClick={() => setMode(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-2 block font-['Poppins',sans-serif] text-sm text-[#1d1d1d]">
            Product/Service
          </span>
          <textarea
            className="h-28 w-full resize-none rounded-[8px] border border-[#cfcfcf] px-4 py-3 font-['Poppins',sans-serif] text-sm text-[#202020] outline-none focus:border-[#5f0c66]"
            placeholder="Describe the product you need..."
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-['Poppins',sans-serif] text-sm text-[#1d1d1d]">
            Quantity
          </span>
          <input
            className="h-[50px] w-full rounded-[8px] border border-[#cfcfcf] px-4 font-['Poppins',sans-serif] text-sm text-[#202020] outline-none focus:border-[#5f0c66]"
            placeholder="Units or estimate"
            type="text"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-['Poppins',sans-serif] text-sm text-[#1d1d1d]">
            Delivery Location
          </span>
          <input
            className="h-[50px] w-full rounded-[8px] border border-[#cfcfcf] px-4 font-['Poppins',sans-serif] text-sm text-[#202020] outline-none focus:border-[#5f0c66]"
            placeholder="City, Country"
            type="text"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-['Poppins',sans-serif] text-sm text-[#1d1d1d]">
            Target Price (Optional)
          </span>
          <input
            className="h-[50px] w-full rounded-[8px] border border-[#cfcfcf] px-4 font-['Poppins',sans-serif] text-sm text-[#202020] outline-none focus:border-[#5f0c66]"
            placeholder="Budget range"
            type="text"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block font-['Poppins',sans-serif] text-sm text-[#1d1d1d]">
            Additional Notes
          </span>
          <textarea
            className="h-24 w-full resize-none rounded-[8px] border border-[#cfcfcf] px-4 py-3 font-['Poppins',sans-serif] text-sm text-[#202020] outline-none focus:border-[#5f0c66]"
            placeholder={`Anything specific for ${mode.toLowerCase()} sourcing?`}
          />
        </label>
      </div>

      <button
        className="mt-6 h-[58px] w-full rounded-[8px] bg-[#5f0c66] font-['Poppins',sans-serif] text-sm font-semibold text-white transition hover:bg-[#712077]"
        type="submit"
      >
        Submit RFQ
      </button>
    </form>
  );
}
