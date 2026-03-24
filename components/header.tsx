"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

interface HeaderProps {
  isLoggedIn?: boolean;
  savedJobsCount?: number;
}

export function Header({
  isLoggedIn = false,
  savedJobsCount = 0,
}: HeaderProps) {
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
              LOGO
            </text>
          </svg>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Bookmark with count */}
              <Link
                href="/profil"
                className="flex items-center gap-1.25 text-white transition-colors hover:text-[#2175d9]"
              >
                <span className="text-base font-medium">{savedJobsCount}</span>
                <BookmarkIcon sx={{ fontSize: 24 }} />
              </Link>

              {/* Logout */}
              <button className="text-white transition-colors hover:text-[#2175d9]">
                <LogoutIcon sx={{ fontSize: 24 }} />
              </button>
            </>
          ) : (
            /* Login */
            <button className="text-white transition-colors hover:text-[#2175d9]">
              <LoginIcon sx={{ fontSize: 24 }} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
