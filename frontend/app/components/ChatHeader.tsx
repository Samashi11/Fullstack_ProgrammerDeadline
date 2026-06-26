export default function ChatHeader({ fileName }: { fileName: string }) {
  return (
    <header className="h-16 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md flex items-center px-lg flex-shrink-0 z-40">
      <div className="flex items-center gap-sm bg-surface-container/50 px-md py-sm rounded-full border border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]">
        <span className="material-symbols-outlined text-primary text-sm">
          picture_as_pdf
        </span>
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          Context: {fileName}
        </span>
      </div>
    </header>
  );
}
