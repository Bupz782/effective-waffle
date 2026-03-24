"use client";

import { JobsDocument } from "@/types/prismic";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type JobState = {
  jobs: JobsDocument[];
  addJob: (job: JobsDocument) => void;
  removeJob: (job: JobsDocument) => void;
  isSaved: (job: JobsDocument) => boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useJobsStore = create<JobState>()(
  persist(
    (set, get) => ({
      jobs: [],
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
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
    }),
    {
      name: "waffle-saved-jobs",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
