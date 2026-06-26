export default function StatGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-xl">
      {/* Card 1 */}
      <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6 relative overflow-hidden group hover:border-white/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <p className="text-zinc-400 font-body-sm text-body-sm">
            Total Documents
          </p>
          <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-2 rounded-lg">
            description
          </span>
        </div>
        <div className="flex items-end gap-3 relative z-10">
          <h3 className="font-h2 text-h2 text-white m-0">12</h3>
          <p className="text-emerald-400 text-sm mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              trending_up
            </span>{" "}
            +3 this week
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6 relative overflow-hidden group hover:border-white/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <p className="text-zinc-400 font-body-sm text-body-sm">
            Quizzes Completed
          </p>
          <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-2 rounded-lg">
            quiz
          </span>
        </div>
        <div className="flex items-end gap-3 relative z-10">
          <h3 className="font-h2 text-h2 text-white m-0">8</h3>
          <p className="text-emerald-400 text-sm mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              trending_up
            </span>{" "}
            +1 this week
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6 relative overflow-hidden group hover:border-white/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <p className="text-zinc-400 font-body-sm text-body-sm">
            Average Score
          </p>
          <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-2 rounded-lg">
            grade
          </span>
        </div>
        <div className="flex items-end gap-3 relative z-10">
          <h3 className="font-h2 text-h2 text-white m-0">88%</h3>
          <p className="text-emerald-400 text-sm mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              trending_up
            </span>{" "}
            +2.4%
          </p>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981] rounded-full"
            style={{ width: "88%" }}
          ></div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6 relative overflow-hidden group hover:border-white/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <p className="text-zinc-400 font-body-sm text-body-sm">
            Active Storage
          </p>
          <span className="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-2 rounded-lg">
            storage
          </span>
        </div>
        <div className="flex items-end gap-3 relative z-10">
          <h3 className="font-h2 text-h2 text-white m-0">
            45.2 <span className="text-lg text-zinc-500 font-normal">MB</span>
          </h3>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981] rounded-full"
            style={{ width: "4.5%" }}
          ></div>
        </div>
        <p className="text-zinc-500 text-xs mt-2 text-right">4.5% of 1 GB</p>
      </div>
    </div>
  );
}
