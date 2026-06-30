export default function QuizHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-10">

      {/* Glow */}
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-center">

        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-emerald-400 text-sm font-medium mb-6">
            <span className="material-symbols-outlined text-lg">
              auto_awesome
            </span>

            Powered by Gemini AI
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight mb-4">
            Knowledge Quizzes
          </h1>

          <p className="text-zinc-400 text-lg leading-8">
            Challenge yourself with AI-generated quizzes based on your uploaded
            documents. Improve your understanding, measure your knowledge, and
            receive instant feedback after every attempt.
          </p>

          <div className="flex gap-4 mt-8">

            <button className="bg-emerald-500 hover:bg-emerald-400 transition px-7 py-3 rounded-xl font-semibold shadow-[0_0_30px_rgba(16,185,129,.35)]">
              Generate Quiz
            </button>

            <button className="border border-white/10 hover:border-emerald-500 transition px-7 py-3 rounded-xl">
              Learn More
            </button>

          </div>

        </div>

        <div className="flex gap-6">

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 w-44">

            <span className="material-symbols-outlined text-emerald-400 text-4xl">
              psychology
            </span>

            <h3 className="text-white text-3xl font-bold mt-5">
              AI
            </h3>

            <p className="text-zinc-400 mt-2 text-sm">
              Smart Question Generation
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 w-44">

            <span className="material-symbols-outlined text-emerald-400 text-4xl">
              workspace_premium
            </span>

            <h3 className="text-white text-3xl font-bold mt-5">
              100%
            </h3>

            <p className="text-zinc-400 mt-2 text-sm">
              Personalized Learning
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}