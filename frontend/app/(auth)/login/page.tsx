import Navbar from "../../components/login/Navbar";
import Footer from "../../components/login/Footer";
import AuthSection from "../../components/login/AuthSection";
import Hero from "../../components/login/Hero";

export default function LoginPage() {
  return (
    <body className="bg-background min-h-screen flex items-center justify-center p-md relative overflow-hidden bg-grid-pattern">
      {/* <Navbar /> */}
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
        {/* <Hero /> */}

        {/* <Footer /> */}
        <AuthSection type="login" />
      </div>
    </body>
  );
}
