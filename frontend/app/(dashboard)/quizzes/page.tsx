"use client";

import Sidebar from "@/app/components/Sidebar";
import MobileNavbar from "@/app/components/MobileNavbar";

import QuizGenerator from "@/app/components/QuizGenerator";
import RecentQuiz from "@/app/components/RecentQuiz";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      <Sidebar />

      <main className="flex-1 md:ml-[280px] px-8 py-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            SL Quizzes
          </h1>

          <p className="mt-2 text-gray-500">
            Generate AI quizzes from your uploaded documents.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_380px]">

          <QuizGenerator />

          <RecentQuiz />

        </div>

      </main>

      <MobileNavbar />

    </div>
  );
}