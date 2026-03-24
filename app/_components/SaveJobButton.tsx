"use client";

import { JobsDocument } from "@/types/prismic";
import { useJobsStore } from "@/store/jobs.store";

export function SaveJobButton({ job }: { job: JobsDocument }) {
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
    <button
      onClick={handleSaveClick}
      className="absolute top-3 right-3 z-10 p-2 rounded-full transition-colors"
      style={{
        backgroundColor: saved ? "#dbeafe" : "rgba(255,255,255,0.9)",
        color: saved ? "#1d4ed8" : "#6b7280",
      }}
      title={saved ? "Retirer des favoris" : "Enregistrer"}
    >
      <svg
        className="w-4 h-4"
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
  );
}
