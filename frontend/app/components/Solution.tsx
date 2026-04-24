export default function Solution() {
  return (
    <section className="py-24 bg-surface-container-low" id="solution">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-on-surface mb-4">
            Your Academic Companion.
          </h2>
          <p className="text-on-surface-variant max-w-lg mx-auto">
            Focus on learning, while StudyAI handles the information retrieval
            for you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-0 relative">
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-outline-variant z-0"></div>
          <div className="relative z-10 flex flex-col items-center text-center p-8">
            <div className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-primary/20">
              1
            </div>
            <h4 className="text-xl font-bold mb-2">Upload Materials</h4>
            <p className="text-on-surface-variant text-sm">
              Drag and drop your study files into your private vault.
            </p>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center p-8">
            <div className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-primary/20">
              2
            </div>
            <h4 className="text-xl font-bold mb-2">Ask AI Questions</h4>
            <h4 className="text-on-surface-variant text-sm">
              Use natural language to query your specific materials.
            </h4>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center p-8">
            <div className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-primary/20">
              3
            </div>
            <h4 className="text-xl font-bold mb-2">Get Instant Explanations</h4>
            <p className="text-on-surface-variant text-sm">
              Receive clear, cited answers and simplified concepts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
