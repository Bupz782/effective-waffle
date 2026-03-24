import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import JobHeader from "@/components/jobs/JobHeader";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import Link from "next/link";

export const dynamicParams = true;

export async function generateStaticParams() {
  const client = createClient();
  const jobs = await client.getAllByType("jobs");

  return jobs.map((job) => ({
    uid: job.uid,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const job = await client.getByUID("jobs", uid).catch(() => null);

  if (!job) {
    return { title: "Offre non trouvée - Waffle" };
  }

  return {
    title: job.data.title || `Offre - Waffle`,
    description: job.data.short_description || "",
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const client = createClient();
  const job = await client.getByUID("jobs", uid).catch(() => null);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/offres"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux offres
        </Link>

        {/* Job Header with Save Button */}
        <JobHeader job={job as any} />

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Description du poste</h2>
          {isFilled.richText(job.data.description) ? (
            <div className="prose prose-lg max-w-none prose-blue">
              <PrismicRichText
                field={job.data.description}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                  ),
                  heading3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
                  ),
                  paragraph: ({ children }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                  ),
                  listItem: ({ children }) => (
                    <li className="text-gray-700 mb-2">{children}</li>
                  ),
                  oListItem: ({ children }) => (
                    <li className="text-gray-700 mb-2">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucune description disponible</p>
          )}
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Intéressé par cette offre ?
          </h2>
          <p className="text-blue-100 mb-6">
            Postulez maintenant et rejoignez l&apos;aventure
          </p>
          <ApplyModal job={job as any} />
        </div>
      </div>
    </div>
  );
}
