"use client";

import { PrismicLink } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

/**
 * Component for "JobList" Slices.
 */
export default function JobList({ slice }: { slice: any }) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {isFilled.keyText(slice.primary.title) && (
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {slice.primary.title}
            </h2>
          )}
          {isFilled.keyText(slice.primary.description) && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {slice.primary.description}
            </p>
          )}
        </div>

        {/* Job Links */}
        {isFilled.link(slice.primary.jobs) && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Offre liée</span>
                <PrismicLink
                  field={slice.primary.jobs}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Voir l&apos;offre →
                </PrismicLink>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isFilled.link(slice.primary.jobs) && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune offre disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
