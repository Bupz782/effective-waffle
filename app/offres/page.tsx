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
  
  try {
    // Le type s'appelle "jobs" (pluriel) pas "job"
    const jobs = await client.getAllByType("jobs");
    
    console.log(`Found ${jobs.length} jobs`);
    if (jobs.length > 0) {
      console.log("First job keys:", Object.keys(jobs[0].data || {}));
    }

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
          <JobsList jobs={jobs as any} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return (
      <div className="min-h-screen bg-[#f7f5f0] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{error instanceof Error ? error.message : String(error)}</p>
        </div>
      </div>
    );
  }
}
