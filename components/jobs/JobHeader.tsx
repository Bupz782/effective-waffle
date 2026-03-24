"use client";

import { JobsDocument } from "@/prismicio-types";
import { isFilled } from "@prismicio/client";
import { useJobsStore } from "@/store/jobs.store";
import { Tag } from "@/components/ui/tag";

interface JobHeaderProps {
  job: JobsDocument;
}

export default function JobHeader({ job }: JobHeaderProps) {
  const { isSaved, addJob, removeJob } = useJobsStore();
  const saved = isSaved(job as any);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
      {/* Actions */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => saved ? removeJob(job as any) : addJob(job as any)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: saved ? "#dbeafe" : "white",
            borderColor: saved ? "#3b82f6" : "#e5e7eb",
            color: saved ? "#1d4ed8" : "#374151",
          }}
        >
          <svg 
            className="w-5 h-5" 
            fill={saved ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {saved ? "Enregistré" : "Enregistrer"}
        </button>
      </div>

      {/* Tags */}
      {isFilled.group(job.data.tags) && job.data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.data.tags.map((tag, index) => (
            tag.tag && <Tag key={index} label={tag.tag} />
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {isFilled.keyText(job.data.title) ? job.data.title : "Poste sans titre"}
      </h1>

      {/* Company */}
      {isFilled.keyText(job.data.company) && (
        <p className="text-xl text-gray-600 mb-6">{job.data.company}</p>
      )}

      {/* Meta Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-gray-100">
        {isFilled.keyText(job.data.location) && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Localisation</p>
              <p className="font-medium text-gray-900">{job.data.location}</p>
            </div>
          </div>
        )}

        {isFilled.keyText(job.data.contract_type) && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contrat</p>
              <p className="font-medium text-gray-900">{job.data.contract_type}</p>
            </div>
          </div>
        )}

        {isFilled.keyText(job.data.salary) && (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Salaire</p>
              <p className="font-medium text-gray-900">{job.data.salary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Date */}
      {isFilled.date(job.data.published_date) && (
        <p className="mt-4 text-sm text-gray-500">
          Publié le {new Date(job.data.published_date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
