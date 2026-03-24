import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-4 border-[#2175d9] bg-[#0f1941] py-6 sm:py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold text-white">
          WAFFLE
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/mentions-legales"
            className="text-sm text-white transition-colors hover:text-[#2175d9]"
          >
            Mentions légales
          </Link>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-[#2175d9]"
          >
            <LinkedInIcon sx={{ fontSize: 24 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
