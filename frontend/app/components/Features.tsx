export default function Features() {
     return (
          <section className="py-20 px-8 max-w-container_max mx-auto relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-surface-container border border-surface-bright/20 rounded-xl p-8 hover:border-outline-variant transition-all flex flex-col group">
                         <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                              <span className="material-symbols-outlined text-primary text-2xl">
                                   chat
                              </span>
                         </div>
                         <h3 className="font-h3 text-h3 text-on-surface mb-3">
                              Smart Vector Chat
                         </h3>
                         <p className="font-body-md text-on-surface-variant">
                              Engage in contextual conversations with your
                              documents using advanced RAG technology for
                              precise, referenced answers.
                         </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-surface-container border border-surface-bright/20 rounded-xl p-8 hover:border-outline-variant transition-all flex flex-col group">
                         <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                              <span className="material-symbols-outlined text-primary text-2xl">
                                   checklist
                              </span>
                         </div>
                         <h3 className="font-h3 text-h3 text-on-surface mb-3">
                              Instant Quiz Generation
                         </h3>
                         <p className="font-body-md text-on-surface-variant">
                              Automatically generate targeted questions from
                              your source material to test comprehension and aid
                              retention.
                         </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-surface-container border border-surface-bright/20 rounded-xl p-8 hover:border-outline-variant transition-all flex flex-col group">
                         <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                              <span className="material-symbols-outlined text-primary text-2xl">
                                   shield
                              </span>
                         </div>
                         <h3 className="font-h3 text-h3 text-on-surface mb-3">
                              Secure Document Vault
                         </h3>
                         <p className="font-body-md text-on-surface-variant">
                              Your research is stored securely with
                              enterprise-grade encryption. Private by default,
                              accessible only by you.
                         </p>
                    </div>
               </div>
          </section>
     );
}
