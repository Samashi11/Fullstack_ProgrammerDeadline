import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Dropzone from "../../components/Dropzone";
import RecentUploads from "../../components/RecentUploads";

export default function Upload() {
  return (
    <div className="min-h-screen grid-bg selection:bg-primary selection:text-on-primary-container dark">
      <Navbar />

      <main className="pt-32 pb-24 px-gutter max-w-[1440px] mx-auto">
        <section className="text-center mb-16 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
          <h1 className="font-h1 text-h1 text-on-surface mb-md">
            Quick Analysis
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Upload your documents to see AI insights instantly. No account
            required for preview.
          </p>
        </section>

        <Dropzone />

        <RecentUploads />

        <section className="mt-2xl text-center">
          <div className="inline-block relative">
            <img
              alt="Abstract Neural Network Visualization"
              className="w-full max-w-4xl h-64 object-cover rounded-2xl opacity-40 mix-blend-lighten border border-white/5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKWONqQSbt4Bo7VwhziiyS_OAySCa1VgUARyXG2JUprnQalKRiU4bNaawcOrZPK6NdrXN09FxRzqdCg6YLkQoweKsiFTsCmkt-1gSUJ1EIEcgILt6GMhKsbhVrhlpOOt3fP17jjGb2nXZkrOohZcv4POv4UXstd91awJXHa3MBqiJ40caCC3I4jA3dpjLhvbVlA-B0ovHwbpj2soRhhi0Y6BK7RskqScdPDlCQ67pUHQX8W6i9GZfRU90Ex2r5k5yDIybizogSLvUX"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
