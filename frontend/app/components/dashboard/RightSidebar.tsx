"use client";

interface Document {

    id: string;

    file_name: string;

    status: string;

}

interface Props {

    documents: Document[];

}

export default function RightSidebar({

    documents,

}: Props) {

    const totalDocuments = documents.length;

    const readyDocuments = documents.filter(
        (doc) => doc.status === "ready"
    ).length;

    const processingDocuments =
        totalDocuments - readyDocuments;

    const latestDocument =
        documents.length > 0
            ? documents[0].file_name
            : "-";

    const percentage =
        totalDocuments === 0
            ? 0
            : Math.round(
                (readyDocuments / totalDocuments) * 100
            );

    return (

        <div className="flex h-[360px] flex-col gap-4">

            {/* STATUS */}

            <section className="rounded-3xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 p-5 text-white">

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">

                    AI STATUS

                </span>

                <h2 className="mt-5 text-3xl font-bold">

                    SL AI

                </h2>

                <p className="mt-3 leading-7 text-violet-100">

                    Your knowledge base is ready.

                    Start chatting, generating quizzes,

                    or exploring your uploaded documents.

                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                        <p className="text-sm text-violet-200">

                            Documents

                        </p>

                        <h3 className="mt-2 text-3xl font-bold">

                            {totalDocuments}

                        </h3>

                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                        <p className="text-sm text-violet-200">

                            AI Ready

                        </p>

                        <h3 className="mt-2 text-3xl font-bold">

                            {readyDocuments}

                        </h3>

                    </div>

                </div>

                <div className="mt-4 rounded-2xl bg-white/10 p-4">

                    <p className="text-sm text-violet-200">

                        Latest Upload

                    </p>

                    <h3 className="mt-2 truncate font-semibold">

                        {latestDocument}

                    </h3>

                </div>

            </section>

            {/* KNOWLEDGE PROGRESS */}

            <section className="rounded-3xl border border-gray-100 bg-white p-5">

                <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-gray-900">

                        Knowledge Progress

                    </h2>

                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">

                        {percentage}%

                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">

                    <div
                        className="h-full rounded-full bg-violet-600 transition-all"
                        style={{
                            width: `${percentage}%`,
                        }}
                    />

                </div>

                <div className="mt-6 space-y-3 text-sm">

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Ready

                        </span>

                        <span className="font-semibold">

                            {readyDocuments}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Processing

                        </span>

                        <span className="font-semibold">

                            {processingDocuments}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="text-gray-500">

                            Total Documents

                        </span>

                        <span className="font-semibold">

                            {totalDocuments}

                        </span>

                    </div>

                </div>

            </section>

            {/* AI SUGGESTION */}

            <section className="rounded-3xl border border-gray-100 bg-white p-5">

                <h2 className="text-xl font-bold text-gray-900">

                    AI Suggestions

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Try one of these AI powered actions.

                </p>

                <div className="mt-6 space-y-4">

                    {[
                        {
                            icon: "description",
                            title: "Summarize Latest Document",
                            subtitle: "Generate a concise summary",
                        },
                        {
                            icon: "quiz",
                            title: "Generate Quiz",
                            subtitle: "Create questions instantly",
                        },
                        {
                            icon: "psychology",
                            title: "Explain Difficult Concepts",
                            subtitle: "AI explains complex topics",
                        },
                        {
                            icon: "history",
                            title: "Continue Previous Chat",
                            subtitle: "Resume your last session",
                        },
                    ].map((item) => (

                        <button
                            key={item.title}
                            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 p-4 text-left transition hover:border-violet-300 hover:bg-violet-50/60"
                        >

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">

                                    <span className="material-symbols-outlined text-violet-600">

                                        {item.icon}

                                    </span>

                                </div>

                                <div>

                                    <h3 className="font-semibold text-gray-900">

                                        {item.title}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {item.subtitle}

                                    </p>

                                </div>

                            </div>

                            <span className="material-symbols-outlined text-gray-400">

                                arrow_forward

                            </span>

                        </button>

                    ))}

                </div>

            </section>

        </div>

    );

}