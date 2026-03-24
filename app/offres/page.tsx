import JobsList from "@/components/jobs/JobsList";
import { Metadata } from "next";
import { createClient } from "@/prismicio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Offres d'emploi - Waffle",
  description: "Découvrez toutes nos offres d'emploi tech sélectionnées",
};

export default async function JobsPage() {
  const client = createClient();

  const jobs = await client.getAllByType("jobs", {
    orderings: [{ field: "my.jobs.published_date", direction: "desc" }],
  });

  const allTags = new Set<string>();
  jobs.forEach((job: any) => {
    if (job.data.tags && Array.isArray(job.data.tags)) {
      job.data.tags.forEach((tag: any) => {
        if (tag.tag) allTags.add(tag.tag);
      });
    }
  });

  const uniqueTags = Array.from(allTags).sort();

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Toutes nos offres
          </h1>
          <p className="text-lg text-gray-600">
            {jobs.length} offre{jobs.length > 1 ? "s" : ""} disponible
            {jobs.length > 1 ? "s" : ""}
          </p>
        </div>

        <JobsList jobs={jobs as any} allTags={uniqueTags} />
      </div>
    </div>
  );
}
