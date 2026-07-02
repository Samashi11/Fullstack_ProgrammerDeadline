"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";

import Sidebar from "../../components/Sidebar";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";

interface Message {
    type: "user" | "ai";
    content: string;
}

export default function ChatPage() {

    useAuth();

    const [documents, setDocuments] = useState<any[]>([]);

    const [selectedDocument, setSelectedDocument] = useState("");

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [totalDocuments, setTotalDocuments] =
        useState(0);

    const bottomRef =
        useRef<HTMLDivElement>(null);

    const handleSend = async (query: string) => {

        if (!query.trim()) return;

        setMessages((prev) => [

            ...prev,

            {
                type: "user",
                content: query,
            },

        ]);

        setLoading(true);

        try {

            const res = await api.post("/api/chat", {
                query,
                documentId: selectedDocument,
            });

            setMessages((prev) => [

                ...prev,

                {
                    type: "ai",
                    content: res.data.answer,
                },

            ]);

        } catch {

            setMessages((prev) => [

                ...prev,

                {
                    type: "ai",
                    content:
                        "❌ Terjadi kesalahan saat menghubungi AI.",
                },

            ]);

        } finally {

            setLoading(false);

        }

    };

    const fetchDocuments = async () => {

        try {

            const res = await api.get("/api/documents");

            setDocuments(res.data.documents);

            setTotalDocuments(res.data.documents.length);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        fetchDocuments();

    }, []);

    useEffect(() => {

        const refresh = () => {

            fetchDocuments();

        };

        window.addEventListener(
            "documentUploaded",
            refresh
        );

        return () => {

            window.removeEventListener(
                "documentUploaded",
                refresh
            );

        };

    }, []);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [messages, loading]);

    return (

        <div className="flex h-screen overflow-hidden bg-gray-50">

            <Sidebar />

            <main
                className="relative flex h-screen flex-1 flex-col overflow-hidden md:ml-[280px]"
                style={{
                    backgroundImage: `
                        linear-gradient(#ececec 1px, transparent 1px),
                        linear-gradient(90deg,#ececec 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                }}
            >


                <div
                    className={`flex-1 ${messages.length === 0
                            ? "flex items-center justify-center overflow-hidden"
                            : "overflow-y-auto"
                        }`}
                >

                    {messages.length === 0 && !loading ? (

                        <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-8 pb-12">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100">

                                <span className="material-symbols-outlined text-3xl text-violet-600">
                                    auto_awesome

                                </span>

                            </div>

                            <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">

                                Welcome to SL AI

                            </h1>

                            <p className="mt-2 max-w-xl text-center text-sm leading-6 text-gray-500">

                                Ask questions about your uploaded documents.
                                AI will search your knowledge base and answer
                                using the most relevant information.

                            </p>

                            <div className="mt-4 grid w-full max-w-3xl grid-cols-2 gap-3">

                                <button
                                    onClick={() =>
                                        handleSend("Ringkas isi dokumen ini")
                                    }
                                    className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-md"
                                >

                                    <div className="text-2xl">

                                        📄

                                    </div>

                                    <h3 className="mt-2 text-[17px] font-semibold text-gray-900">

                                        Ringkas Dokumen

                                    </h3>

                                    <p className="mt-1 text-[13px] leading-5 text-gray-500">

                                        Buat ringkasan dari keseluruhan isi dokumen.

                                    </p>

                                </button>

                                <button
                                    onClick={() =>
                                        handleSend("Apa poin penting dari dokumen ini?")
                                    }
                                    className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
                                >

                                    <div className="text-2xl">

                                        ⭐

                                    </div>

                                    <h3 className="mt-3 text-base font-semibold text-gray-900">

                                        Poin Penting

                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">

                                        Temukan informasi paling penting dari dokumen.

                                    </p>

                                </button>

                                <button
                                    onClick={() =>
                                        handleSend("Jelaskan isi dokumen")
                                    }
                                    className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
                                >

                                    <div className="text-2xl">

                                        💡

                                    </div>

                                    <h3 className="mt-3 text-base font-semibold text-gray-900">

                                        Jelaskan Dokumen

                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">

                                        AI menjelaskan isi dokumen dengan bahasa sederhana.

                                    </p>

                                </button>

                                <button
                                    onClick={() =>
                                        handleSend("Buatkan rangkuman")
                                    }
                                    className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
                                >

                                    <div className="text-2xl">

                                        📝

                                    </div>

                                    <h3 className="mt-3 text-base font-semibold text-gray-900">

                                        Buat Rangkuman

                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500">

                                        Ringkasan singkat yang mudah dipahami.

                                    </p>

                                </button>

                            </div>

                        </div>

                    ) : (
                        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-8 py-8 pb-32">

                            {messages.map((message, index) => (

                                <ChatMessage
                                    key={index}
                                    type={message.type}
                                    isLast={
                                        index ===
                                        messages.length - 1
                                    }
                                >

                                    {message.content}

                                </ChatMessage>

                            ))}

                            {loading && (

                                <ChatMessage type="ai">

                                    <div className="flex items-center gap-3">

                                        <div className="flex gap-1">

                                            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-600" />

                                            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-600 [animation-delay:150ms]" />

                                            <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-600 [animation-delay:300ms]" />

                                        </div>

                                        <span className="text-sm text-gray-500">

                                            SL AI is thinking...

                                        </span>

                                    </div>

                                </ChatMessage>

                            )}

                           <div
    ref={bottomRef}
    className="h-40 shrink-0"
/>

                        </div>

                    )}

                </div>

                <ChatInput
                    onSend={handleSend}
                    documents={documents}
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                />

            </main>

        </div>

    );

}