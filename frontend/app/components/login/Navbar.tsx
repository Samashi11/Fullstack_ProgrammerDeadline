import Link from "next/dist/client/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-white dark:bg-slate-900 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
        <div className="size-8 text-primary">
          <svg fill="none" viewBox="0 0 48 48">
            <g>
              <path
                d="M42.1739 20.1739L27.8261 5.82609..."
                fill="currentColor"
              ></path>
              <path d="M7.24189 26.4066..." fill="currentColor"></path>
            </g>
          </svg>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">
          StudyAI
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/#problem" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">
            Problem
          </Link>
          <Link href="/#features" className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
        </nav>

        <Link href="/register" className="flex min-w-[100px] items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <span>Sign Up</span>
        </Link>
      </div>
    </header>
  );
}
