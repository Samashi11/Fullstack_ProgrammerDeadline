const stats = [
  {
    title: "Documents",
    value: "12",
    icon: "description",
  },
  {
    title: "Quizzes",
    value: "28",
    icon: "quiz",
  },
  {
    title: "Best Score",
    value: "92%",
    icon: "workspace_premium",
  },
  {
    title: "AI Status",
    value: "Ready",
    icon: "psychology",
  },
];

export default function QuizStats() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="rounded-xl border border-gray-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                {stat.value}
              </h2>

            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">

              <span className="material-symbols-outlined text-violet-600">
                {stat.icon}
              </span>

            </div>

          </div>

        </div>

      ))}

    </section>
  );
}