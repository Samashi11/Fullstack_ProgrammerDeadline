export default function DocumentTable() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">
            folder_open
          </span>
          Indexed Library
        </h2>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              filter_list
            </span>
          </button>
          <button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[20px]">sort</span>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider border-b border-outline-variant/20 mb-2">
          <div className="col-span-5">File Name</div>
          <div className="col-span-2">Date Uploaded</div>
          <div className="col-span-2">File Size</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Row 1 (Ready) */}
        <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 bg-[rgba(19,27,46,0.4)] backdrop-blur-[20px] border border-outline-variant/20 rounded-xl hover:border-primary/30 transition-all duration-200 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-error-container/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-error">
                picture_as_pdf
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-body-md text-body-md text-on-surface truncate font-medium">
                Q3_Financial_Analysis_Report.pdf
              </p>
              <p className="md:hidden font-body-sm text-body-sm text-on-surface-variant mt-1">
                Oct 24, 2024 • 2.4 MB
              </p>
            </div>
          </div>
          <div className="hidden md:block col-span-2 font-body-sm text-body-sm text-on-surface-variant">
            Oct 24, 2024
          </div>
          <div className="hidden md:block col-span-2 font-body-sm text-body-sm text-on-surface-variant">
            2.4 MB
          </div>
          <div className="col-span-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary-container/10 text-secondary border border-secondary/20 rounded-full font-label-caps text-label-caps w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_5px_#45dfa4]"></span>
              Ready
            </span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Chat with Document"
            >
              <span className="material-symbols-outlined text-[20px]">
                chat_bubble
              </span>
            </button>
            <button
              className="p-2 text-on-surface-variant hover:text-tertiary hover:bg-tertiary/10 rounded-lg transition-colors"
              title="Generate Quiz"
            >
              <span className="material-symbols-outlined text-[20px]">
                psychology
              </span>
            </button>
            <button
              className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
              title="Delete"
            >
              <span className="material-symbols-outlined text-[20px]">
                delete
              </span>
            </button>
          </div>
        </div>

        {/* Row 2 (Indexing) */}
        <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 bg-[rgba(19,27,46,0.4)] backdrop-blur-[20px] border border-outline-variant/20 rounded-xl hover:border-primary/30 transition-all duration-200 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="col-span-1 md:col-span-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-error-container/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-error">
                picture_as_pdf
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-body-md text-body-md text-on-surface truncate font-medium">
                Project_Nexus_Technical_Specs.pdf
              </p>
              <p className="md:hidden font-body-sm text-body-sm text-on-surface-variant mt-1">
                Oct 25, 2024 • 15.1 MB
              </p>
            </div>
          </div>
          <div className="hidden md:block col-span-2 font-body-sm text-body-sm text-on-surface-variant">
            Oct 25, 2024
          </div>
          <div className="hidden md:block col-span-2 font-body-sm text-body-sm text-on-surface-variant">
            15.1 MB
          </div>
          <div className="col-span-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-tertiary-container/10 text-tertiary border border-tertiary/20 rounded-full font-label-caps text-label-caps w-max">
              <span className="material-symbols-outlined text-[12px] animate-spin">
                sync
              </span>
              Indexing...
            </span>
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
              title="Cancel/Delete"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
