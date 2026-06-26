export default function MobileNavbar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 z-50 px-4 py-2 flex justify-around items-center h-16">
      <a className="flex flex-col items-center gap-1 text-emerald-400" href="#">
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          dashboard
        </span>
        <span className="text-[10px] font-medium">Dashboard</span>
      </a>
      <a
        className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300"
        href="#"
      >
        <span className="material-symbols-outlined text-[24px]">
          description
        </span>
        <span className="text-[10px]">Docs</span>
      </a>
      <a className="flex flex-col items-center justify-center -mt-6" href="#">
        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] border-4 border-zinc-950">
          <span className="material-symbols-outlined">add</span>
        </div>
      </a>
      <a
        className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300"
        href="#"
      >
        <span className="material-symbols-outlined text-[24px]">forum</span>
        <span className="text-[10px]">Chat</span>
      </a>
      <a
        className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300"
        href="#"
      >
        <span className="material-symbols-outlined text-[24px]">menu</span>
        <span className="text-[10px]">Menu</span>
      </a>
    </nav>
  );
}
