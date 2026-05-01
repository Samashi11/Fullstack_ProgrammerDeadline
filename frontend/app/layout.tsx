import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
     subsets: ["latin"],
     variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
     subsets: ["latin"],
     variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
     title: "KnowledgeBase RAG - Master Your Documents with AI",
     description: "AI Knowledge Hub for Students",
     icons: [],
};

export default function RootLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return (
          <html
               lang="en"
               className={`dark ${inter.variable} ${spaceGrotesk.variable} h-full`}
          >
               <head>
                    <link
                         href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                         rel="stylesheet"
                    />
               </head>
               <body className="min-h-full antialiased font-sans bg-background text-on-background">
                    {children}
               </body>
          </html>
     );
}
