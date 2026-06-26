export default function RecentActivity() {
  return (
    <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6 flex-1">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <h3 className="font-h3 text-h3 text-white">Recent Activity</h3>
        <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {/* Item 1 */}
        <div className="group flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-400 border border-blue-500/20">
            <span className="material-symbols-outlined text-[20px]">
              upload_file
            </span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="text-white text-sm truncate">
              Uploaded{" "}
              <span className="text-emerald-400 font-code text-code">
                React_Handbook.pdf
              </span>
            </p>
            <p className="text-zinc-500 text-xs mt-1">Today, 09:12 AM</p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white p-2">
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
        </div>
        {/* Item 2 */}
        <div className="group flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400 border border-emerald-500/20">
            <span className="material-symbols-outlined text-[20px]">
              task_alt
            </span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="text-white text-sm truncate">
              Completed Quiz:{" "}
              <span className="font-medium">RAG Fundamentals</span>
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Yesterday, 14:30 PM • Score: 92%
            </p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white p-2">
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
        </div>
        {/* Item 3 */}
        <div className="group flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 border border-purple-500/20">
            <span className="material-symbols-outlined text-[20px]">
              auto_awesome
            </span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="text-white text-sm truncate">
              Summarized{" "}
              <span className="text-emerald-400 font-code text-code">
                Project_Nexus.pdf
              </span>
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Oct 22, 11:05 AM • AI Engine
            </p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white p-2">
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
        </div>
        {/* Item 4 */}
        <div className="group flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-orange-400 border border-orange-500/20">
            <span className="material-symbols-outlined text-[20px]">forum</span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <p className="text-white text-sm truncate">
              Chat Session:{" "}
              <span className="font-medium">Querying Neural Networks</span>
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Oct 21, 16:45 PM • 14 Messages
            </p>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white p-2">
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
