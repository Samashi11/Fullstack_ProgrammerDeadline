import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-on-surface leading-[1.1]">
            Study Smarter with Your <span className="text-primary">Own AI</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
            Upload your study materials and interact with an AI chatbot that
            answers questions instantly. Your personalized knowledge base for
            every course.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/25 hover:scale-105 transition-transform active:scale-95">
              Get Started
            </Link>
            <button className="px-8 py-4 bg-surface border border-outline text-secondary rounded-xl font-bold hover:bg-surface-container-low transition-colors active:scale-95">
              Try Demo
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-primary-container/30 blur-3xl rounded-full"></div>
          <div className="relative rounded-xl border border-outline bg-surface p-2 shadow-2xl overflow-hidden">
            <img
              alt="StudyAI Dashboard Preview"
              className="rounded-lg w-full aspect-video object-cover"
              data-alt="Modern minimalist software dashboard interface showing document list and a side-by-side AI chat window with blue accents"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVCnYjVNU76BrbZqX43i2NN2NBtXywlqfl6TyYTaQ4tcwJLnUeTP-qky_wEl9HV9p157MVZM58WsgAMxtdi3gSsHninlC_rfz-XAd4nFdhJ89GFuzuxxkJb0CL8pa6bqWMko63SkmXiSCikQ_fL2rDXCDxcvzh6QEyLTfjHgkLni6-ijrc_cvEdEcCm9biSM6tnrE1d6O6MaVfSAgvD3-nV1e1JZai2Tc1qWdfmTOf8wwg_qGbGi5dzPkeUvsuMtADGgw9N7_3AXVo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
