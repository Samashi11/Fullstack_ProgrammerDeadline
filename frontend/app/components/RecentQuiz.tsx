export default function RecentQuiz() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Recent Quizzes
          </h2>

          <p className="text-zinc-400 mt-2">
            Your latest quiz activities will appear here.
          </p>

        </div>

        <span className="material-symbols-outlined text-emerald-400 text-4xl">
          history
        </span>

      </div>

      <div className="flex flex-col items-center justify-center py-16">

        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">

          <span className="material-symbols-outlined text-emerald-400 text-5xl">
            quiz
          </span>

        </div>

        <h3 className="text-white text-2xl font-semibold mt-8">
          No Quiz Attempts Yet
        </h3>

        <p className="text-zinc-400 text-center mt-3 max-w-lg leading-7">
          Generate your first AI-powered quiz from your uploaded documents.
          Your quiz history, scores, and progress will appear here.
        </p>

        <button className="mt-8 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition shadow-[0_0_25px_rgba(16,185,129,.35)] font-semibold flex items-center gap-3">

          <span className="material-symbols-outlined">
            auto_awesome
          </span>

          Start First Quiz

        </button>

      </div>

    </section>
  );
}