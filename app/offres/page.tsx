import JobsList from "@/components/jobs/JobsList";
import { Metadata } from "next";
import { createClient } from "@/prismicio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Offres d'emploi - Waffle",
  description: "Découvrez toutes nos offres d'emploi tech sélectionnées",
};

export default async function JobsPage() {
  const client = createClient();
  const jobs = await client.getAllByType("job", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

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

        {/* Jobs List */}
        <JobsList jobs={jobs} />
      </div>
    </div>
  );
}
