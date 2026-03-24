"use client";

import { useState } from "react";
import { JobsDocument } from "@/types/prismic";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

interface JobsListProps {
  jobs: JobsDocument[];
  allTags?: string[];
}

export default function JobsList({ jobs, allTags = [] }: JobsListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visible, setVisible] = useState(9);

  // Filtre les jobs selon les tags sélectionnés
  const filteredJobs = selectedTags.length > 0
    ? jobs.filter((job) => {
        if (!job.data.tags || !Array.isArray(job.data.tags)) return false;
        const jobTags = job.data.tags.map((t: any) => t.tag).filter(Boolean);
        // Le job doit avoir AU MOINS UN des tags sélectionnés (ou logique)
        return selectedTags.some((tag) => jobTags.includes(tag));
      })
    : jobs;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
    setVisible(9); // Reset pagination quand on change de filtre
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setVisible(9);
  };

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
      {/* Filtres par tag */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Filtrer par technologie
            </h2>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Effacer les filtres ({selectedTags.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <p className="mt-4 text-sm text-gray-600">
              {filteredJobs.length} résultat{filteredJobs.length > 1 ? "s" : ""} trouvé
              {filteredJobs.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}

      {/* Grille des jobs */}
      {filteredJobs.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.slice(0, visible).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {visible < filteredJobs.length && (
            <footer className="pt-12 flex justify-center">
              <Button onClick={() => setVisible((v) => v + 9)}>
                Charger plus d&apos;offres
              </Button>
            </footer>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Aucune offre ne correspond à ces filtres
          </h3>
          <p className="mt-2 text-gray-500">
            Essayez d&apos;autres tags ou effacez les filtres
          </p>
          <Button onClick={clearFilters} className="mt-4">
            Effacer les filtres
          </Button>
        </div>
      )}
    </>
  );
}
