import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Link from "next/dist/client/link";

export default function ChatSidebar({
  logoutComponent,
}: {
  logoutComponent: React.ReactNode;
}) {
  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-[280px] bg-zinc-950/80 backdrop-blur-2xl border-r border-white/5 pt-20 pb-6 z-40">
      <div className="px-6 mb-10">
        <h2 className="text-emerald-500 font-bold font-['Space_Grotesk'] text-2xl tracking-tight">
          KnowledgeBase<span className="text-white/50">.ai</span>
        </h2>
      </div>

      <div className="px-4 mb-6">
        <button className="w-full bg-primary-container text-on-primary-container hover:bg-primary transition-colors duration-200 rounded-lg py-3 font-body-md text-body-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          New Analysis
        </button>
      </div>

      <ul className="flex flex-col gap-2 flex-1 px-2 font-['Space_Grotesk'] text-sm">
        <li>
          <Link href="/dashboard" className="text-zinc-500 hover:text-zinc-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/document" className="bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500 flex items-center gap-3 px-4 py-3 rounded-r-lg transition-all duration-200 cursor-pointer active:opacity-80">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              description
            </span>
            Documents
          </Link>
        </li>
        <li>
          <Link href="/chat" className="text-zinc-500 hover:text-zinc-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined">forum</span>
            Chat
          </Link>
        </li>
        <li>
          <Link href="/quizzes" className="text-zinc-500 hover:text-zinc-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined">quiz</span>
            Quizzes
          </Link>
        </li>
        <li>
          <Link href="/settings" className="text-zinc-500 hover:text-zinc-300 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </li>
      </ul>

      {/* Logout Button Container */}

      <div className="mt-auto px-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/50 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/30 flex items-center justify-center">
            <img
              alt="User Profile Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQvbJHMZoI4313_iXBl-sEPoMBw0O8rtoaUHpIRWwCoksxVUhXIHrGbJDx0Iu_-TyPq8dAPLLD4rob6MQZwCWGdTHWyjzftJ2UqqOZryXhYshzSEVeB8bl4XAbIjlNTeWK0KtoG83JiBKeGyZvp46-x02VSuwrlcRTusVotR3zodA2pwmcnEn3pTH-f2OnVIkePKktpucIWD8jCTJY5CPAgRAEzt1CXHJGrLn5RqJ2iSv3gAXQgHxZqgFbPVdNqWA-WjPCcQdxBn7x"
            />
          </div>
          <div>
            <p className="text-zinc-200 font-body-sm text-body-sm font-semibold">
              AI Researcher
            </p>
            <p className="text-emerald-500 font-label-caps text-label-caps mt-0.5">
              Pro Plan
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
