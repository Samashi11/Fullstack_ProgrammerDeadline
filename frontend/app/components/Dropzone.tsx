"use client";

import { useState, useRef } from "react";

export default function Dropzone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("document", file);

    setUploading(true);
    setSuccess(false);

    try {
      const res = await fetch("https://fullstackprogrammerdeadline-back-production.up.railway.app/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      console.log("UPLOAD SUCCESS:", data);

      setSuccess(true);

      // Refresh Recent Uploads
      window.dispatchEvent(new CustomEvent("documentUploaded"));

      // Reset file yang ditampilkan
      setFile(null);

      // Reset input file supaya bisa upload file yang sama lagi
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Hilangkan status sukses setelah 1.5 detik
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  const validateAndUpload = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Hanya PDF yang diperbolehkan");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Ukuran file maksimal 10MB");
      return;
    }

    setFile(selectedFile);

    handleUpload(selectedFile);
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
      validateAndUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      validateAndUpload(files[0]);
    }
  };

  return (
    <section className="mb-2xl">
      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div
        className={`glass-panel rounded-xl border-2 border-dashed p-2xl flex flex-col items-center justify-center gap-lg transition-all duration-300 group cursor-pointer emerald-glow relative overflow-hidden ${
          isDragging
            ? "border-primary bg-primary/5"
            : success
              ? "border-green-500 bg-green-500/5"
              : "border-white/20 hover:border-primary/50"
        }`}
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Background Hover Effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        {/* Icon */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
            success
              ? "bg-green-500/20 text-green-400 scale-110"
              : uploading
                ? "bg-blue-500/20 text-blue-400"
                : "bg-primary/10 text-primary group-hover:scale-110"
          }`}
        >
          {uploading ? (
            <span className="material-symbols-outlined text-4xl animate-spin">
              progress_activity
            </span>
          ) : success ? (
            <span className="material-symbols-outlined text-5xl animate-bounce">
              check_circle
            </span>
          ) : (
            <span className="material-symbols-outlined text-4xl">
              upload_file
            </span>
          )}
        </div>

        {/* Title */}
        <div className="text-center z-10">
          <h3 className="font-h3 text-h3 text-on-surface mb-xs">
            {uploading
              ? "Uploading..."
              : success
                ? "Upload Successful!"
                : "Drag & Drop your PDFs here"}
          </h3>

          <p className="font-body-md text-body-md text-on-surface-variant">
            {uploading ? (
              "Mohon tunggu sebentar..."
            ) : success ? (
              "File siap untuk dianalisis AI"
            ) : (
              <>
                atau{" "}
                <span className="text-primary underline decoration-primary/30 underline-offset-4">
                  klik untuk membuka File Explorer
                </span>
              </>
            )}
          </p>
        </div>

        {/* File Info */}
        {file && (
          <div className="text-center">
            <p className="text-primary font-semibold">📄 {file.name}</p>

            <p className="text-sm text-on-surface-variant">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="text-center animate-pulse">
            <p className="text-green-400 font-semibold text-lg">
              ✅ Upload berhasil!
            </p>

            <p className="text-sm text-green-300/80">
              Dokumen siap diproses AI
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="font-label-caps text-label-caps text-outline-variant tracking-widest mt-md">
          MAX FILE SIZE 10MB
        </p>
      </div>
    </section>
  );
}
