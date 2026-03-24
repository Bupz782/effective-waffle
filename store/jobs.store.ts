"use client";

import { JobsDocument } from "@/types/prismic";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobState = {
  jobs: JobsDocument[];
  addJob: (job: JobsDocument) => void;
  removeJob: (job: JobsDocument) => void;
  isSaved: (job: JobsDocument) => boolean;

  appliedJobs: JobsDocument[];
  applyJob: (job: JobsDocument) => void;
  isApplied: (job: JobsDocument) => boolean;
};

export const useJobsStore = create<JobState>()(
  persist(
    (set, get) => ({
      jobs: [],
      addJob: (job) =>
        set((state) => ({
          jobs: state.jobs.some((j) => j.id === job.id)
            ? state.jobs
            : [...state.jobs, job],
        })),
      removeJob: (job) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== job.id),
        })),
      isSaved: (job) => get().jobs.some((j) => j.id === job.id),

      appliedJobs: [],
      applyJob: (job) =>
        set((state) => ({
          appliedJobs: state.appliedJobs.some((j) => j.id === job.id)
            ? state.appliedJobs
            : [...state.appliedJobs, job],
        })),
      isApplied: (job) => get().appliedJobs.some((j) => j.id === job.id),
    }),
    { name: "waffle-saved-jobs" }
  )
);
