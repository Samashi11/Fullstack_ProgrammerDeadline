export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2024 StudyAI Platform. All academic rights reserved.
        </p>

        <div className="flex gap-6">
          <a className="text-sm text-slate-500 hover:text-primary">
            Privacy Policy
          </a>
          <a className="text-sm text-slate-500 hover:text-primary">
            Terms of Service
          </a>
          <a className="text-sm text-slate-500 hover:text-primary">
            Cookie Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
