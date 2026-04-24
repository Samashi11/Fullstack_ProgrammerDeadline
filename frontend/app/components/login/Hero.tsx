export default function Hero() {
  return (
    <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary/10 via-primary/5 to-white dark:from-slate-800 dark:to-slate-900 items-center justify-center p-12 overflow-hidden">
      <div className="max-w-xl relative z-10">
        <div className="mb-8 p-4 inline-flex bg-white dark:bg-slate-800 rounded-2xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700">
          <span className="material-symbols-outlined text-primary text-5xl">
            school
          </span>
        </div>

        <h1 className="text-5xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6">
          Master any subject <br />
          <span className="text-primary">with StudyAI</span>
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Upload your textbooks, lecture notes, and research papers. Our
          advanced AI tutor helps you summarize, quiz, and understand complex
          topics in seconds.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {[
            ["auto_awesome", "AI Chat Tutoring"],
            ["upload_file", "Material Upload"],
            ["quiz", "Auto Quizzes"],
            ["insights", "Study Analytics"],
          ].map(([icon, text], i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">
                  {icon}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-20 right-20 size-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 size-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 dark:opacity-10 pointer-events-none select-none translate-x-1/4">
        <img
          className="max-w-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD46oFyjDntJkApswOKqb6QfgIxVs42s4PzLNPS5r5VUayRf-eMhgCQJlCfZNxF1SRemX5A6mZ0_pYvquBnKSQza3hV-aJxLxLlOQEree04FsbBSgxQEWrp3dumGReUbpkSmx9zcf_fS6jDTWnnPRotLT5GUtRUZRPLjkflRs6dgE5pIe8drVZ2Nq_xyWGjuFPR64R_jr9zcGavqVOx0cN6ZJaOy42v1SRSN0sp-zSGWIAPq_KW2-TTtGHHy7ojeBgm-NjUHiR4GRT"
          alt="Abstract academic illustration"
        />
      </div>
    </div>
  );
}
