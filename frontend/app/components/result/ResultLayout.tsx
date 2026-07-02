"use client";

import Link from "next/link";

interface ResultLayoutProps {
    title: string;
    documentName: string;

    score: number;

    correct: number;
    incorrect: number;

    duration: string;

    onReview: () => void;
}

export default function ResultLayout({

    score,
    correct,
    incorrect,
    duration,
    onReview,

}: ResultLayoutProps) {

    const grade =
        score >= 85
            ? "A"
            : score >= 70
            ? "B"
            : score >= 60
            ? "C"
            : score >= 50
            ? "D"
            : "E";

    return (

        <div className="flex h-[calc(100vh-32px)] flex-col rounded-md border border-gray-300 bg-white">

            <main className="flex flex-1 flex-col items-center justify-center px-10">

                <p className="text-sm uppercase tracking-[0.35em] text-gray-500">

                    FINAL RESULT

                </p>

                <h1 className="mt-6 text-8xl font-bold text-violet-600">

                    {score}%

                </h1>

                <p className="mt-3 text-lg text-gray-500">

                    Assessment Completed

                </p>

                <div className="mt-12 w-full max-w-3xl overflow-hidden rounded border border-gray-300">

                    <div className="grid grid-cols-2">

                        <div className="border-b border-r border-gray-300 p-8 text-center">

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                Correct

                            </p>

                            <h2 className="mt-3 text-4xl font-bold text-green-600">

                                {correct}

                            </h2>

                        </div>

                        <div className="border-b border-gray-300 p-8 text-center">

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                Incorrect

                            </p>

                            <h2 className="mt-3 text-4xl font-bold text-red-600">

                                {incorrect}

                            </h2>

                        </div>

                        <div className="border-r border-gray-300 p-8 text-center">

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                Duration

                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900">

                                {duration}

                            </h2>

                        </div>

                        <div className="p-8 text-center">

                            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">

                                Grade

                            </p>

                            <h2 className="mt-3 text-4xl font-bold text-violet-600">

                                {grade}

                            </h2>

                        </div>

                    </div>

                </div>
                                <div className="mt-10 flex w-full max-w-3xl items-center justify-between">

                    <button
                        onClick={onReview}
                        className="flex h-11 items-center gap-2 rounded border border-violet-600 px-6 text-sm font-semibold text-violet-600 transition hover:bg-violet-50/60"
                    >

                        <span className="material-symbols-outlined">

                            menu_book

                        </span>

                        Review Answers

                    </button>

                    <Link
                        href="/dashboard"
                        className="flex h-11 items-center gap-2 rounded bg-violet-600 px-7 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >

                        Finish

                        <span className="material-symbols-outlined text-[18px]">

                            arrow_forward

                        </span>

                    </Link>

                </div>

            </main>

        </div>

    );

}