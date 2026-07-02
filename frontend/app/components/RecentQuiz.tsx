const history = [
  {
    id: 1,
    title: "Machine Learning.pdf",
    score: "92%",
    questions: 10,
    date: "Today",
  },
  {
    id: 2,
    title: "Database.pdf",
    score: "85%",
    questions: 20,
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Network Security.pdf",
    score: "100%",
    questions: 5,
    date: "2 days ago",
  },
];

export default function RecentQuiz() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">

      <div className="flex items-center justify-between border-b border-gray-200 p-5">

        <div>

          <h2 className="text-lg font-semibold text-gray-900">
            Quiz History
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your recent quiz attempts.
          </p>

        </div>

      </div>

      <div className="max-h-[470px] divide-y divide-gray-100 overflow-y-auto">

        {history.map((item) => (

          <div
            key={item.id}
            className="flex items-start justify-between p-5 transition hover:bg-violet-50"
          >

            <div className="flex gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">

                <span className="material-symbols-outlined text-violet-600 text-[20px]">
                  description
                </span>

              </div>

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.questions} Questions • {item.date}
                </p>

              </div>

            </div>

            <div className="text-right">

              <div className="flex justify-end">

  <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
    {item.score}
  </span>

</div>

              <button
  className="mt-3 flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-800 transition"
>

  <span className="material-symbols-outlined text-[16px]">
    replay
  </span>

  Play Again

</button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}