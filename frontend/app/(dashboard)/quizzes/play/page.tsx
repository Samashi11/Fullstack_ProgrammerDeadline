"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import QuizHeader from "@/app/components/QuizHeader";
import QuizProgress from "@/app/components/QuizProgress";
import QuizQuestion from "@/app/components/QuizQuestion";
import QuizNavigation from "@/app/components/QuizNavigation";

import type {
    GeneratedQuiz,
    QuizResult,
} from "@/app/types/quiz";

export default function QuizPlayPage() {
    const router = useRouter();

    const [quiz, setQuiz] = useState<GeneratedQuiz | null>(null);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState<number[]>([]);

    useEffect(() => {

        const storedQuiz = localStorage.getItem("generatedQuiz");

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

        } catch (error) {

            console.error(error);

            router.push("/quizzes");

        }

    }, [router]);

    if (!quiz) {

        return (

            <div className="flex h-screen items-center justify-center bg-background">

                <div className="flex flex-col items-center gap-5">

                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

                    <p className="text-zinc-400">

                        Preparing your AI Quiz...

                    </p>

                </div>

            </div>

        );

    }

    const submitQuiz = () => {

        const unanswered = quiz.questions.filter(

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

            score: Math.round((correct / quiz.questions.length) * 100),

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

        <div className="flex h-screen overflow-hidden bg-background text-on-background">

            <Sidebar />

            <main className="grid-background flex-1 overflow-y-auto md:ml-[280px]">

                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-8 py-10">

                    <QuizHeader
                        quiz={{
                            title: quiz.title,
                            documentName: "AI Generated Quiz",
                            difficulty: "Medium",
                            questionCount: quiz.questions.length,
                            estimatedTime: quiz.questions.length,
                        }}
                    />

                    <QuizProgress
                        currentQuestion={currentQuestion + 1}
                        totalQuestions={quiz.questions.length}
                    />

                    <QuizQuestion
                        question={quiz.questions[currentQuestion]}
                        selectedAnswer={answers[currentQuestion] ?? null}
                        onSelectAnswer={(answer) => {

                            const updatedAnswers = [...answers];

                            updatedAnswers[currentQuestion] = answer;

                            setAnswers(updatedAnswers);

                        }}
                    />

                    <QuizNavigation
                        currentQuestion={currentQuestion}
                        totalQuestions={quiz.questions.length}
                        onPrevious={() => {

                            if (currentQuestion > 0) {

                                setCurrentQuestion(currentQuestion - 1);

                            }

                        }}
                        onNext={() => {

                            if (

                                currentQuestion ===

                                quiz.questions.length - 1

                            ) {

                                submitQuiz();

                                return;

                            }

                            setCurrentQuestion(currentQuestion + 1);

                        }}
                    />

                </div>

            </main>

        </div>

    );

}