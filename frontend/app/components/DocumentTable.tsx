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
  search?: string;
}

export default function DocumentTable({
  search = "",
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
    <section className="mt-10">

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">

            Document Library

          </h2>

          <p className="mt-1 text-sm text-gray-500">

            Manage all documents that have been indexed by AI.

          </p>

        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 appearance-none rounded-full border border-gray-200 bg-white pl-4 pr-9 text-sm font-medium text-gray-600 shadow-sm outline-none transition hover:border-violet-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-gray-400">
              unfold_more
            </span>
          </div>

          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 appearance-none rounded-full border border-gray-200 bg-white pl-4 pr-9 text-sm font-medium text-gray-600 shadow-sm outline-none transition hover:border-violet-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            >
              <option value="all">All</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-gray-400">
              unfold_more
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,.05)]">

        {/* Table Header */}

        <div className="hidden md:grid grid-cols-12 border-b border-gray-100 bg-gray-50/70 px-8 py-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
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
            className="group grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-b border-gray-50 bg-white px-8 py-5 transition"
          >
            <div className="col-span-1 md:col-span-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <span className="material-symbols-outlined text-red-500">
                  picture_as_pdf
                </span>
              </div>

              <p className="font-medium text-gray-700">{fileName}</p>
            </div>

            <div className="hidden md:block col-span-2 text-sm text-gray-400">
              -
            </div>

            <div className="hidden md:block col-span-2 text-sm text-gray-400">
              -
            </div>

            <div className="col-span-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
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
          <div className="py-24 text-center">

            <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border-[3px] border-violet-500 border-t-transparent" />

            <p className="text-sm text-gray-400">

              Loading documents...

            </p>

          </div>
        ) : filteredDocuments.length === 0 ? (

          <div className="py-24 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
              <span className="material-symbols-outlined text-[32px] text-violet-300">

                folder_open

              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-700">

              {documents.length === 0
                ? "No Documents Yet"
                : "No Matching Documents"}

            </h3>

            <p className="mt-1.5 text-sm text-gray-400">

              {documents.length === 0
                ? "Upload your first PDF to start building your AI knowledge base."
                : "Try changing your search keyword or filter."}

            </p>

          </div>

        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group grid grid-cols-1 md:grid-cols-12 items-center gap-4 border-b border-gray-50 bg-white px-8 py-4 transition-all duration-200 last:border-b-0 hover:bg-violet-50/40"
            >

              {/* File */}
              <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 transition group-hover:bg-red-100">
                  <span className="material-symbols-outlined text-red-500">
                    picture_as_pdf
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-gray-900">
                    {doc.file_name}
                  </p>

                  <p className="md:hidden mt-1 text-xs text-gray-400">
                    {new Date(doc.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="hidden md:block col-span-2 text-sm text-gray-500">
                {new Date(doc.created_at).toLocaleDateString("id-ID")}
              </div>

              {/* Size */}
              <div className="hidden md:block col-span-2 text-sm text-gray-400">
                -
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${doc.status === "ready"
                    ? "border border-green-100 bg-green-50 text-green-600"
                    : "border border-amber-100 bg-amber-50 text-amber-600"
                    }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${doc.status === "ready"
                      ? "bg-green-500"
                      : "bg-amber-500"
                      }`}
                  ></span>

                  {doc.status === "ready" ? "Ready" : "Processing"}
                </span>
              </div>

              {/* Action */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-1.5 md:opacity-0 group-hover:opacity-100 transition-opacity">

                <button
                  onClick={() => router.push(`/chat?document=${doc.id}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-violet-100 hover:text-violet-600"
                  title="Chat with Document"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    chat_bubble
                  </span>
                </button>

                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-violet-100 hover:text-violet-600"
                  title="Generate Quiz"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    psychology
                  </span>
                </button>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-100 hover:text-red-600"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    delete
                  </span>
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
