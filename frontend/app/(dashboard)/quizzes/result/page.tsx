"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ResultLayout from "@/app/components/result/ResultLayout";

import type { QuizResult } from "@/app/types/quiz";

export default function QuizResultPage() {

    const router = useRouter();

    const [result, setResult] =
        useState<QuizResult | null>(null);

    const [duration, setDuration] =
        useState("08:34");

    useEffect(() => {

        const stored =
            localStorage.getItem("quizResult");

        if (!stored) {

            router.push("/quizzes");

            return;

        }

        try {

            setResult(JSON.parse(stored));

        } catch {

            router.push("/quizzes");

        }

    }, [router]);

    if (!result) {

        return (

            <div className="flex h-screen items-center justify-center bg-gray-100">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />

                    <p className="text-gray-500">

                        Loading Result...

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="bg-[#f3f3f3] p-4">

            <ResultLayout
                title={result.quiz.title}
                documentName="AI Generated Quiz"
                score={result.score}
                correct={result.correct}
                incorrect={
                    result.total - result.correct
                }
                duration={duration}
                onReview={() => {

                    router.push(
                        "/quizzes/result/review"
                    );

                }}
            />

        </div>

    );

}