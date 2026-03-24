"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

/**
 * Component for "HeroSection" Slices.
 */
export default function HeroSection({ slice }: { slice: any }) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      {isFilled.image(slice.primary.image) && (
        <div className="absolute inset-0 z-0">
          <PrismicNextImage
            field={slice.primary.image}
            className="w-full h-full object-cover"
            imgixParams={{ q: 80 }}
            fill
            priority
            fallbackAlt=""
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {isFilled.keyText(slice.primary.title) && (
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {slice.primary.title}
          </h1>
        )}

        {isFilled.keyText(slice.primary.subtitle) && (
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200">
            {slice.primary.subtitle}
          </p>
        )}

        {isFilled.link(slice.primary.cta_link) && isFilled.keyText(slice.primary.cta_text) && (
          <PrismicNextLink
            field={slice.primary.cta_link}
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            {slice.primary.cta_text}
          </PrismicNextLink>
        )}
      </div>
    </section>
  );
}
