export default function PinnedSection() {
  return (
    <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-h3 text-h3 text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500 text-[20px]">
            push_pin
          </span>
          Pinned
        </h3>
      </div>
      <div className="space-y-3">
        <a
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
          href="#"
        >
          <span className="material-symbols-outlined text-rose-400 text-[24px]">
            picture_as_pdf
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-200 truncate group-hover:text-emerald-400 transition-colors">
              Q3_Machine_Learning_Trends.pdf
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">2.4 MB • 4 days ago</p>
          </div>
        </a>
        <a
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
          href="#"
        >
          <span className="material-symbols-outlined text-blue-400 text-[24px]">
            description
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-200 truncate group-hover:text-emerald-400 transition-colors">
              API_Documentation_v2.docx
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">1.1 MB • 1 week ago</p>
          </div>
        </a>
        <a
          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
          href="#"
        >
          <span className="material-symbols-outlined text-amber-400 text-[24px]">
            folder
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-200 truncate group-hover:text-emerald-400 transition-colors">
              Project_Nexus_Assets
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              14 items • Shared folder
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
