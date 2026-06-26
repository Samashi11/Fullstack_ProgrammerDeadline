export default function ChatInput() {
  return (
    <div className="absolute bottom-0 left-0 w-full p-lg bg-gradient-to-t from-background via-background/90 to-transparent">
      <div className="max-w-4xl mx-auto flex items-center gap-sm bg-surface-container-high/80 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-3 shadow-[0_0_30px_rgba(0,0,0,0.5)] focus-within:border-primary focus-within:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined">attach_file</span>
        </button>
        <input
          autoComplete="off"
          className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/50 font-body-md text-body-md outline-none"
          placeholder="Ask about this document..."
          type="text"
        />
        <button className="bg-primary text-on-primary p-2 rounded-full flex items-center justify-center hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
}
