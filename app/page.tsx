import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { JobsDocument } from "@/prismicio-types";
import { Tag } from "@/components/ui/tag";

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

function JobCardCompact({ job }: { job: JobsDocument }) {
  // Génère une couleur basée sur le nom de l'entreprise
  const getCompanyColor = (company: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
    ];
    let hash = 0;
    for (let i = 0; i < company.length; i++) {
      hash = company.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const companyName = isFilled.keyText(job.data.company)
    ? job.data.company
    : "?";
  const initials = companyName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = getCompanyColor(companyName);

  return (
    <Link
      href={`/offre/${job.uid}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Image / Placeholder */}
      <div className="h-32 w-full bg-gray-200 relative overflow-hidden">
        {/* Placeholder avec initiales de l'entreprise */}
          <div
            className={`w-full h-full ${bgColor} flex items-center justify-center`}
          >
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>
        )}
        {/* Badge contract type */}
        {isFilled.keyText(job.data.contract_type) && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 rounded-md">
            {job.data.contract_type}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Company */}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-1">
          {isFilled.keyText(job.data.title)
            ? job.data.title
            : "Poste sans titre"}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {companyName}
        </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-gray-500">
        {isFilled.keyText(job.data.location) && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {job.data.location}
          </span>
        )}
        {isFilled.keyText(job.data.contract_type) && (
          <span className="flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {job.data.contract_type}
          </span>
        )}
      </div>

      {/* Tags */}
      {isFilled.group(job.data.tags) && job.data.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.data.tags.slice(0, 3).map((tag, index) =>
            tag.tag ? (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
              >
                {tag.tag}
              </span>
            ) : null
          )}
        </div>
      )}
    </Link>
  );
}

export default async function HomePage() {
  const client = createClient();

  // Fetch homepage slices
  const homepage = await client.getSingle("homepage");

  // Fetch 6 latest jobs
  const latestJobs = await client.getAllByType("jobs", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    limit: 6,
  });

  return (
    <div className="flex flex-col">
      {/* Slices from Prismic */}
      <SliceZone slices={homepage.data.slices} components={components} />

      {/* Section: Nos dernières opportunités */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Jobs Grid */}
          {latestJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job) => (
                <JobCardCompact key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Aucune offre pour le moment
              </h3>
              <p className="mt-2 text-gray-500">
                Revenez plus tard pour découvrir nos nouvelles opportunités
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
