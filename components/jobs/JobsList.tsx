"use client";

import { useState } from "react";
import { JobsDocument } from "@/prismicio-types";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 9;

interface JobsListProps {
  jobs: JobsDocument[];
}

export default function JobsList({ jobs }: JobsListProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Aucune offre pour le moment
        </h3>
        <p className="mt-2 text-gray-500">
          Revenez plus tard ou créez des offres sur Prismic
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.slice(0, visible).map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {visible < jobs.length && (
        <footer className="pt-12 flex justify-center">
          <Button onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Charger plus d&apos;offres
          </Button>
        </footer>
      )}
    </>
  );
}
