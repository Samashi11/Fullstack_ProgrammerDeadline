"use client";

import { useRef, useState } from "react";

interface ChatInputProps {

    onSend: (query: string) => void;

    documents: any[];

    selectedDocument: string;

    setSelectedDocument: (id: string) => void;

}

export default function ChatInput({

    onSend,

    documents,

    selectedDocument,

    setSelectedDocument,

}: ChatInputProps) {

    const [query, setQuery] = useState("");

    const inputRef =
        useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {

        if (!query.trim()) return;

        onSend(query);

        setQuery("");

        if (inputRef.current) {

            inputRef.current.style.height = "24px";

            inputRef.current.focus();

        }

    };

    return (

        <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white px-6 py-3">

            <div className="mx-auto flex max-w-4xl items-end gap-2 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 transition focus-within:border-violet-500 focus-within:bg-white focus-within:shadow-md">

                {/* ATTACH */}

                <select
                    value={selectedDocument}
                    onChange={(e) => setSelectedDocument(e.target.value)}
                    className="h-9 min-w-[220px] rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-violet-500"
                >

                    <option value="">
                        All Documents
                    </option>

                    {documents.map((doc) => (

                        <option
                            key={doc.id}
                            value={doc.id}
                        >
                            {doc.originalName ?? doc.filename ?? doc.title}
                        </option>

                    ))}

                </select>

                {/* INPUT */}

                <textarea
                    ref={inputRef}
                    rows={1}
                    value={query}
                    placeholder="Ask anything about your documents..."
                    className="max-h-28 flex-1 resize-none overflow-y-auto bg-transparent py-1 text-sm leading-6 text-gray-900 placeholder:text-gray-400 outline-none"
                    onChange={(e) => {

                        setQuery(e.target.value);

                        e.target.style.height = "0px";

                        e.target.style.height =
                            e.target.scrollHeight + "px";

                    }}
                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter" &&
                            !e.shiftKey
                        ) {

                            e.preventDefault();

                            handleSend();

                        }

                    }}
                />

                {/* SEND */}

                <button
                    onClick={handleSend}
                    disabled={!query.trim()}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >

                    <span className="material-symbols-outlined">

                        send

                    </span>

                </button>

            </div>

            <p className="mx-auto mt-2 max-w-4xl text-center text-[11px] text-gray-400">

                Press <span className="font-semibold">Enter</span> to send •
                <span className="font-semibold"> Shift + Enter</span> for a new line

            </p>

        </div>

    );

}