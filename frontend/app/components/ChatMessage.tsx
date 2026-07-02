import React from "react";

interface ChatMessageProps {
    type: "user" | "ai";
    children: React.ReactNode;
    citations?: string[];
    isLast?: boolean;
}

export default function ChatMessage({

    type,
    children,
    citations,
    isLast,

}: ChatMessageProps) {

    if (type === "user") {

        return (

            <div className="flex justify-end">

                <div className="flex max-w-[75%] items-start gap-3">

                    <div className="rounded-2xl rounded-tr-md bg-violet-600 px-5 py-4 text-white shadow-sm">

                        {typeof children === "string"

                            ? (

                                <p className="text-[15px] leading-7">

                                    {children}

                                </p>

                            )

                            : children}

                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">

                        <span className="material-symbols-outlined">

                            person

                        </span>

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div className={`flex justify-start ${isLast ? "mb-28" : ""}`}>

            <div className="flex max-w-[85%] items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">

                    <span className="material-symbols-outlined">

                        smart_toy

                    </span>

                </div>

                <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-white px-6 py-5 shadow-sm">

                    <div className="mb-3 flex items-center gap-2">

                        <h3 className="text-sm font-semibold text-gray-900">

                            SLAI

                        </h3>

                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">

                            AI

                        </span>

                    </div>

                    <div className="prose prose-sm max-w-none text-gray-700">

                        {children}

                    </div>

                    {citations && citations.length > 0 && (

                        <div className="mt-6 border-t border-gray-200 pt-4">

                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">

                                Sources

                            </p>

                            <div className="flex flex-wrap gap-2">

                                {citations.map((page, index) => (

                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700"
                                    >

                                        <span className="material-symbols-outlined text-[16px]">

                                            description

                                        </span>

                                        {page}

                                    </span>

                                ))}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}