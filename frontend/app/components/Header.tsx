interface HeaderProps {
    search: string;
    setSearch: (value: string) => void;
}

export default function Header({

    search,
    setSearch,

}: HeaderProps) {

    return (

        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between gap-6 border-b border-gray-100 bg-white/80 px-10 backdrop-blur-xl">

            <div>
                <h1 className="text-lg font-bold tracking-tight text-gray-900">
                    Documents
                </h1>
                <p className="text-xs text-gray-400">
                    Manage your AI knowledge base
                </p>
            </div>

            <div className="relative w-full max-w-md">

                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-400">

                    search

                </span>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search documents..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-gray-100/70 pl-11 pr-4 text-[15px] text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />

                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition hover:bg-gray-300"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            close
                        </span>
                    </button>
                )}

            </div>

        </header>

    );

}
