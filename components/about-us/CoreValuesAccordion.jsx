"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function DesktopStackCard({ image, isFront, title }) {
  return (
    <article
      className={`relative flex h-[292px] w-[236px] shrink-0 flex-col overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white px-3 pb-8 pt-5 ${
        isFront
          ? "shadow-[0_18px_38px_rgba(37,16,44,0.13)]"
          : "shadow-[0_10px_24px_rgba(37,16,44,0.07)]"
      }`}
    >
      <div className="h-[142px] overflow-hidden rounded-[3px]">
        <Image
          alt={title}
          className="h-full w-full object-cover"
          height={142}
          sizes="236px"
          src={image}
          width={212}
        />
      </div>

      <div className="flex flex-1 items-end justify-center px-4 text-center">
        <h3 className="font-ibrand text-[1.45rem] leading-[1.05] text-[#080808]">
          {title}
        </h3>
      </div>
    </article>
  );
}

export default function CoreValuesAccordion({ values }) {
  const swipeStartXRef = useRef(0);
  const touchStartXRef = useRef(0);
  const wheelLockUntilRef = useRef(0);
  const motionTimerRef = useRef(null);
  const [valueOrder, setValueOrder] = useState(() => values.map((_, index) => index));
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    return () => {
      if (motionTimerRef.current) {
        window.clearTimeout(motionTimerRef.current);
      }
    };
  }, []);

  const rotateValues = (direction) => {
    setIsMoving(true);
    setValueOrder((prev) => {
      if (direction === "next") {
        return [...prev.slice(1), prev[0]];
      }

      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    });

    if (motionTimerRef.current) {
      window.clearTimeout(motionTimerRef.current);
    }

    motionTimerRef.current = window.setTimeout(() => {
      setIsMoving(false);
    }, 720);
  };

  const showPrevious = () => {
    rotateValues("previous");
  };

  const showNext = () => {
    rotateValues("next");
  };

  const handlePointerDown = (event) => {
    if (event.currentTarget?.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    swipeStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    const deltaX = event.clientX - swipeStartXRef.current;
    if (Math.abs(deltaX) < 50) return;

    if (deltaX > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = touchEndX - touchStartXRef.current;
    if (Math.abs(deltaX) < 40) return;

    if (deltaX > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  const handleWheel = (event) => {
    const hasHorizontalInput = Math.abs(event.deltaX) > 4;
    const hasShiftHorizontalInput = event.shiftKey && Math.abs(event.deltaY) > 4;
    if (!hasHorizontalInput && !hasShiftHorizontalInput) return;

    event.preventDefault();
    event.stopPropagation();

    const horizontalDelta = hasHorizontalInput ? event.deltaX : event.deltaY;
    const now = Date.now();
    if (now < wheelLockUntilRef.current) return;
    wheelLockUntilRef.current = now + 420;

    if (horizontalDelta > 0) {
      showNext();
      return;
    }

    showPrevious();
  };

  return (
    <div className="mt-10 hidden lg:block">
      <div
        className="relative mx-auto h-[356px] max-w-[920px] select-none touch-pan-y overflow-hidden py-8"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
      >
        {values.map((value, index) => {
          const positionIndex = valueOrder.indexOf(index);
          const x = (positionIndex - (values.length - 1) / 2) * 110;
          const isFront = positionIndex === values.length - 1;

          return (
            <div
              key={value.title}
              className="absolute left-1/2 top-8"
              style={{
                filter: isMoving ? "blur(0.2px)" : "blur(0px)",
                transform: `translateX(-50%) translateX(${x}px)`,
                transition:
                  "transform 720ms cubic-bezier(0.22, 1, 0.36, 1), filter 720ms ease",
                willChange: "transform, filter",
                zIndex: positionIndex + 1,
              }}
            >
              <DesktopStackCard image={value.image} isFront={isFront} title={value.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
