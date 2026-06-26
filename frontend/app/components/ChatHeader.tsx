interface ChatHeaderProps {
  totalDocuments?: number;
}

export default function ChatHeader({
  totalDocuments = 5,
}: ChatHeaderProps) {
  return (
    <header className="h-20 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 z-40">
      {/* Left */}
      <div>
        <h1 className="text-xl font-semibold text-on-surface">
          Knowledge Base
        </h1>

        <p className="text-sm text-on-surface-variant mt-1">
          Ready to answer questions from your uploaded documents.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-white/10">
          <span className="material-symbols-outlined text-primary text-lg">
            description
          </span>

          <span className="text-sm text-on-surface">
            {totalDocuments} Documents Indexed
          </span>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>

          <span className="text-sm text-emerald-400">
            AI Ready
          </span>
        </div>
      </div>
    </header>
  );
}