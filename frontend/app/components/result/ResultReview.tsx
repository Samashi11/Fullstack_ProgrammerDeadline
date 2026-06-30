interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizResult {
    answers: number[];
    quiz: {
        questions: Question[];
    };
}

interface ResultReviewProps {
    result: QuizResult;
}

export default function ResultReview({
    result,
}: ResultReviewProps) {

    return (

        <section className="space-y-8">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-4xl font-bold text-white">

                        Answer Review

                    </h2>

                    <p className="mt-2 text-zinc-400">

                        Learn from every answer with AI explanations.

                    </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">

                    <span className="text-zinc-400">

                        {result.quiz.questions.length} Questions

                    </span>

                </div>

            </div>

            {result.quiz.questions.map((question, index) => {

                const isCorrect =
                    result.answers[index] ===
                    question.correctAnswer;

                return (

                    <div
                        key={index}
                        className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                            isCorrect
                                ? "border-emerald-500/20 bg-emerald-500/5"
                                : "border-red-500/20 bg-red-500/5"
                        }`}
                    >

                        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

                            <div className="flex items-center gap-5">

                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                                        isCorrect
                                            ? "bg-emerald-500/20"
                                            : "bg-red-500/20"
                                    }`}
                                >

                                    <span
                                        className={`material-symbols-outlined text-3xl ${
                                            isCorrect
                                                ? "text-emerald-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {isCorrect
                                            ? "check"
                                            : "close"}
                                    </span>

                                </div>

                                <div>

                                    <p className="text-sm text-zinc-500">

                                        Question {index + 1}

                                    </p>

                                    <h3 className="mt-1 text-2xl font-bold text-white">

                                        {question.question}

                                    </h3>

                                </div>

                            </div>

                            <span
                                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                                    isCorrect
                                        ? "bg-emerald-500 text-white"
                                        : "bg-red-500 text-white"
                                }`}
                            >
                                {isCorrect
                                    ? "Correct"
                                    : "Wrong"}
                            </span>

                        </div>

                        <div className="grid gap-6 p-8 lg:grid-cols-2">

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

                                <p className="text-zinc-500">

                                    Your Answer

                                </p>

                                <h4 className="mt-4 text-xl text-white">

                                    {question.options[result.answers[index]]}

                                </h4>

                            </div>

                            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">

                                <p className="text-emerald-400">

                                    Correct Answer

                                </p>

                                <h4 className="mt-4 text-xl text-white">

                                    {question.options[question.correctAnswer]}

                                </h4>

                            </div>

                        </div>

                        <div className="border-t border-white/10 bg-cyan-500/5 p-8">

                            <div className="mb-4 flex items-center gap-3">

                                <span className="material-symbols-outlined text-cyan-400">

                                    psychology

                                </span>

                                <h4 className="font-bold text-cyan-400">

                                    AI Explanation

                                </h4>

                            </div>

                            <p className="leading-8 text-zinc-300">

                                {question.explanation}

                            </p>

                        </div>

                    </div>

                );

            })}

        </section>

    );

}