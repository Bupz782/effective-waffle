"use client";

import Link from "next/link";
import { isFilled } from "@prismicio/client";
import { JobsDocument } from "@/types/prismic";
import { SaveJobButton } from "@/app/_components/SaveJobButton";

function getCompanyColor(company: string): string {
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
}

export function JobCardCompact({ job }: { job: JobsDocument }) {
  const companyName = isFilled.keyText(job.data.company) ? job.data.company : "?";
  const initials = companyName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bgColor = getCompanyColor(companyName);

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <SaveJobButton job={job} />

      <Link href={`/offre/${job.uid}`} className="block">
        <div className="h-32 w-full bg-gray-200 relative overflow-hidden">
          <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>
          {isFilled.keyText(job.data.contract_type) && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 rounded-md">
              {job.data.contract_type}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-1">
            {isFilled.keyText(job.data.title) ? job.data.title : "Poste sans titre"}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-1">{companyName}</p>

          <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-gray-500">
            {isFilled.keyText(job.data.location) && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.data.location}
              </span>
            )}
            {isFilled.date(job.data.published_date) && (
              <span>
                {new Date(job.data.published_date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            )}
          </div>

          {isFilled.group(job.data.tags) && job.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {job.data.tags.slice(0, 3).map((tag: any, index: number) =>
                tag.tag ? (
                  <span key={index} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                    {tag.tag}
                  </span>
                ) : null
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
