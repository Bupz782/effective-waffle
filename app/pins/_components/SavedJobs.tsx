"use client";

import { useJobsStore } from "@/store/jobs.store";
import JobsList from "@/components/jobs/JobsList";

export default function SavedJobs() {
  const jobs = useJobsStore((state) => state.jobs);

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mes offres enregistrées
          </h1>
          <p className="text-lg text-gray-600">
            {jobs.length} offre{jobs.length > 1 ? "s" : ""} enregistrée{jobs.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Jobs List */}
        <JobsList jobs={jobs} />
      </div>
    </div>
  );
}
