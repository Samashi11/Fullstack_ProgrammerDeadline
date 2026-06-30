interface ResultStatsProps {
    score: number;
    correct: number;
    total: number;
}

interface CardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
}

export default function ResultStats({
    score,
    correct,
    total,
}: ResultStatsProps) {

    const stats = [
        {
            title: "Final Score",
            value: `${score}%`,
            icon: "workspace_premium",
            color: "emerald",
        },
        {
            title: "Correct",
            value: correct,
            icon: "check_circle",
            color: "cyan",
        },
        {
            title: "Wrong",
            value: total - correct,
            icon: "cancel",
            color: "red",
        },
        {
            title: "Accuracy",
            value: `${Math.round((correct / total) * 100)}%`,
            icon: "analytics",
            color: "amber",
        },
    ];

    return (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => (

                <Card
                    key={item.title}
                    {...item}
                />

            ))}

        </section>
    );
}

function Card({
    title,
    value,
    icon,
    color,
}: CardProps) {

    const bg =
        color === "emerald"
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            : color === "cyan"
            ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
            : color === "amber"
            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
            : "bg-red-500/10 border-red-500/20 text-red-400";

    return (

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/20">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl transition-all group-hover:bg-emerald-500/20" />

            <div className="relative">

                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${bg}`}>

                    <span className="material-symbols-outlined text-4xl">

                        {icon}

                    </span>

                </div>

                <p className="mt-6 text-zinc-500">

                    {title}

                </p>

                <h2 className="mt-2 text-5xl font-black text-white">

                    {value}

                </h2>

            </div>

        </div>

    );

}