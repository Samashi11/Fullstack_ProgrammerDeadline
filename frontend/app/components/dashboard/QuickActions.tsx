"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Upload Document",
      description: "Upload PDF files to build your knowledge base",
      icon: "upload_file",
      color: "bg-violet-100 text-violet-600",
      path: "/document",
    },
    {
      title: "Ask AI",
      description: "Ask questions and get answers from your docs",
      icon: "forum",
      color: "bg-violet-100 text-violet-600",
      path: "/chat",
    },
    {
      title: "Generate Quiz",
      description: "Create quizzes from your documents",
      icon: "quiz",
      color: "bg-green-100 text-green-600",
      path: "/quizzes",
    },
    {
      title: "Browse Documents",
      description: "View and manage your uploaded documents",
      icon: "folder",
      color: "bg-blue-100 text-blue-600",
      path: "/document",
    },
  ];

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((item) => (
          <button
            key={item.title}
            onClick={() => router.push(item.path)}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-left transition hover:border-violet-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {item.icon}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="mt-0.5 text-sm leading-5 text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>

            <span className="material-symbols-outlined shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-violet-600">
              chevron_right
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
