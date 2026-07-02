export default function QuizHero() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-violet-600">
            AI Quiz Generator
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Knowledge Quizzes
          </h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Generate AI-powered quizzes instantly from your uploaded documents.
          </p>

        </div>

        <button
          className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          Generate Quiz
        </button>

      </div>

    </section>
  );
}