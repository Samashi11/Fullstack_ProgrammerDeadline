export default function Features() {
  return (
    <section className="py-20 px-8 max-w-container_max mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="font-h2 text-h2 text-on-surface mb-4">
          Why Use Smart Learning Notes?
        </h2>

        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Transform your study materials into an intelligent learning
          experience powered by AI and Retrieval-Augmented Generation (RAG).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-surface-container border border-surface-bright/20 rounded-xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 flex flex-col group">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">
              upload_file
            </span>
          </div>

          <h3 className="font-h3 text-h3 text-on-surface mb-3">
            Smart PDF Upload
          </h3>

          <p className="font-body-md text-on-surface-variant">
            Upload lecture notes, research papers, and learning materials with
            instant AI processing and document indexing.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container border border-surface-bright/20 rounded-xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 flex flex-col group">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">
              psychology
            </span>
          </div>

          <h3 className="font-h3 text-h3 text-on-surface mb-3">
            AI Knowledge Retrieval
          </h3>

          <p className="font-body-md text-on-surface-variant">
            Powered by Gemini Embeddings and RAG technology to understand and
            retrieve information from your uploaded documents.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container border border-surface-bright/20 rounded-xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 flex flex-col group">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-3xl">
              auto_stories
            </span>
          </div>

          <h3 className="font-h3 text-h3 text-on-surface mb-3">
            Personalized Learning
          </h3>

          <p className="font-body-md text-on-surface-variant">
            Convert traditional PDFs into interactive learning resources that
            help students understand concepts more effectively.
          </p>
        </div>
      </div>
    </section>
  );
}