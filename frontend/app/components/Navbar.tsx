import Link from "next/link";

export default function Navbar() {
     return (
          <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl antialiased border-b border-outline-variant/30">
               <div className="flex items-center justify-between px-8 h-16 w-full max-w-container_max mx-auto">
                    <div className="text-xl font-bold tracking-tighter text-primary font-h3">
                         KnowledgeBase
                    </div>
                    <div className="hidden md:flex gap-8">
                         <Link
                              href="#"
                              className="text-primary font-semibold hover:text-primary transition-colors duration-200 active:scale-95"
                         >
                              Features
                         </Link>
                         <Link
                              href="#"
                              className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95"
                         >
                              Solutions
                         </Link>
                         <Link
                              href="#"
                              className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95"
                         >
                              Pricing
                         </Link>
                    </div>
                    <div className="flex items-center gap-4">
                         <Link
                              href="/login"
                              className="px-4 py-2 border border-primary/50 text-primary rounded hover:bg-primary/10 transition-colors font-body-sm active:scale-95 duration-100"
                         >
                              Sign In
                         </Link>
                         <Link
                              href="/register"
                              className="px-4 py-2 bg-primary-container text-white rounded hover:bg-primary transition-all font-body-sm active:scale-95 duration-100"
                         >
                              Get Started
                         </Link>
                    </div>
               </div>
          </nav>
     );
}
