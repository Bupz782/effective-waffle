import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  tags: string[];
  shortDescription: string;
  slug: string;
}

export function JobCard({
  title,
  company,
  location,
  tags,
  shortDescription,
  slug,
}: JobCardProps) {
  return (
    <div className="flex h-[225px] w-[499px] max-w-full flex-col gap-4 rounded-sm border bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#0f1941]">{title}</h3>
          <p className="text-sm text-[#2175d9]">
            {company} — {location}
          </p>
        </div>
        <button className="text-[#0f1941] transition-colors hover:text-[#2175d9]">
          <svg
            className="h-6 w-6"
            fill="none"
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
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-[#f7f5f0] px-2 py-1 text-sm text-[#2175d9]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="line-clamp-2 text-sm text-[#0f1941]">{shortDescription}</p>

      <div className="mt-auto flex justify-end">
        <Button href={`/offre/${slug}`} size="sm">
          Voir l&apos;offre
        </Button>
      </div>
    </div>
  );
}
