"use client";

import { useRouter } from "next/navigation";

interface UserData {
  full_name?: string;
  name?: string;
  email?: string;
}

interface HeroSectionProps {
  userData?: UserData | null;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Good Morning";
  if (hour < 15) return "Good Afternoon";
  if (hour < 18) return "Good Evening";
  return "Good Night";
}

export default function HeroSection({ userData }: HeroSectionProps) {
  const router = useRouter();

  const firstName =
    (userData?.full_name || userData?.name || "").split(" ")[0] || "there";

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white px-8 py-8 shadow-[0_8px_24px_rgba(15,23,42,.05)] md:px-10">
      <div className="flex items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 text-base font-semibold">
            <span className="text-violet-600">{getGreeting()},</span>
            <span className="text-gray-900">{firstName}</span>
            <span>👋</span>
          </p>

          <h1 className="mt-3 text-[32px] font-bold leading-tight text-gray-900 md:text-[36px]">
            Welcome back to SL AI
          </h1>

          <p className="mt-3 text-base leading-7 text-gray-500">
            Continue learning and exploring your documents with AI.
          </p>

          <button
            onClick={() => router.push("/chat")}
            className="mt-6 flex h-12 items-center gap-2 rounded-xl bg-violet-600 px-6 font-semibold text-white transition hover:bg-violet-700"
          >
            <span className="material-symbols-outlined text-[20px]">
              chat_bubble
            </span>
            Start New Chat
          </button>
        </div>

        <div className="relative hidden h-[190px] w-[220px] shrink-0 items-center justify-center lg:flex">
          {/* Decorative blob */}
          <div className="absolute inset-0 rounded-full bg-violet-100/70 blur-2xl" />

          {/* Sparkles */}
          <span className="material-symbols-outlined absolute left-2 top-2 text-violet-300">
            auto_awesome
          </span>
          <span className="material-symbols-outlined absolute bottom-4 right-0 text-2xl text-violet-300">
            auto_awesome
          </span>

          {/* Book */}
          <div className="absolute left-6 top-8 flex h-24 w-20 rotate-[-8deg] items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
            <span className="material-symbols-outlined text-4xl text-white">
              menu_book
            </span>
          </div>

          {/* Chat bubble card */}
          <div className="absolute right-2 top-4 flex h-16 w-24 rotate-[6deg] flex-col justify-center gap-1 rounded-xl bg-white p-3 shadow-lg">
            <span className="material-symbols-outlined text-lg text-violet-600">
              forum
            </span>
            <div className="h-1.5 w-12 rounded-full bg-violet-100" />
          </div>

          {/* Small info card */}
          <div className="absolute bottom-2 left-14 flex h-14 w-20 flex-col justify-center gap-1 rounded-lg bg-white p-2 shadow-lg">
            <div className="h-1.5 w-10 rounded-full bg-gray-200" />
            <div className="h-1.5 w-7 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
