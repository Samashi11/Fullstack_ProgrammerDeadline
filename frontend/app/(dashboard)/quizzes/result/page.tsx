"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";

import ResultHero from "@/app/components/result/ResultHero";
import ResultStats from "@/app/components/result/ResultStats";
import ResultFeedback from "@/app/components/result/ResultFeedback";
import ResultActions from "@/app/components/result/ResultActions";
import ResultReview from "@/app/components/result/ResultReview";

import type { QuizResult } from "@/app/types/quiz";

export default function QuizResultPage() {
    const router = useRouter();

    const [result, setResult] = useState<QuizResult | null>(null);

    useEffect(() => {

        const storedResult = localStorage.getItem("quizResult");

        if (!storedResult) {

            router.push("/quizzes");

            return;

        }

        try {

            const parsedResult: QuizResult = JSON.parse(storedResult);

            setResult(parsedResult);

        } catch (error) {

            console.error(error);

            router.push("/quizzes");

        }

    }, [router]);

    if (!result) {

        return (

            <div className="flex h-screen items-center justify-center bg-background">

                <div className="flex flex-col items-center gap-5">

                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />

                    <p className="text-zinc-400">

                        Preparing your AI Report...

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="flex h-screen bg-background text-white">

            <Sidebar />

            <main className="flex-1 overflow-y-auto md:ml-[280px]">

                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-8 py-10">

                    <ResultHero
                        score={result.score}
                    />

                    <ResultStats
                        score={result.score}
                        correct={result.correct}
                        total={result.total}
                    />

                    <ResultFeedback
                        score={result.score}
                    />

                    <ResultActions />

                    <ResultReview
                        result={result}
                    />

                </div>

            </main>

        </div>

    );

}