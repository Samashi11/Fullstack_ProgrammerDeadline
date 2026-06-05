"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl antialiased border-b border-outline-variant/30 shadow-sm shadow-primary/5 transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-8 h-16 w-full max-w-container_max mx-auto">
        {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="text-xl font-bold tracking-tight text-primary font-h3">
            Smart Learning Notes
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full transition-all duration-300 active:scale-95 ${
              isActive("/")
                ? "text-primary font-semibold bg-primary/5"
                : "text-on-surface-variant font-medium hover:text-primary hover:bg-primary/5"
            }`}
          >
            Home
          </Link>
          <Link
            href="/upload"
            className={`px-4 py-2 rounded-full transition-all duration-300 active:scale-95 ${
              isActive("/upload")
                ? "text-primary font-semibold bg-primary/5"
                : "text-on-surface-variant font-medium hover:text-primary hover:bg-primary/5"
            }`}
          >
            Upload
          </Link>
          <Link
            href="/history"
            className={`px-4 py-2 rounded-full transition-all duration-300 active:scale-95 ${
              isActive("/history")
                ? "text-primary font-semibold bg-primary/5"
                : "text-on-surface-variant font-medium hover:text-primary hover:bg-primary/5"
            }`}
          >
            History
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 border border-primary/30 text-primary rounded-full hover:border-primary hover:bg-primary/5 transition-all font-body-sm active:scale-95 duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 bg-primary-container text-white rounded-full hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all font-body-sm active:scale-95 duration-200"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle (Visual Only) */}
        <button className="md:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
