"use client";

import { useRouter } from "next/navigation";

interface Document {
  id: string;
  file_name: string;
  created_at: string;
  status: string;
}

interface Props {
  documents: Document[];
}

export default function AISuggestions({ documents }: Props) {
  const router = useRouter();

  const latest = documents.length > 0 ? documents[0].file_name : "No document";

  const actions = [
    {
      icon: "menu_book",
      title: `Continue reading ${latest}`,
      subtitle: "You were reading 1 hour ago",
      action: () => router.push("/chat"),
    },
    {
      icon: "upload_file",
      title: "Generate quiz from your document",
      subtitle: "Create practice questions",
      action: () => router.push("/quizzes"),
    },
    {
      icon: "auto_awesome",
      title: "Summarize Chapter 3",
      subtitle: "Get key points in seconds",
      action: () => router.push("/chat"),
    },
    {
      icon: "psychology",
      title: "Explain a topic in simple terms",
      subtitle: "Get an AI explanation",
      action: () => router.push("/chat"),
    },
  ];

  return (
    <section className="h-[360px] overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,.06)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">AI Suggestions</h2>

        <button className="text-sm font-semibold text-violet-600 hover:text-violet-700">
          View all
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 h-[260px]">
        {actions.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="flex w-full items-center justify-between gap-3 rounded-2xl p-2 text-left transition hover:bg-gray-50"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                <span className="material-symbols-outlined text-lg text-violet-600">
                  {item.icon}
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {item.title}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {item.subtitle}
                </p>
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
