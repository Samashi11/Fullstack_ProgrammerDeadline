import Link from "next/link";

export default function Hero() {
     return (
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-4">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
               <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="font-h1 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface mb-6">
                         Master Your Documents with AI.
                    </h1>
                    <p className="font-body-lg text-lg text-on-surface-variant mb-10 max-w-[600px] mx-auto">
                         Upload PDFs, instantly find answers through chat, and
                         generate customized quizzes to test your understanding.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <Link
                              href="/register"
                              className="px-8 py-4 bg-primary-container text-white rounded-xl hover:bg-primary transition-all font-body-md font-semibold flex items-center justify-center gap-2"
                         >
                              Start for Free
                         </Link>
                         <button className="px-8 py-4 border border-outline-variant text-on-surface-variant bg-surface-container/30 hover:bg-surface-container hover:text-on-surface transition-colors font-body-md flex items-center justify-center gap-2 rounded-xl">
                              <span className="material-symbols-outlined">
                                   play_circle
                              </span>
                              Watch Demo
                         </button>
                    </div>
               </div>
          </section>
     );
}
