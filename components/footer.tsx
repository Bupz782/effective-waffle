import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#2175d9] bg-[#0f1941] py-8">
      <div className="mx-auto flex max-w-432 items-center justify-between px-25">
        {/* Logo */}
        <span className="text-xl font-bold text-white">LOGO</span>

        {/* Links */}
        <div className="flex items-center gap-8">
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
            <LinkedInIcon sx={{ fontSize: 20 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
