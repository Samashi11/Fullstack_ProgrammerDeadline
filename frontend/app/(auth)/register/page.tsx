import Navbar from "../../components/login/Navbar";
import Footer from "../../components/login/Footer";
import AuthSection from "../../components/login/AuthSection";
import Hero from "../../components/login/Hero";

export default function LoginPage() {
  return (
    <main className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Hero />
        <AuthSection type="register" />
      </div>

      <Footer />
    </main>
  );
}


