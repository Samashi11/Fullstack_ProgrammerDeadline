"use client";

import { useRouter } from "next/navigation";

export default function RecentChat() {
  const router = useRouter();

  const chats = [
    {
      question: "Apa perbedaan firewall dan IDS?",
      time: "2 hours ago",
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,.06)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Chats</h2>

        <button
          onClick={() => router.push("/chat")}
          className="text-sm font-semibold text-violet-600 hover:text-violet-700"
        >
          View all
        </button>
      </div>

      <div className="space-y-3">
        {chats.map((chat, index) => (
          <button
            key={index}
            onClick={() => router.push("/chat")}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-100 p-4 text-left transition hover:border-violet-300 hover:bg-violet-50/60"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                <span className="material-symbols-outlined text-blue-600">
                  chat
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-gray-900">
                  {chat.question}
                </h3>
                <p className="text-sm text-gray-500">{chat.time}</p>
              </div>
            </div>

            <span className="material-symbols-outlined shrink-0 text-gray-300">
              chevron_right
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
