interface ResultHeroProps {
    score: number;
}

export default function ResultHero({
    score,
}: ResultHeroProps) {

    const status =
        score >= 90
            ? "Outstanding"
            : score >= 75
            ? "Excellent"
            : score >= 60
            ? "Good Job"
            : "Keep Learning";

    return (

        <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-10">

            <div className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                <div className="max-w-2xl">

                    <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-400">

                        <span className="material-symbols-outlined">

                            workspace_premium

                        </span>

                        Quiz Finished Successfully

                    </div>

                    <h1 className="mt-6 text-5xl font-black text-white">

                        {status}

                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">

                        Your answers have been analyzed by AI.
                        Review your performance, understand every mistake,
                        and continue improving your knowledge.

                    </p>

                    <div className="mt-10 flex flex-wrap gap-6">

                        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">

                            <p className="text-sm text-zinc-500">

                                Accuracy

                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-white">

                                {score}%

                            </h3>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">

                            <p className="text-sm text-zinc-500">

                                AI Evaluation

                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-emerald-400">

                                {status}

                            </h3>

                        </div>

                    </div>

                </div>

                <div className="relative flex items-center justify-center">

                    <div className="absolute h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="relative flex h-56 w-56 flex-col items-center justify-center rounded-full border-[12px] border-emerald-500 bg-background shadow-[0_0_60px_rgba(16,185,129,.35)]">

                        <span className="text-6xl font-black text-emerald-400">

                            {score}

                        </span>

                        <span className="mt-2 text-xl font-semibold text-white">

                            /100

                        </span>

                    </div>

                </div>

            </div>

        </section>

    );

}