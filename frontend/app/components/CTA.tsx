export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-inverse-surface rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-white">
              Start learning more efficiently today
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join thousands of students who are transforming their academic
              workflow with personal AI power.
            </p>
            <div className="flex justify-center">
              <button className="px-10 py-5 bg-primary text-on-primary rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/40">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
