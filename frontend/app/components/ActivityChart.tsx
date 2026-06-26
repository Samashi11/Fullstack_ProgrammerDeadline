export default function ActivityChart() {
  return (
    <div className="bg-white/5 border border-white/10 [backdrop-filter:blur(20px)] rounded-xl p-6 flex-1 flex flex-col">
      <h3 className="font-h3 text-h3 text-white mb-6">Activity Volume</h3>
      <div className="flex-1 flex items-end gap-2 h-32 mt-auto">
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[30%]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
            Mon: 4
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[50%]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
            Tue: 7
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[80%] bg-emerald-500/20 border-t border-emerald-500 shadow-[0_-5px_15px_rgba(16,185,129,0.2)]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-emerald-500 text-emerald-400">
            Wed: 12
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[40%]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
            Thu: 5
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[60%]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
            Fri: 9
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[20%]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
            Sat: 2
          </div>
        </div>
        <div className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors relative group h-[10%]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
            Sun: 1
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-zinc-500 mt-2 font-code">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </div>
    </div>
  );
}
