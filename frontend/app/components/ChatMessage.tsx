import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
     type: "user" | "ai";
     children: React.ReactNode;
     citations?: string[];
     isLast?: boolean;
}

export default function ChatMessage({
     type,
     children,
     citations,
     isLast,
}: ChatMessageProps) {
     if (type === "user") {
          return (
               <div className="flex justify-end w-full">
                    <div className="max-w-[70%] bg-surface-container border border-outline-variant/50 rounded-xl rounded-tr-none p-md shadow-md">
                         {typeof children === "string" ? (
                              <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap">
                                   {children}
                              </p>
                         ) : (
                              children
                         )}
                    </div>
               </div>
          );
     }

     return (
          <div className={`flex justify-start w-full ${isLast ? "mb-24" : ""}`}>
               <div className="max-w-[85%] bg-white/5 backdrop-blur-md border-l-4 border-l-primary border-y border-r border-white/5 rounded-xl rounded-tl-none p-lg shadow-[0_0_20px_rgba(16,185,129,0.02)]">
                    {/* Render Markdown khusus untuk pesan AI */}
                    <div className="text-on-surface">
                         {typeof children === "string" ? (
                              // Gunakan class "prose prose-invert" agar warna teks otomatis sesuai dengan tema gelap
                              <div className="prose prose-invert prose-emerald max-w-none">
                                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {children}
                                   </ReactMarkdown>
                              </div>
                         ) : (
                              // Jika children bukan string (misalnya komponen loading/typing), render apa adanya
                              children
                         )}
                    </div>

                    {/* Citations Section */}
                    {citations && citations.length > 0 && (
                         <div className="flex flex-wrap gap-sm mt-md pt-sm border-t border-white/5">
                              {citations.map((page, index) => (
                                   <span
                                        key={index}
                                        className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 font-code text-code"
                                   >
                                        <span
                                             className="material-symbols-outlined"
                                             style={{ fontSize: "12px" }}
                                        >
                                             link
                                        </span>
                                        {page}
                                   </span>
                              ))}
                         </div>
                    )}
               </div>
          </div>
     );
}
