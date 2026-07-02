"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuizLayout from "@/app/components/QuizLayout";

import type {
    GeneratedQuiz,
    QuizResult,
} from "@/app/types/quiz";

export default function QuizPlayPage() {

    const router = useRouter();

    const [quiz, setQuiz] =
        useState<GeneratedQuiz | null>(null);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState<number[]>([]);

    useEffect(() => {

        const storedQuiz =
            localStorage.getItem("generatedQuiz");

        if (!storedQuiz) {

            router.push("/quizzes");

            return;

        }

        try {

            const cleanQuiz = storedQuiz
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            setQuiz(JSON.parse(cleanQuiz));

        } catch {

            router.push("/quizzes");

        }

    }, [router]);

    if (!quiz) {

        return (

            <div className="flex h-screen items-center justify-center bg-gray-100">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>

                    <p className="text-gray-500">

                        Preparing your AI Quiz...

                    </p>

                </div>

            </div>

        );

    }
    const submitQuiz = () => {

        const unanswered =
            quiz.questions.filter(
                (_, index) => answers[index] === undefined
            ).length;

        if (unanswered > 0) {

            alert(`Masih ada ${unanswered} soal yang belum dijawab.`);

            return;

        }

        let correct = 0;

        quiz.questions.forEach((question, index) => {

            if (answers[index] === question.correctAnswer) {

                correct++;

            }

        });

        const result: QuizResult = {

            score: Math.round(
                (correct / quiz.questions.length) * 100
            ),

            correct,

            total: quiz.questions.length,

            answers,

            quiz,

        };

        localStorage.setItem(
            "quizResult",
            JSON.stringify(result)
        );

        router.push("/quizzes/result");

    };

    return (

    <div className="min-h-screen bg-[#f3f3f3]">

        <main className="mx-auto w-full max-w-[1700px] p-4">
                    <QuizLayout
                        title={quiz.title}
                        documentName={quiz.documentName}
                        questions={quiz.questions}
                        currentQuestion={currentQuestion}
                        answers={answers}
                        onSelectAnswer={(answer) => {

                            const updated = [...answers];

                            updated[currentQuestion] = answer;

                            setAnswers(updated);

                        }}
                        onJumpQuestion={(index) => setCurrentQuestion(index)}
                        onPrevious={() => {

                            if (currentQuestion > 0) {

                                setCurrentQuestion(currentQuestion - 1);

                            }

                        }}
                        onNext={() => {

                            if (currentQuestion === quiz.questions.length - 1) {

                                submitQuiz();

                                return;

                            }

                            setCurrentQuestion(currentQuestion + 1);

                        }}
                    />

                        </main>

    </div>

    );

}
