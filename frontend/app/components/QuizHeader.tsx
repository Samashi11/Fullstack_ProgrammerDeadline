import type { QuizConfig } from "@/app/types/quiz";

interface QuizHeaderProps {
  quiz: QuizConfig;
}

export default function QuizHeader({ quiz }: QuizHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      {/* Glow Background */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative grid lg:grid-cols-[1fr_340px] gap-10 items-center">

        {/* LEFT CONTENT */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">

            <span className="material-symbols-outlined text-lg">
              auto_awesome
            </span>

            AI Knowledge Assessment

          </div>

          <h1 className="mt-6 text-5xl font-bold text-white leading-tight">

            {quiz.title}

          </h1>

          <div className="mt-5 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">

            <span className="material-symbols-outlined text-emerald-400">
              description
            </span>

            <div>

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Source Document
              </p>

              <p className="text-white font-medium">
                {quiz.documentName}
              </p>

            </div>

          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            This assessment has been automatically generated using your indexed
            knowledge base. Read every question carefully and choose the most
            appropriate answer. Your score will be calculated instantly after
            submission.
          </p>

        </div>

        {/* RIGHT PANEL */}

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">

          <div className="flex items-center gap-3 mb-6">

            <span className="material-symbols-outlined text-emerald-400">
              analytics
            </span>

            <h2 className="text-xl font-bold text-white">
              Assessment Details
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b border-white/5 pb-4">

              <div className="flex items-center gap-3">

                <span className="material-symbols-outlined text-zinc-400">
                  military_tech
                </span>

                <span className="text-zinc-400">
                  Difficulty
                </span>

              </div>

              <span className="font-semibold text-emerald-400">
                {quiz.difficulty}
              </span>

            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-4">

              <div className="flex items-center gap-3">

                <span className="material-symbols-outlined text-zinc-400">
                  quiz
                </span>

                <span className="text-zinc-400">
                  Questions
                </span>

              </div>

              <span className="font-semibold text-white">
                {quiz.questionCount}
              </span>

            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-4">

              <div className="flex items-center gap-3">

                <span className="material-symbols-outlined text-zinc-400">
                  schedule
                </span>

                <span className="text-zinc-400">
                  Duration
                </span>

              </div>

              <span className="font-semibold text-white">
                {quiz.estimatedTime} min
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <span className="material-symbols-outlined text-zinc-400">
                  workspace_premium
                </span>

                <span className="text-zinc-400">
                  Passing Score
                </span>

              </div>

              <span className="font-semibold text-emerald-400">
                70%
              </span>

            </div>

          </div>

          {/* Bottom Card */}

          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">

            <div className="flex items-center gap-3">

              <span className="material-symbols-outlined text-emerald-400 text-3xl">
                verified
              </span>

              <div>

                <h3 className="font-semibold text-white">
                  Ready to Begin
                </h3>

                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Once you start, answer each question carefully before moving
                  to the next one.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}