"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useJobsStore } from "@/store/jobs.store";
import { useEffect, useState } from "react";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const savedJobsCount = useJobsStore((state) => state.jobs.length);
  const appliedJobsCount = useJobsStore((state) => state.appliedJobs.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 sm:h-20 border-b-4 border-[#2175d9] bg-[#0f1941]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-white text-xl sm:text-2xl font-bold">WAFFLE</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/offres"
            className="text-white text-base font-medium transition-colors hover:text-[#2175d9]"
          >
            Offres
          </Link>
          <Link
            href="/historique"
            className="flex items-center gap-1.5 text-white text-base font-medium transition-colors hover:text-[#2175d9]"
          >
            {mounted && appliedJobsCount > 0 && (
              <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {appliedJobsCount}
              </span>
            )}
            Candidatures
          </Link>
          <Link
            href="/pins"
            className="flex items-center gap-1.5 text-white transition-colors hover:text-[#2175d9]"
          >
            <span className="text-base font-medium">
              {mounted ? savedJobsCount : 0}
            </span>
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
        </nav>

        {/* Navigation - Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/pins"
            className="flex items-center gap-1.5 text-white transition-colors hover:text-[#2175d9]"
          >
            <span className="text-base font-medium">
              {mounted ? savedJobsCount : 0}
            </span>
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
      </div>
    </header>
  );
}
