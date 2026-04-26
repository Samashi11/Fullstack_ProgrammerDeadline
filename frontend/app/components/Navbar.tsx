import Link from "next/dist/client/link";

export default function Navbar() {
  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 docked full-width top-0 sticky z-50">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-black tracking-tighter text-blue-600 dark:text-blue-400 font-inter">
          StudyAI
        </div>
        <div className="hidden md:flex items-center gap-8 font-inter text-sm font-medium tracking-tight">
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
            href="#problem"
          >
            Problem
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
            href="#solution"
          >
            Solution
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
            href="#"
          >
            About
          </a>
        </div>
        <div className="flex items-center gap-4 font-inter text-sm font-medium tracking-tight">
          
          <Link
            href="/login"
            className="text-slate-600 dark:text-slate-400 px-4 py-2 hover:text-blue-500 transition-colors scale-95 active:opacity-80"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all scale-95 active:opacity-80 shadow-lg shadow-primary/20"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
