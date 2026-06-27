interface HeaderProps {
  logoutComponent: React.ReactNode;
  search: string;
  setSearch: (value: string) => void;
}

export default function Header({
  logoutComponent,
  search,
  setSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-gutter py-md bg-[rgba(19,27,46,0.4)] backdrop-blur-[20px] border-b border-outline-variant/20">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
        <h1 className="font-h2 text-h2 text-on-surface tracking-tight">
          My Documents
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-[20px]">
            search
          </span>
          <input
            className="bg-surface-container/50 border border-outline-variant/50 rounded-full pl-10 pr-4 py-2 w-64 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm shadow-inner placeholder:text-on-surface-variant/70"
            placeholder="Search knowledge base..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="px-4 mb-4">{logoutComponent}</div>
        {/* <button className="bg-primary text-on-primary font-body-md text-body-md px-5 py-2.5 rounded-lg hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all duration-300 flex items-center gap-2 font-semibold">
          <span className="material-symbols-outlined text-[20px]">upload</span>
          <span className="hidden sm:inline">Upload New</span>
        </button> */}
      </div>
    </header>
  );
}
