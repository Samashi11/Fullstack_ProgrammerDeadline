interface QuizNavigationProps {
    currentQuestion: number;
    totalQuestions: number;
    onPrevious: () => void;
    onNext: () => void;
}

export default function QuizNavigation({
    currentQuestion,
    totalQuestions,
    onPrevious,
    onNext,
}: QuizNavigationProps) {
    const isFirst = currentQuestion === 0;
    const isLast = currentQuestion === totalQuestions - 1;

    return (
        <section className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <button
                onClick={onPrevious}
                disabled={isFirst}
                className={`flex items-center gap-2 rounded-2xl px-6 py-4 font-semibold transition-all ${
                    isFirst
                        ? "cursor-not-allowed border border-white/10 bg-white/5 text-zinc-600"
                        : "border border-white/10 bg-black/20 text-white hover:border-emerald-500 hover:bg-white/5"
                }`}
            >
                <span className="material-symbols-outlined">
                    arrow_back
                </span>

                Previous
            </button>

            <div className="text-center">

                <p className="text-sm text-zinc-500">
                    Question
                </p>

                <h3 className="mt-1 text-xl font-bold text-white">
                    {currentQuestion + 1} / {totalQuestions}
                </h3>

            </div>

            <button
                onClick={onNext}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 px-6 py-4 font-semibold text-white shadow-[0_0_30px_rgba(16,185,129,.35)] transition-all hover:scale-105"
            >
                {isLast ? "Finish Quiz" : "Next"}

                <span className="material-symbols-outlined">
                    {isLast ? "flag" : "arrow_forward"}
                </span>

            </button>

        </section>
    );
}