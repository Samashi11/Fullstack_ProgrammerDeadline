"use client";

import Sidebar from "@/app/components/Sidebar";
import QuizHero from "@/app/components/QuizHero";
import QuizStats from "@/app/components/QuizStats";
import QuizGenerator from "@/app/components/QuizGenerator";
import RecentQuiz from "@/app/components/RecentQuiz";

export default function QuizPage() {
  return (
    <div className="bg-background text-on-background flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 md:ml-[280px] overflow-y-auto bg-gradient-to-br from-background via-surface-dim to-background">

        <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">

          <QuizHero />

          <QuizStats />

          <QuizGenerator />

          <RecentQuiz />

        </div>

      </main>
    </div>
  );
}