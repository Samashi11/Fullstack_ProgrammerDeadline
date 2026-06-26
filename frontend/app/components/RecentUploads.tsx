"use client";

import { useEffect, useState } from "react";

type Document = {
  id: string;
  title: string;
  file_name: string;
  created_at: string;
};

export default function RecentUploads() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("https://fullstackprogrammerdeadline-back-production.up.railway.app/api/documents");

      const data = await res.json();

      console.log("DOCUMENTS:", data);

      setDocuments(data.documents || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();

    const handleDocumentUploaded = () => {
      fetchDocuments();
    };

    window.addEventListener("documentUploaded", handleDocumentUploaded);

    return () => {
      window.removeEventListener("documentUploaded", handleDocumentUploaded);
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`https://fullstackprogrammerdeadline-back-production.up.railway.app/api/documents/${id}`, {
        method: "DELETE",
      });

      // Update state tanpa reload
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center gap-sm">
          <span
            className="material-symbols-outlined text-primary"
            data-icon="history"
          >
            history
          </span>

          <h2 className="font-h2 text-h2 text-on-surface">Recent Uploads</h2>
        </div>

        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-primary/20 uppercase">
          Guest Session
        </span>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-gutter py-md font-label-caps text-label-caps text-on-surface-variant">
                File Name
              </th>

              <th className="px-gutter py-md font-label-caps text-label-caps text-on-surface-variant">
                Status
              </th>

              <th className="px-gutter py-md font-label-caps text-label-caps text-on-surface-variant text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {documents.length === 0 ? (
              <tr>
                <td
                  className="px-gutter py-lg text-center text-on-surface-variant"
                  colSpan={3}
                >
                  No documents yet
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-gutter py-lg">
                    <div className="flex items-center gap-md">
                      <span className="material-symbols-outlined text-zinc-500">
                        picture_as_pdf
                      </span>

                      <div>
                        <div className="font-body-md text-on-surface">
                          {doc.file_name}
                        </div>

                        <div className="font-body-sm text-outline-variant">
                          {new Date(doc.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-gutter py-lg">
                    <div className="flex items-center gap-sm text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

                      <span className="font-body-sm">Ready</span>
                    </div>
                  </td>

                  <td className="px-gutter py-lg text-right">
                    <button
                      className="
      ml-auto
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      bg-red-500/10
      text-red-400
      transition-all
      duration-200
      hover:bg-red-500/20
      hover:scale-110
      active:scale-95
    "
                      onClick={() => handleDelete(doc.id)}
                      title="Delete Document"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-gutter bg-gradient-to-r from-primary/10 to-transparent border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-md">
          <p className="font-body-md text-on-surface-variant italic">
            Sign up to unlock persistent storage and full research summaries.
          </p>

          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface px-md py-sm rounded-lg font-medium transition-all active:scale-95">
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}
