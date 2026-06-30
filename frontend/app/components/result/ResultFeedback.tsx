interface ResultFeedbackProps {
    score: number;
}

export default function ResultFeedback({
    score,
}: ResultFeedbackProps) {

    const feedback =
        score >= 90
            ? {
                  title: "Outstanding Performance",
                  color: "emerald",
                  icon: "workspace_premium",
                  message:
                      "Excellent work! You demonstrated a strong understanding of the uploaded material. Your answers show that you have mastered most of the concepts discussed in this document.",
              }
            : score >= 75
            ? {
                  title: "Great Job",
                  color: "cyan",
                  icon: "thumb_up",
                  message:
                      "Very good performance. You understood most of the material, but there are still a few concepts that deserve another review. Focus on the explanations below to improve your score.",
              }
            : score >= 60
            ? {
                  title: "Keep Improving",
                  color: "amber",
                  icon: "school",
                  message:
                      "You already understand the basic concepts, but several questions indicate there are topics that still need more practice. Review the explanations carefully before trying another quiz.",
              }
            : {
                  title: "Needs More Practice",
                  color: "red",
                  icon: "menu_book",
                  message:
                      "Don't worry. Learning is a process. Read the document once again, pay attention to the AI explanations, and generate another quiz to measure your progress.",
              };

    return (

        <section
            className={`rounded-3xl border p-8 backdrop-blur-xl ${
                feedback.color === "emerald"
                    ? "border-emerald-500/20 bg-emerald-500/10"
                    : feedback.color === "cyan"
                    ? "border-cyan-500/20 bg-cyan-500/10"
                    : feedback.color === "amber"
                    ? "border-amber-500/20 bg-amber-500/10"
                    : "border-red-500/20 bg-red-500/10"
            }`}
        >

            <div className="flex items-start gap-5">

                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                        feedback.color === "emerald"
                            ? "bg-emerald-500/20"
                            : feedback.color === "cyan"
                            ? "bg-cyan-500/20"
                            : feedback.color === "amber"
                            ? "bg-amber-500/20"
                            : "bg-red-500/20"
                    }`}
                >

                    <span
                        className={`material-symbols-outlined text-4xl ${
                            feedback.color === "emerald"
                                ? "text-emerald-400"
                                : feedback.color === "cyan"
                                ? "text-cyan-400"
                                : feedback.color === "amber"
                                ? "text-amber-400"
                                : "text-red-400"
                        }`}
                    >
                        {feedback.icon}
                    </span>

                </div>

                <div>

                    <h2
                        className={`text-3xl font-bold ${
                            feedback.color === "emerald"
                                ? "text-emerald-400"
                                : feedback.color === "cyan"
                                ? "text-cyan-400"
                                : feedback.color === "amber"
                                ? "text-amber-400"
                                : "text-red-400"
                        }`}
                    >
                        {feedback.title}
                    </h2>

                    <p className="mt-5 max-w-3xl leading-8 text-zinc-300">

                        {feedback.message}

                    </p>

                </div>

            </div>

        </section>

    );

}