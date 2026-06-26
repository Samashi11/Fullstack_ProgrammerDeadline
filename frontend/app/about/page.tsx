import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  const technologies = [
    {
      name: "Next.js",
      description: "Modern frontend framework for building responsive interfaces.",
      icon: "web",
    },
    {
      name: "Express.js",
      description: "RESTful backend services and document processing APIs.",
      icon: "dns",
    },
    {
      name: "Supabase",
      description: "Database, authentication, and vector storage platform.",
      icon: "storage",
    },
    {
      name: "Gemini AI",
      description: "Embeddings and retrieval intelligence powered by Google AI.",
      icon: "psychology",
    },
  ];

  const roadmap = [
    "Conversational Document Assistant",
    "Automated Quiz Generation",
    "Flashcard-Based Learning",
    "User Authentication & Personal Workspace",
    "Learning Analytics Dashboard",
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navbar />

      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-28">
          <span className="inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6">
            About The Platform
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Smart Learning Notes
          </h1>

          <p className="max-w-3xl mx-auto text-lg leading-8 text-on-surface-variant">
            Smart Learning Notes is an AI-powered educational platform designed
            to transform traditional PDF resources into intelligent, interactive,
            and personalized learning experiences through
            Retrieval-Augmented Generation (RAG) technology.
          </p>
        </section>

        {/* Mission */}
        <section className="mb-24">
          <div className="glass-panel rounded-3xl p-10 md:p-14">
            <h2 className="text-3xl font-bold mb-6">
              Our Mission
            </h2>

            <p className="leading-8 text-on-surface-variant text-lg">
              Our mission is to empower students, researchers, and lifelong
              learners by making educational materials more accessible and
              engaging. By combining semantic search, vector databases, and
              generative AI technologies, we aim to create a smarter and more
              effective way of learning from digital documents.
            </p>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Technology Stack
              </h2>

              <p className="text-on-surface-variant">
                Technologies that power Smart Learning Notes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    {tech.icon}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-3">
                  {tech.name}
                </h3>

                <p className="text-sm leading-7 text-on-surface-variant">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <div className="glass-panel rounded-3xl p-10 md:p-14">
            <h2 className="text-3xl font-bold mb-8">
              Future Development
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {roadmap.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 border-b border-white/5 pb-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>

                  <span className="text-on-surface-variant">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}