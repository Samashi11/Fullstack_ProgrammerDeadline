interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizProgress({
  currentQuestion,
  totalQuestions,
}: QuizProgressProps) {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-400 text-sm">
            Progress
          </p>

          <h2 className="text-2xl font-bold text-white mt-2">
            Question {currentQuestion} of {totalQuestions}
          </h2>

        </div>

        <div className="text-emerald-400 text-xl font-bold">
          {Math.round(percentage)}%
        </div>

      </div>

      <div className="mt-6 h-3 rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </section>
  );
}