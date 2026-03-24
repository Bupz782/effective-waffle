import { components } from "@/slices";
import { isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";
import { createClient } from "@/prismicio";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const homepage = await client.getSingle("homepage");

  return {
    title: homepage.data.meta_title || "Waffle - Offres d'emploi tech",
    description:
      homepage.data.meta_description || "Trouvez votre prochain emploi tech",
    openGraph: {
      title: homepage.data.meta_title || "Waffle - Offres d'emploi tech",
      description:
        homepage.data.meta_description || "Trouvez votre prochain emploi tech",
      images: isFilled.image(homepage.data.meta_image)
        ? [homepage.data.meta_image.url]
        : undefined,
    },
  };
}

export default async function HomePage() {
  const client = createClient();
  const homepage = await client.getSingle("homepage");

  return (
    <div className="flex flex-col">
      <SliceZone slices={homepage.data.slices} components={components} />
    </div>
  );
}
