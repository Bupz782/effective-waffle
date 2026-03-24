"use client";

import { useJobsStore } from "@/store/jobs.store";
import JobCard from "@/components/jobs/JobCard";
import Link from "next/link";

export default function HistoriquePage() {
  const appliedJobs = useJobsStore((state) => state.appliedJobs);

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mes candidatures
          </h1>
          <p className="text-lg text-gray-600">
            {appliedJobs.length} candidature{appliedJobs.length > 1 ? "s" : ""} envoyée{appliedJobs.length > 1 ? "s" : ""}
          </p>
        </div>

        {appliedJobs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune candidature pour le moment
            </h3>
            <p className="text-gray-500 mb-6">
              Postulez à des offres pour les retrouver ici
            </p>
            <Link
              href="/offres"
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Voir les offres
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
