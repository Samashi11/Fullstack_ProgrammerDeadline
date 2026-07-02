"use client";

import { useEffect, useState } from "react";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizLayoutProps {
    title: string;
    documentName: string;
    questions: Question[];
    currentQuestion: number;
    answers: number[];
    onSelectAnswer: (answer: number) => void;
    onJumpQuestion: (index: number) => void;
    onPrevious: () => void;
    onNext: () => void;
}

export default function QuizLayout({
    title,
    documentName,
    questions,
    currentQuestion,
    answers,
    onSelectAnswer,
    onJumpQuestion,
    onPrevious,
    onNext,
}: QuizLayoutProps) {

    const question = questions[currentQuestion];

    const percentage =
        ((currentQuestion + 1) / questions.length) * 100;

    const [timeLeft, setTimeLeft] =
        useState(questions.length * 90);


        useEffect(() => {

    const handler = (e: BeforeUnloadEvent) => {

        e.preventDefault();

        e.returnValue = "";

    };

    window.addEventListener(
        "beforeunload",
        handler
    );

    return () =>
        window.removeEventListener(
            "beforeunload",
            handler
        );

}, []);

    useEffect(() => {

        if (timeLeft <= 0) {

    onNext();

    return;

}

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    useEffect(() => {

        const handler = (e: KeyboardEvent) => {

            if (e.key === "ArrowRight") {

                onNext();

            }

            if (e.key === "ArrowLeft") {

                onPrevious();

            }

            const key = e.key.toLowerCase();

const number = Number(e.key);

            

if (key === "a") {

    onSelectAnswer(0);

}

if (key === "b") {

    onSelectAnswer(1);

}

if (key === "c") {

    onSelectAnswer(2);

}

if (key === "d") {

    onSelectAnswer(3);

}

if (e.key === "Enter") {

    onNext();

}

            if (
                number >= 1 &&
                number <= questions.length
            ) {

                onJumpQuestion(number - 1);

            }

        };

        window.addEventListener("keydown", handler);

        return () =>
            window.removeEventListener(
                "keydown",
                handler
            );

    }, [
        questions.length,
        onJumpQuestion,
        onNext,
        onPrevious,
    ]);

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    return (

        <div className="select-none flex h-[calc(100vh-32px)] w-full flex-col rounded-md border border-gray-300 bg-white">

            {/* ================= HEADER ================= */}

            <header className="border-b border-gray-300 bg-white">
                <div className="flex items-center justify-between px-6 py-3">

                    <div>

                        <h1 className="text-base font-semibold text-gray-900">

                            AI Knowledge Assessment

                        </h1>

                        <p className="mt-0.5 text-xs text-gray-500">

                            {title}

                        </p>

                    </div>

                    <div className="flex items-center gap-10">

                        <div className="text-right">

                            <p className="text-xs uppercase tracking-wide text-gray-500">

                                Time Left

                            </p>

                            <p
                                className={`mt-0.5 text-xl font-semibold leading-8 ${
                                    timeLeft < 60
                                        ? "text-red-600"
                                        : timeLeft < 300
                                        ? "text-amber-500"
                                        : "text-gray-900"
                                }`}
                            >

                                {String(minutes).padStart(2, "0")}:
                                {String(seconds).padStart(2, "0")}

                            </p>

                        </div>

                        <div className="h-10 w-px bg-gray-300"></div>

                        <div className="text-right">

                            <p className="text-xs uppercase tracking-wide text-gray-500">

                                Document

                            </p>

                            <p className="mt-0.5 max-w-[220px] truncate text-xs font-medium text-gray-800">

                                {documentName}

                            </p>

                        </div>

                    </div>

                </div>

            </header>

            {/* ================= NAVIGATOR ================= */}

            <div className="border-b border-gray-100 px-8 py-3">

                <div className="flex flex-wrap gap-1.5">
                                        {questions.map((_, index) => {

                        const active =
                            currentQuestion === index;

                        const answered =
                            answers[index] !== undefined;

                        return (

                            <button
                                key={index}
                                onClick={() => onJumpQuestion(index)}
                                className={`flex h-9 w-9 items-center justify-center rounded border text-sm font-semibold transition-all duration-200

                                ${
                                    active
                                        ? "border-violet-600 bg-violet-600 text-white"

                                        : answered
                                        ? "border-green-600 bg-green-600 text-white"

                                        : "border-gray-300 bg-white text-gray-700 hover:border-violet-500 hover:bg-violet-50/60"

                                }`}
                            >

                                {index + 1}

                            </button>

                        );

                    })}

                </div>

            </div>

            {/* ================= PROGRESS ================= */}

            <div className="border-b border-gray-100 px-6 py-2">

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-gray-600">

                        Progress

                    </span>

                    <span className="text-sm font-semibold text-gray-900">

                        {Math.round(percentage)}%

                    </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">

                    <div
                        className="h-full rounded-full bg-violet-600 transition-all duration-300"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />

                </div>

            </div>

            {/* ================= QUESTION ================= */}

            <main className="flex-1 overflow-y-auto px-8 py-6">

                <p className="text-[15px] font-medium text-gray-500">

                    Question {currentQuestion + 1} of {questions.length}

                </p>

                <h2 className="mt-3 max-w-5xl text-xl font-semibold leading-8 tracking-[-0.02em] text-black">

                    {question.question}

                </h2>

                <div className="mt-8 flex flex-col gap-3">

                    {question.options.map((option, index) => {

                        const selected =
                            answers[currentQuestion] === index;

                        return (

                            <button
    key={index}
    draggable={false}
    onClick={() => onSelectAnswer(index)}
                                className={`flex h-12 w-full items-center gap-5 rounded border px-5 py-3 text-left transition-all duration-200

                                ${
                                    selected

                                        ? "border-violet-600 bg-violet-50"

                                        : "border-gray-300 bg-white hover:bg-violet-50 hover:border-violet-500"

                                }`}
                            >

                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold

                                    ${
                                        selected

                                            ? "border-violet-600 bg-violet-600 text-white"

                                            : "border-gray-400 bg-white text-gray-700"

                                    }`}
                                >

                                    {String.fromCharCode(65 + index)}

                                </div>

                                <div className="flex-1 pt-1">

                                    <p className="text-base leading-6 text-black">

                                        {option}

                                    </p>

                                </div>

                            </button>

                        );

                    })}

                </div>

            </main>

            {/* ================= FOOTER ================= */}

            <footer className="sticky bottom-0 z-20 border-t border-gray-300 bg-white">

                <div className="flex items-center justify-between px-6 py-3">
                                        <button
                        type="button"
                        onClick={onPrevious}
                        disabled={currentQuestion === 0}
                        className={`flex h-10 items-center gap-2 rounded border px-5 text-sm font-medium transition-all duration-200 ${
                            currentQuestion === 0
                                ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >

                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>

                        Previous

                    </button>

                    <div className="text-center">

                        <p className="text-xs uppercase tracking-wide text-gray-500">

                            Question

                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">

                            {currentQuestion + 1} / {questions.length}

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onNext}
                        className={`flex h-11 items-center gap-2 rounded px-6 text-sm font-semibold text-white transition-all duration-200

                        ${
                            currentQuestion === questions.length - 1
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-violet-600 hover:bg-violet-700"
                        }`}
                    >

                        {currentQuestion === questions.length - 1
                            ? "Submit Assessment"
                            : "Next"}

                        <span className="material-symbols-outlined text-[18px]">

                            {currentQuestion === questions.length - 1
                                ? "task_alt"
                                : "arrow_forward"}

                        </span>

                    </button>

                </div>

            </footer>

        </div>

    );

}