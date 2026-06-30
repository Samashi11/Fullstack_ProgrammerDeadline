"use client";

import { useRouter } from "next/navigation";

export default function ResultActions() {

    const router = useRouter();

    return (

        <section className="grid gap-5 md:grid-cols-2">

            <button
                onClick={() => router.push("/quizzes")}
                className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500 to-cyan-400 p-7 text-left transition-all duration-300 hover:scale-[1.02]"
            >

                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">

                    <span className="material-symbols-outlined text-5xl text-white">

                        auto_awesome

                    </span>

                    <h2 className="mt-5 text-3xl font-bold text-white">

                        Generate New Quiz

                    </h2>

                    <p className="mt-3 max-w-sm text-white/80 leading-7">

                        Challenge yourself again with a brand new AI-generated quiz from another document.

                    </p>

                </div>

            </button>

            <button
                onClick={() => router.push("/dashboard")}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-left backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:-translate-y-1"
            >

                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20" />

                <div className="relative">

                    <span className="material-symbols-outlined text-5xl text-emerald-400">

                        dashboard

                    </span>

                    <h2 className="mt-5 text-3xl font-bold text-white">

                        Back to Dashboard

                    </h2>

                    <p className="mt-3 max-w-sm leading-7 text-zinc-400">

                        Return to your workspace and continue learning with AI-powered tools.

                    </p>

                </div>

            </button>

        </section>

    );

}