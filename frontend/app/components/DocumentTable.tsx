"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";

interface Document {
  id: string;
  title: string;
  file_name: string;
  created_at: string;
  status: string;
}

interface DocumentTableProps {
  search: string;
}

export default function DocumentTable({
  search,
}: DocumentTableProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("all");

  const router = useRouter();

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/api/documents");
      setDocuments(res.data.documents || []);
    } catch (err) {
      console.error("Gagal mengambil dokumen:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();

    const refresh = () => {
      fetchDocuments();
      setUploadingFiles([]);
    };

    const uploading = (e: any) => {
      setUploadingFiles((prev) => [...prev, e.detail.fileName]);
    };

    window.addEventListener("documentUploaded", refresh);
    window.addEventListener("documentUploading", uploading);

    return () => {
      window.removeEventListener("documentUploaded", refresh);
      window.removeEventListener("documentUploading", uploading);
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/documents/${id}`);
      fetchDocuments();
    } catch (err) {
      console.error("Gagal menghapus dokumen", err);
    }
  };
  const filteredDocuments = documents
    .filter((doc) =>
      doc.file_name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doc) =>
      filterStatus === "all"
        ? true
        : doc.status.toLowerCase() === filterStatus
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          );

        case "oldest":
          return (
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
          );

        case "az":
          return a.file_name.localeCompare(b.file_name);

        case "za":
          return b.file_name.localeCompare(a.file_name);

        default:
          return 0;
      }
    });

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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container border border-outline-variant rounded px-3 py-1 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-surface-container border border-outline-variant rounded px-3 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="processing">Processing</option>
            <option value="ready">Ready</option>
          </select>
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
        {uploadingFiles.map((fileName) => (
          <div
            key={fileName}
            className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 bg-[rgba(19,27,46,0.4)] backdrop-blur-[20px] border border-outline-variant/20 rounded-xl"
          >
            <div className="col-span-1 md:col-span-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-error-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-error">
                  picture_as_pdf
                </span>
              </div>

              <p className="font-medium">{fileName}</p>
            </div>

            <div className="hidden md:block col-span-2">
              -
            </div>

            <div className="hidden md:block col-span-2">
              -
            </div>

            <div className="col-span-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-400/20">
                <span className="material-symbols-outlined text-[14px] animate-spin">
                  progress_activity
                </span>
                Processing
              </span>
            </div>

            <div className="col-span-2"></div>
          </div>
        ))}
        {loading ? (
          <div className="text-center py-10 text-on-surface-variant">
            Loading documents...
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-10 text-on-surface-variant">
            {documents.length === 0
              ? "Belum ada dokumen yang diupload."
              : "Dokumen tidak ditemukan."}
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 bg-[rgba(19,27,46,0.4)] backdrop-blur-[20px] border border-outline-variant/20 rounded-xl hover:border-primary/30 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* File */}
              <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-error-container/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-error">
                    picture_as_pdf
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="font-body-md text-body-md text-on-surface truncate font-medium">
                    {doc.file_name}
                  </p>

                  <p className="md:hidden font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {new Date(doc.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="hidden md:block col-span-2 font-body-sm text-body-sm text-on-surface-variant">
                {new Date(doc.created_at).toLocaleDateString("id-ID")}
              </div>

              {/* Size */}
              <div className="hidden md:block col-span-2 font-body-sm text-body-sm text-on-surface-variant">
                -
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${doc.status === "ready"
                    ? "bg-green-500/10 text-green-400 border border-green-400/20"
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-400/20"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${doc.status === "ready"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                      }`}
                  ></span>

                  {doc.status === "ready" ? "Ready" : "Processing"}
                </span>
              </div>

              {/* Action */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">

                <button
                  onClick={() => router.push(`/chat?document=${doc.id}`)}
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
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>

              </div>
            </div>
          ))
        )}
        {/*
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
        */}
      </div>
    </section>
  );
}
