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

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export default function RecentDocuments({ documents }: Props) {
  const router = useRouter();

  return (
    <section className="h-[360px] overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,.06)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>

        <button
          onClick={() => router.push("/document")}
          className="text-sm font-semibold text-violet-600 hover:text-violet-700"
        >
          View all
        </button>
      </div>

      <div className="space-y-1 overflow-y-auto pr-2 h-[260px]">
        {documents.slice(0, 4).map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-xl p-2 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
                <span className="material-symbols-outlined text-red-500">
                  picture_as_pdf
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-gray-900">
                  {doc.file_name}
                </h3>
                <p className="text-sm text-gray-500">
                  Uploaded {timeAgo(doc.created_at)}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push("/document")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <span className="material-symbols-outlined text-xl">
                more_vert
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
