import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { tinaField } from "tinacms/dist/react";
import type { PageQuery } from "../__generated__/types";

function getPositionClass(position?: string | null) {
  return {
    left: "text-left",
    center: "text-center justify-center",
    right: "text-right justify-end",
  }[position || "left"];
}

const Banner = ({ page }: { page: PageQuery["page"] }) => {
  const banner = page.banner;

  if (!banner?.length) return <></>;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div
      className="embla relative overflow-hidden shadow-inner"
      data-tina-field={tinaField(page, "banner")}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex h-[60vh]">
          {banner.map((item, i) => (
            <div
              key={i}
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
            >
              <img src={item?.image} className="object-cover size-full" />

              {item?.headline && (
                <div className="absolute bg-linear-to-r from-black/40 to-transparent inset-0 flex items-center text-white">
                  <div
                    className={`container flex ${getPositionClass(
                      item.textPosition
                    )}`}
                  >
                    <div className="max-w-2xl">
                      <h1 className="font-mdium text-5xl leading-tight">
                        {item?.headline}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {banner.length > 1 && (
        <div className="flex gap-2 absolute bottom-10 right-10 text-white/60 [&_svg]:size-8 [&_button]:transition-all [&_button]:hover:text-white/90">
          <button className="embla__prev cursor-pointer" onClick={scrollPrev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button className="embla__next cursor-pointer" onClick={scrollNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
export default Banner;
