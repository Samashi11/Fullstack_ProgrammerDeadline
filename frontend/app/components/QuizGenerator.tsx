"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Document {
    id: string;
    title: string;
}

type Difficulty = "Easy" | "Medium" | "Hard";

export default function QuizGeneratorV2() {
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

            const res = await axios.get(
                "http://localhost:3001/api/documents",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDocuments(res.data.documents);
        } catch (err) {
            console.error(err);
        }
    };

    const generateQuiz = async () => {
        if (!selectedDocument) {
            alert("Select a mission first.");
            return;
        }

        try {
            setLoading(true);

            const token =
                localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3001/api/quizzes/generate",
                {
                    documentId: selectedDocument,
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
                res.data.quiz
            );

            router.push("/quizzes/play");
        } catch (err) {
            console.error(err);
            alert("Generate quiz failed.");
        } finally {
            setLoading(false);
        }
    };

            return (
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* Header */}

                <div className="border-b border-gray-100 px-6 py-6">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Quiz Configuration
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Choose your document and customize your quiz settings.
                    </p>

                </div>

                {/* Body */}

                <div className="space-y-6 p-6">

                    {/* Document */}

                    <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Document
                        </label>

                        <div className="relative">

                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                description
                            </span>

                            <select
                                value={selectedDocument}
                                onChange={(e) => setSelectedDocument(e.target.value)}
                                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                            >

                                <option value="">
                                    Select document...
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

                    </div>

                    {/* Difficulty */}

                    <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Difficulty
                        </label>

                        <div className="flex gap-2">

                            {(["Easy", "Medium", "Hard"] as Difficulty[]).map((item) => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setDifficulty(item)}
                                    className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                                        difficulty === item
                                            ? "border-violet-600 bg-violet-600 text-white"
                                            : "border-gray-300 bg-white text-gray-600 hover:border-violet-300"
                                    }`}
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                    </div>
                                        {/* Number of Questions */}

                    <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Number of Questions
                        </label>

                        <div className="flex gap-2">

                            {[5, 10, 20].map((count) => (

                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => setQuestionCount(count)}
                                    className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                                        questionCount === count
                                            ? "border-violet-600 bg-violet-600 text-white"
                                            : "border-gray-300 bg-white text-gray-600 hover:border-violet-300"
                                    }`}
                                >
                                    {count}
                                </button>

                            ))}

                        </div>

                    </div>

                    {/* Generate */}

                    <button
                        onClick={generateQuiz}
                        disabled={loading || !selectedDocument}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-300/30 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <span className="material-symbols-outlined text-[18px]">
                            auto_awesome
                        </span>

                        {loading ? "Generating Quiz..." : "Generate AI Quiz"}

                    </button>

                </div>

            </section>
        );
}