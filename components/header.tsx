"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useJobsStore } from "@/store/jobs.store";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const savedJobsCount = useJobsStore((state) => state.jobs.length);

  return (
    <header className="h-25 border-b-[5px] border-[#2175d9] bg-[#0f1941]">
      <div className="mx-auto flex h-full max-w-432 items-center justify-between px-25">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <svg
            width="95"
            height="24"
            viewBox="0 0 95 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="18"
              fill="white"
              fontFamily="Inter"
              fontSize="20"
              fontWeight="700"
            >
              WAFFLE
            </text>
          </svg>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/offres"
            className="text-white text-base font-medium transition-colors hover:text-[#2175d9]"
          >
            Offres
          </Link>
          <Link
            href="/pins"
            className="flex items-center gap-1.5 text-white transition-colors hover:text-[#2175d9]"
          >
            <span className="text-base font-medium">{savedJobsCount}</span>
            <BookmarkIcon sx={{ fontSize: 24 }} />
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/pins"
            className="flex items-center gap-1.5 text-white transition-colors hover:text-[#2175d9]"
          >
            <span className="text-base font-medium">{savedJobsCount}</span>
            <BookmarkIcon sx={{ fontSize: 24 }} />
          </Link>
          {isLoggedIn ? (
            <button className="text-white transition-colors hover:text-[#2175d9]">
              <LogoutIcon sx={{ fontSize: 24 }} />
            </button>
          ) : (
            <button className="text-white transition-colors hover:text-[#2175d9]">
              <LoginIcon sx={{ fontSize: 24 }} />
            </button>
          )}
        </div>

        {/* Desktop Login */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <button className="text-white transition-colors hover:text-[#2175d9]">
              <LogoutIcon sx={{ fontSize: 24 }} />
            </button>
          ) : (
            <button className="text-white transition-colors hover:text-[#2175d9]">
              <LoginIcon sx={{ fontSize: 24 }} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
