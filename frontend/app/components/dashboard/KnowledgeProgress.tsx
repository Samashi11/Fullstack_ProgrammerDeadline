"use client";

interface Document {

    status: string;

}

interface KnowledgeProgressProps {

    documents: Document[];

}

export default function KnowledgeProgress({

    documents,

}: KnowledgeProgressProps) {

    const total = documents.length;

    const ready = documents.filter(
        (d) => d.status === "ready"
    ).length;

    const processing = total - ready;

    const progress =
        total === 0
            ? 0
            : Math.round((ready / total) * 100);

    return (

        <section className="rounded-3xl border border-gray-100 bg-white p-8">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-gray-900">

                    Knowledge Progress

                </h2>

                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-600">

                    {progress}%

                </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-gray-100">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-700 transition-all duration-700"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

            <div className="mt-8 space-y-5">

                <div className="flex items-center justify-between">

                    <span className="text-gray-500">

                        Ready

                    </span>

                    <span className="font-semibold">

                        {ready}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <span className="text-gray-500">

                        Processing

                    </span>

                    <span className="font-semibold">

                        {processing}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <span className="text-gray-500">

                        Total Documents

                    </span>

                    <span className="font-semibold">

                        {total}

                    </span>

                </div>

            </div>

        </section>

    );

}