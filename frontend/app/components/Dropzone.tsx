"use client";

import { useState } from "react";

export default function Dropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch("http://localhost:3001/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text(); // ⬅️ debug aman
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text); // parse manual biar keliatan error HTML
      console.log("UPLOAD SUCCESS:", data);

      alert("Upload berhasil!");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload gagal");
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const selectedFile = files[0];

      if (selectedFile.type !== "application/pdf") {
        alert("Hanya PDF yang diperbolehkan");
        return;
      }

      setFile(selectedFile);

      // 🔥 CALL DI SINI
      handleUpload(selectedFile);
    }
  };

  return (
    <section className="mb-2xl">
      <div
        className={`glass-panel rounded-xl border-2 border-dashed p-2xl flex flex-col items-center justify-center gap-lg transition-all duration-300 group cursor-pointer emerald-glow relative overflow-hidden ${isDragging ? "border-primary bg-primary/5" : "border-white/20 hover:border-primary/50"}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          <span
            className="material-symbols-outlined text-4xl"
            data-icon="upload_file"
          >
            upload_file
          </span>
        </div>
        <div className="text-center z-10">
          <h3 className="font-h3 text-h3 text-on-surface mb-xs">
            Drag & Drop your PDFs here
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            or{" "}
            <span className="text-primary underline decoration-primary/30 underline-offset-4">
              click to browse
            </span>
          </p>
        </div>
        <p className="font-label-caps text-label-caps text-outline-variant tracking-widest mt-md">
          MAX FILE SIZE 10MB
        </p>
      </div>
    </section>
  );
}
