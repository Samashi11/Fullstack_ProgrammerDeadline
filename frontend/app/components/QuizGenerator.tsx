"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Document {
    id: string;
    title: string;
}

type Difficulty = "Easy" | "Medium" | "Hard";

export default function QuizGenerator() {
    const router = useRouter();

    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDocument, setSelectedDocument] = useState("");

    const [difficulty, setDifficulty] =
        useState<Difficulty>("Medium");

    const [questionCount, setQuestionCount] =
        useState(10);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        fetchDocuments();

    }, []);

    const fetchDocuments = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "http://localhost:3001/api/documents",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            setDocuments(
                response.data.documents
            );

        } catch (error) {

            console.error(error);

        }

    };

    const generateQuiz = async () => {

        if (!selectedDocument) {

            alert(
                "Please select a document first."
            );

            return;

        }

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");

            const response =
                await axios.post(
                    "http://localhost:3001/api/quizzes/generate",
                    {
                        documentId:
                            selectedDocument,
                        difficulty,
                        questionCount,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            localStorage.setItem(
                "generatedQuiz",
                response.data.quiz
            );

            router.push(
                "/quizzes/play"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to generate quiz."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative p-8">

                <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">

                        <span className="material-symbols-outlined text-4xl text-emerald-400">

                            auto_awesome

                        </span>

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold text-white">

                            AI Quiz Generator

                        </h2>

                        <p className="mt-1 text-zinc-400">

                            Generate intelligent quizzes from your uploaded documents.

                        </p>

                    </div>

                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">

                    <div>

                        <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">

                            <span className="material-symbols-outlined text-lg">

                                description

                            </span>

                            Document

                        </label>

                        <select
                            value={selectedDocument}
                            onChange={(e) =>
                                setSelectedDocument(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition focus:border-emerald-500"
                        >

                            <option value="">

                                Select Document

                            </option>

                            {documents.map((doc) => (

                                <option
                                    key={doc.id}
                                    value={doc.id}
                                >

                                    {doc.title}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">

                            <span className="material-symbols-outlined text-lg">

                                timer

                            </span>

                            Estimated Time

                        </label>

                        <div className="flex h-[58px] items-center rounded-2xl border border-white/10 bg-black/20 px-5 text-white">

                            {questionCount} Minutes

                        </div>

                    </div>
                    <div>

                        <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">

                            <span className="material-symbols-outlined text-lg">

                                military_tech

                            </span>

                            Difficulty

                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            {(["Easy", "Medium", "Hard"] as Difficulty[]).map(
                                (item) => (

                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() =>
                                            setDifficulty(item)
                                        }
                                        className={`rounded-2xl border px-5 py-4 font-semibold transition-all duration-300 ${difficulty === item
                                                ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,.35)]"
                                                : "border-white/10 bg-black/20 text-zinc-400 hover:border-emerald-500/50 hover:text-white"
                                            }`}
                                    >

                                        {item}

                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    <div>

                        <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">

                            <span className="material-symbols-outlined text-lg">

                                quiz

                            </span>

                            Number of Questions

                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            {[5, 10, 20].map((count) => (

                                <button
                                    key={count}
                                    type="button"
                                    onClick={() =>
                                        setQuestionCount(count)
                                    }
                                    className={`rounded-2xl border px-5 py-4 text-lg font-bold transition-all duration-300 ${questionCount === count
                                            ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,.35)]"
                                            : "border-white/10 bg-black/20 text-zinc-400 hover:border-emerald-500/50 hover:text-white"
                                        }`}
                                >

                                    {count}

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-zinc-500">

                                Selected Difficulty

                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-white">

                                {difficulty}

                            </h3>

                        </div>

                        <div>

                            <p className="text-sm text-zinc-500">

                                Total Questions

                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-white">

                                {questionCount}

                            </h3>

                        </div>

                    </div>

                </div>
                <button
                    type="button"
                    onClick={generateQuiz}
                    disabled={loading}
                    className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 px-8 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >

                    {loading ? (

                        <>

                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />

                            Generating Quiz...

                        </>

                    ) : (

                        <>

                            <span className="material-symbols-outlined">

                                auto_awesome

                            </span>

                            Generate AI Quiz

                        </>

                    )}

                </button>

            </div>

        </section>

    );

}