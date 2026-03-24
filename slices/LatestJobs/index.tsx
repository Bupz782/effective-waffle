"use client";

import { PrismicLink } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { SaveJobButton } from "@/app/_components/SaveJobButton";

const getColor = (name: string) => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-cyan-500"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default async function LatestJobs({ slice }: { slice: any }) {
  const client = createClient();
  const jobs = await client.getAllByType("jobs", {
    orderings: [{ field: "my.jobs.published_date", direction: "desc" }],
    limit: slice.primary.jobs_count || 6,
  });

  return (
    <section className="py-16 px-4 bg-[#f7f5f0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {isFilled.keyText(slice.primary.title) ? slice.primary.title : "Nos dernières opportunités"}
            </h2>
            <p className="text-lg text-gray-600">
              {isFilled.keyText(slice.primary.subtitle) ? slice.primary.subtitle : "Découvrez nos offres récemment publiées"}
            </p>
          </div>
          {isFilled.link(slice.primary.button_link) && (
            <PrismicLink
              field={slice.primary.button_link}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isFilled.keyText(slice.primary.button_text) ? slice.primary.button_text : "Voir toutes les offres"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </PrismicLink>
          )}
        </div>

        {jobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job: any) => {
              const company = job.data.company || "?";
              const initials = company.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
              
              return (
                <div key={job.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <SaveJobButton job={job} />
                  <PrismicLink document={job} className="block">
                    <div className="h-32 w-full relative overflow-hidden">
                      <div className={`w-full h-full ${getColor(company)} flex items-center justify-center`}>
                        <span className="text-3xl font-bold text-white">{initials}</span>
                      </div>
                      {job.data.contract_type && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 text-xs font-medium text-gray-700 rounded-md">
                          {job.data.contract_type}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 mb-1 line-clamp-1">
                        {job.data.title || "Poste sans titre"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-1">{company}</p>
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-gray-500">
                        {job.data.location && <span>📍 {job.data.location}</span>}
                        {job.data.published_date && (
                          <span>📅 {new Date(job.data.published_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                        )}
                      </div>
                      {job.data.tags && job.data.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {job.data.tags.slice(0, 3).map((tag: any, i: number) =>
                            tag.tag ? <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">{tag.tag}</span> : null
                          )}
                        </div>
                      )}
                    </div>
                  </PrismicLink>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <p className="text-gray-500">Aucune offre pour le moment</p>
          </div>
        )}
      </div>
    </section>
  );
}
