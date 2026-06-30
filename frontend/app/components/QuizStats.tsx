const stats = [
  {
    title: "Documents",
    value: "5",
    icon: "description",
    color: "emerald",
  },
  {
    title: "Quizzes",
    value: "0",
    icon: "quiz",
    color: "cyan",
  },
  {
    title: "Best Score",
    value: "--",
    icon: "workspace_premium",
    color: "amber",
  },
  {
    title: "AI Status",
    value: "Ready",
    icon: "psychology",
    color: "emerald",
  },
];

export default function QuizStats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">
                {stat.title}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                {stat.value}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="material-symbols-outlined text-emerald-400 text-3xl">
                {stat.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}