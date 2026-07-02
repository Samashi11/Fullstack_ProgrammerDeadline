"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { QuizResult } from "@/app/types/quiz";

export default function ReviewAnswerPage() {

    const router = useRouter();

    const [result, setResult] =
        useState<QuizResult | null>(null);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

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

                        Loading Review...

                    </p>

                </div>

            </div>

        );

    }

    const question =
        result.quiz.questions[currentQuestion];

    const userAnswer =
        result.answers[currentQuestion];

    const correctAnswer =
        question.correctAnswer;

    return (

        <div className="min-h-screen bg-[#f3f3f3] p-4">

            <div className="mx-auto flex h-[calc(100vh-32px)] max-w-7xl flex-col overflow-hidden rounded-md border border-gray-300 bg-white">

                {/* HEADER */}

                <header className="border-b border-gray-300 px-6 py-4">

                    <h1 className="text-lg font-semibold text-gray-900">

                        Review Answers

                    </h1>

                    <p className="mt-1 text-sm text-gray-500">

                        Review your answers and AI explanations.

                    </p>

                </header>

                {/* NAVIGATOR */}

                <div className="border-b border-gray-300 px-6 py-4">

                    <div className="flex flex-wrap gap-2">

                        {result.quiz.questions.map(

                            (_, index) => {

                                const active =
                                    index === currentQuestion;

                                const correct =
                                    result.answers[index] ===
                                    result.quiz.questions[index].correctAnswer;

                                return (

                                    <button
                                        key={index}
                                        onClick={() =>
                                            setCurrentQuestion(index)
                                        }
                                        className={`flex h-10 w-10 items-center justify-center rounded border text-sm font-semibold transition

                                        ${active
                                                ? "border-violet-600 bg-violet-600 text-white"

                                                : correct
                                                    ? "border-green-600 bg-green-600 text-white"

                                                    : "border-red-600 bg-red-600 text-white"

                                            }`}
                                    >

                                        {index + 1}

                                    </button>

                                );

                            }

                        )}

                    </div>

                </div>

                {/* BODY */}

                <main className="flex-1 overflow-y-auto px-10 py-8">

                    <p className="text-sm text-gray-500">

                        Question {currentQuestion + 1} of {result.total}

                    </p>

                    <h2 className="mt-4 text-2xl font-semibold leading-9 text-gray-900">

                        {question.question}

                    </h2>

                    <div className="mt-10 space-y-4">

                        {question.options.map((option, index) => {

                            const isCorrect =
                                index === correctAnswer;

                            const isUser =
                                index === userAnswer;

                            return (

                                <div
                                    key={index}
                                    className={`rounded border px-6 py-5

                                ${isCorrect

                                            ? "border-green-600 bg-green-50"

                                            : isUser

                                                ? "border-red-600 bg-red-50"

                                                : "border-gray-300 bg-white"

                                        }`}
                                >

                                    <div className="flex items-start gap-4">

                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold

                                        ${isCorrect

                                                    ? "border-green-600 bg-green-600 text-white"

                                                    : isUser

                                                        ? "border-red-600 bg-red-600 text-white"

                                                        : "border-gray-400 bg-white text-gray-700"

                                                }`}
                                        >

                                            {String.fromCharCode(65 + index)}

                                        </div>

                                        <div className="flex-1">

                                            <p className="text-base leading-7 text-gray-900">

                                                {option}

                                            </p>

                                            {isUser && !isCorrect && (

                                                <p className="mt-3 text-sm font-medium text-red-600">

                                                    ❌ Your Answer

                                                </p>

                                            )}

                                            {isCorrect && (

                                                <p className="mt-3 text-sm font-medium text-green-600">

                                                    ✅ Correct Answer

                                                </p>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                    {/* AI EXPLANATION */}

                    <section className="mt-10 rounded border border-gray-300 bg-gray-50 p-6">

                        <div className="flex items-center gap-3">

                            <span className="material-symbols-outlined text-violet-600">

                                auto_awesome

                            </span>

                            <h3 className="text-lg font-semibold text-gray-900">

                                AI Explanation

                            </h3>

                        </div>

                        <p className="mt-5 leading-8 text-gray-700">

                            {question.explanation}

                        </p>

                    </section>

                </main>

                {/* FOOTER */}

                <footer className="border-t border-gray-300 bg-white">

                    <div className="flex items-center justify-between px-8 py-4">
                        <button
                            type="button"
                            onClick={() => {

                                if (currentQuestion > 0) {

                                    setCurrentQuestion(
                                        currentQuestion - 1
                                    );

                                }

                            }}
                            disabled={currentQuestion === 0}
                            className={`flex h-11 items-center gap-2 rounded border px-6 text-sm font-medium transition

                            ${currentQuestion === 0

                                    ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"

                                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"

                                }`}
                        >

                            <span className="material-symbols-outlined">

                                arrow_back

                            </span>

                            Previous

                        </button>

                        <div className="text-center">

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                Question

                            </p>

                            <p className="mt-2 text-base font-semibold text-gray-900">

                                {currentQuestion + 1} / {result.total}

                            </p>

                        </div>

                        <div className="flex items-center gap-3">

                            {currentQuestion === result.total - 1 ? (

                                <button
                                    type="button"
                                    onClick={() =>
                                        router.push("/quizzes/result")
                                    }
                                    className="flex h-11 items-center gap-2 rounded bg-violet-600 px-7 text-sm font-semibold text-white transition hover:bg-violet-700"
                                >

                                    Back to Result

                                    <span className="material-symbols-outlined">

                                        assignment

                                    </span>

                                </button>

                            ) : (

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentQuestion(
                                            currentQuestion + 1
                                        )
                                    }
                                    className="flex h-11 items-center gap-2 rounded bg-violet-600 px-7 text-sm font-semibold text-white transition hover:bg-violet-700"
                                >

                                    Next Question

                                    <span className="material-symbols-outlined">

                                        arrow_forward

                                    </span>

                                </button>

                            )}

                        </div>

                    </div>

                </footer>

            </div>

        </div>

    );

}