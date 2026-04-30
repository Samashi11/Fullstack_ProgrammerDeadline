import Link from "next/link";

export default function Footer() {
     return (
          <footer className="w-full py-12 bg-surface-container-lowest text-on-surface-variant font-body-sm tracking-wide border-t border-outline-variant/20">
               <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-on-surface-variant/70">
                         © 2026 KnowledgeBase AI. Built for researchers.
                    </div>
                    <div className="flex gap-6">
                         <Link
                              className="hover:text-primary transition-colors"
                              href="#"
                         >
                              Privacy Policy
                         </Link>
                         <Link
                              className="hover:text-primary transition-colors"
                              href="#"
                         >
                              Terms of Service
                         </Link>
                         <Link
                              className="hover:text-primary transition-colors"
                              href="#"
                         >
                              API Documentation
                         </Link>
                         <Link
                              className="hover:text-primary transition-colors"
                              href="#"
                         >
                              Support
                         </Link>
                    </div>
               </div>
          </footer>
     );
}
