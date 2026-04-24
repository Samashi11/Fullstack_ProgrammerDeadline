export default function Problem() {
  return (
    <section className="py-24 bg-surface" id="problem">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">
            The Challenge
          </span>
          <h2 className="text-3xl font-black text-on-surface">
            Stop struggling with scattered notes.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-surface-container-low border border-outline/50 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center mb-6 text-error">
              <span className="material-symbols-outlined">folder_off</span>
            </div>
            <h3 className="font-bold text-xl mb-3">Scattered Materials</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              PDFs, Word docs, and slides spread across multiple platforms and
              physical folders.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-surface-container-low border border-outline/50 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center mb-6 text-error">
              <span className="material-symbols-outlined">psychology_alt</span>
            </div>
            <h3 className="font-bold text-xl mb-3">Complex Content</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Dense academic language that takes hours to parse and fully
              comprehend.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-surface-container-low border border-outline/50 hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center mb-6 text-error">
              <span className="material-symbols-outlined">timer_off</span>
            </div>
            <h3 className="font-bold text-xl mb-3">Time-Consuming Research</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Searching for specific concepts manually across hundreds of pages
              of textbooks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
