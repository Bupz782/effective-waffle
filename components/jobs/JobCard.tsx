"use client";

import { JobsDocument } from "@/types/prismic";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { useJobsStore } from "@/store/jobs.store";

interface JobCardProps {
  job: JobsDocument;
}

export default function JobCard({ job }: JobCardProps) {
  const { isSaved, addJob, removeJob } = useJobsStore();
  const saved = isSaved(job);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeJob(job);
    } else {
      addJob(job);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col">
      {/* Save Button */}
      <button
        onClick={handleSaveClick}
        className="absolute top-4 right-4 p-2 rounded-full transition-colors z-10"
        style={{
          backgroundColor: saved ? "#dbeafe" : "#f3f4f6",
          color: saved ? "#1d4ed8" : "#6b7280",
        }}
        title={saved ? "Retirer des favoris" : "Enregistrer"}
      >
        <svg
          className="w-5 h-5"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      </button>

      {/* Card Content - Clickable */}
      <Link href={`/offre/${job.uid}`} className="flex-1 flex flex-col">
        {/* Title & Company */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
          {isFilled.keyText(job.data.title) ? job.data.title : "Poste sans titre"}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {isFilled.keyText(job.data.company) ? job.data.company : "Entreprise non précisée"}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500">
          {isFilled.keyText(job.data.location) && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.data.location}
            </span>
          )}
          {isFilled.keyText(job.data.contract_type) && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {job.data.contract_type}
            </span>
          )}
          {isFilled.date(job.data.published_date) && (
            <span className="flex items-center gap-1">
              📅 {new Date(job.data.published_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
              })}
            </span>
          )}
        </div>

        {/* Tags */}
        {isFilled.group(job.data.tags) && job.data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {job.data.tags.slice(0, 4).map((tag: any, index: number) =>
              tag.tag ? <Tag key={index} label={tag.tag} /> : null
            )}
            {job.data.tags.length > 4 && (
              <Tag label={`+${job.data.tags.length - 4}`} />
            )}
          </div>
        )}
      </Link>
    </div>
  );
}
