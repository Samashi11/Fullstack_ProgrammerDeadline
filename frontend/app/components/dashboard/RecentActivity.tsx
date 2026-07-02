"use client";

interface Document {
  id: string;
  file_name: string;
  created_at: string;
  status: string;
}

interface Props {
  documents: Document[];
}

const ACTIVITY_STYLES = [
  { icon: "cloud_upload", color: "bg-violet-600 text-white" },
  { icon: "chat_bubble", color: "bg-blue-500 text-white" },
  { icon: "check_circle", color: "bg-green-500 text-white" },
  { icon: "auto_awesome", color: "bg-amber-500 text-white" },
];

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function RecentActivity({ documents }: Props) {
  return (
    <section className="h-[360px] overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,.06)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>

        <button className="text-sm font-semibold text-violet-600 hover:text-violet-700">
          View all
        </button>
      </div>

      <div className="space-y-5 overflow-y-auto pr-2 h-[260px]">
        {documents.slice(0, 5).map((doc, index) => {
          const style = ACTIVITY_STYLES[index % ACTIVITY_STYLES.length];

          return (
            <div key={doc.id} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.color}`}
              >
                <span className="material-symbols-outlined text-lg">
                  {style.icon}
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  You uploaded {doc.file_name}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {timeAgo(doc.created_at)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
