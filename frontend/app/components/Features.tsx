export default function Features() {
  return (
    <section className="py-24 bg-surface" id="features">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-surface-container-low rounded-xl p-10 border border-outline/50 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined">upload_file</span>
              </div>
              <h3 className="text-2xl font-black mb-4">Upload Materials</h3>
              <p className="text-on-surface-variant max-w-md">
                Comprehensive support for PDF, PPT, and DOC formats. Simply drop
                your entire course syllabus and start interacting.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              <span className="px-3 py-1 bg-white border border-outline rounded-full text-xs font-bold">
                PDF
              </span>
              <span className="px-3 py-1 bg-white border border-outline rounded-full text-xs font-bold">
                PPTX
              </span>
              <span className="px-3 py-1 bg-white border border-outline rounded-full text-xs font-bold">
                DOCX
              </span>
            </div>
          </div>
          <div className="md:col-span-4 bg-primary text-on-primary rounded-xl p-10 shadow-lg shadow-primary/20 flex flex-col">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6 text-white">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
            </div>
            <h3 className="text-2xl font-black mb-4">AI Chatbot</h3>
            <p className="text-primary-container text-sm leading-relaxed">
              Context-aware answers based exclusively on your uploaded
              documents. No hallucinated facts from the open web.
            </p>
          </div>
          <div className="md:col-span-4 bg-surface-container-low rounded-xl p-10 border border-outline/50">
            <div className="w-12 h-12 bg-tertiary-container rounded-lg flex items-center justify-center mb-6 text-tertiary">
              <span className="material-symbols-outlined">search_spark</span>
            </div>
            <h3 className="text-2xl font-black mb-4">Smart Search</h3>
            <p className="text-on-surface-variant text-sm">
              Find any concept across all your materials instantly. Search by
              intent, not just keywords.
            </p>
          </div>
          <div className="md:col-span-8 bg-surface-container rounded-xl p-10 border border-outline/50 flex items-center gap-8">
            <div className="hidden lg:block w-48 shrink-0">
              <img
                alt="Student studying"
                className="rounded-lg object-cover h-32 w-full"
                data-alt="Minimalist overhead shot of a clean desk with a laptop and a notebook, bright natural daylight"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrMv-cc8snGw7Rk7QbAVNjAvXWv5IC3duU-GNCTBe9amELFO30nx3TqZg5nylfsZc4bqCZiF-rjSkuzq3x8dxoU9VT51BGqGYBTUbhhPD_jH3UwVLOU9uRwAo298CvorIBoOjZ4wj6kzDbTCOFqxFIT-MymID_AEMgj5TNrLLJaJjrzSRNK0wfIRF-Fnq6i54UbCAf7VeHTPOXySWbZeij_MOeVhX4AgtlGqgdgg6fIunfXtgN9YhxA75q12r_4BexoZ1yxOG8amJe"
              />
            </div>
            <div>
              <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center mb-4 text-secondary">
                <span className="material-symbols-outlined">summarize</span>
              </div>
              <h3 className="text-2xl font-black mb-2">Auto Summary</h3>
              <p className="text-on-surface-variant text-sm">
                Get the key takeaways and main concepts of a 50-page document in
                seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
