"use client";

import { useRouter } from "next/navigation";

export default function RecentQuiz() {
  const router = useRouter();

  const quizzes = [
    {
      title: "Network Security Fundamentals",
      meta: "20 Questions • Created yesterday",
      score: "92%",
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,.06)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Quizzes</h2>

        <button
          onClick={() => router.push("/quizzes")}
          className="text-sm font-semibold text-violet-600 hover:text-violet-700"
        >
          View all
        </button>
      </div>

      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.title}
            className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                <span className="material-symbols-outlined text-green-600">
                  quiz
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                <p className="text-sm text-gray-500">{quiz.meta}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {quiz.score}
                </span>
                <p className="mt-1 text-xs text-gray-500">Best Score</p>
              </div>

              <button
                onClick={() => router.push("/quizzes")}
                className="flex h-9 items-center gap-1 rounded-lg bg-violet-600 pl-4 pr-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Review
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
