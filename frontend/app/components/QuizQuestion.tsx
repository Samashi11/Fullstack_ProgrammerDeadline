interface QuizQuestionProps {
    question: {
        id: number;
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    };
    selectedAnswer: number | null;
    onSelectAnswer: (answer: number) => void;
}

export default function QuizQuestion({
    question,
    selectedAnswer,
    onSelectAnswer,
}: QuizQuestionProps) {
    return (
        <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <div className="mb-8">

                <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">

                    Question {question.id}

                </span>

                <h2 className="mt-6 text-3xl font-bold text-white leading-relaxed">

                    {question.question}

                </h2>

            </div>

            <div className="space-y-4">

                {question.options.map((option, index) => {

                    const selected = selectedAnswer === index;

                    return (

                        <button
                            key={index}
                            onClick={() => onSelectAnswer(index)}
                            className={`group flex w-full items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-300 ${
                                selected
                                    ? "border-emerald-500 bg-emerald-500/10"
                                    : "border-white/10 bg-black/20 hover:border-emerald-500/40 hover:bg-white/5"
                            }`}
                        >

                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all ${
                                    selected
                                        ? "bg-emerald-500 text-white"
                                        : "bg-white/10 text-zinc-400 group-hover:bg-emerald-500/20"
                                }`}
                            >
                                {String.fromCharCode(65 + index)}
                            </div>

                            <p className="flex-1 text-lg text-white">

                                {option}

                            </p>

                        </button>

                    );

                })}

            </div>

        </section>
    );
}