import { Metadata } from "next";
import SavedJobs from "./_components/SavedJobs";

export const metadata: Metadata = {
  title: "Mes offres enregistrées - Waffle",
  description: "Retrouvez toutes vos offres d'emploi enregistrées",
};

export default function PinsPage() {
  return <SavedJobs />;
}
