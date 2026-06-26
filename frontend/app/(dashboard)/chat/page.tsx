"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import LogoutButton from "../../../app/components/logout/LogoutButton";

import Sidebar from "../../components/Sidebar";
import ChatHeader from "../../components/ChatHeader";
import ChatMessage from "../../components/ChatMessage";
import ChatInput from "../../components/ChatInput";

interface Message {
  type: "user" | "ai";
  content: string;
}

export default function ChatPage() {

  useAuth();

  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async (query: string) => {
    console.log("CHATPAGE:", query);

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: query,
      },
    ]);

    setLoading(true);

    try {
      console.log("Mengirim request...");

      const res = await api.post("/api/chat", {
        query,
      });

      console.log("Response Backend:", res.data);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: res.data.answer,
        },
      ]);
      setLoading(false);
    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "❌ Terjadi kesalahan saat menghubungi AI."
        }
      ])

    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/api/documents");

      setTotalDocuments(res.data.documents.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchDocuments();
  }, []);

  useEffect(() => {
    const refresh = () => {
      fetchDocuments();
    };

    window.addEventListener("documentUploaded", refresh);

    return () => {
      window.removeEventListener("documentUploaded", refresh);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex h-screen overflow-hidden font-body-md text-body-md text-on-surface">
      {/* Sidebar khusus Chat Interface */}
      <Sidebar />

      {/* Main Chat Canvas dengan Custom Grid Background */}
      <main
        className="flex-1 flex flex-col h-screen md:ml-[280px] relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        <ChatHeader totalDocuments={totalDocuments} />
        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth px-lg py-xl flex flex-col gap-xl custom-scrollbar">

          {messages.length === 0 && !loading ? (

            <div className="flex-1 flex flex-col justify-center items-center text-center">

              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-5xl">
                  auto_awesome
                </span>
              </div>

              <h1 className="text-4xl font-bold text-on-surface mb-3">
                Welcome to Knowledge Base AI
              </h1>

              <p className="text-on-surface-variant max-w-2xl">
                Ask anything about your uploaded documents.
                AI will search through your knowledge base
                and answer using relevant information.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-10 max-w-2xl w-full">

                <button
                  onClick={() => handleSend("Ringkas isi dokumen ini")}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-primary/10 transition"
                >
                  📄 Ringkas isi dokumen
                </button>

                <button
                  onClick={() => handleSend("Apa poin penting dari dokumen ini?")}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-primary/10 transition"
                >
                  ⭐ Poin penting
                </button>

                <button
                  onClick={() => handleSend("Jelaskan isi dokumen")}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-primary/10 transition"
                >
                  💡 Jelaskan dokumen
                </button>

                <button
                  onClick={() => handleSend("Buatkan rangkuman")}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-primary/10 transition"
                >
                  📝 Buat rangkuman
                </button>

              </div>

            </div>

          ) : (

            <>

              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  type={message.type}
                  isLast={index === messages.length - 1}
                >
                  {message.content}
                </ChatMessage>
              ))}

              {loading && (
                <ChatMessage type="ai">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce delay-300"></div>

                    <span className="text-zinc-400 ml-3">
                      Thinking...
                    </span>
                  </div>
                </ChatMessage>
              )}

              <div ref={bottomRef}></div>

            </>

          )}

        </div>

        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}
