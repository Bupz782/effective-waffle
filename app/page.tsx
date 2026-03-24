import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { JobsDocument } from "@/types/prismic";
import { JobCardCompact } from "@/components/jobs/JobCardCompact";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("homepage");

  return {
    title: homepage.data.meta_title || "Waffle - Offres d'emploi tech",
    description:
      homepage.data.meta_description || "Trouvez votre prochain emploi tech",
    openGraph: {
      title: homepage.data.meta_title || "Waffle - Offres d'emploi tech",
      description:
        homepage.data.meta_description || "Trouvez votre prochain emploi tech",
      images: isFilled.image(homepage.data.meta_image)
        ? [homepage.data.meta_image.url]
        : undefined,
    },
  };
}

export default async function HomePage() {
  const client = createClient();

  const homepage = await client.getSingle("homepage");

  const latestJobs = await client.getAllByType("jobs", {
    orderings: [{ field: "my.jobs.published_date", direction: "desc" }],
    limit: 6,
  });

  return (
    <div className="flex flex-col">
      <SliceZone slices={homepage.data.slices} components={components} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Nos dernières opportunités
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez nos offres récemment publiées
              </p>
            </div>
            <Link
              href="/offres"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voir toutes les offres
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {latestJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <JobCardCompact key={job.id} job={job as JobsDocument} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune offre pour le moment</h3>
              <p className="mt-2 text-gray-500">Revenez plus tard pour découvrir nos nouvelles opportunités</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
