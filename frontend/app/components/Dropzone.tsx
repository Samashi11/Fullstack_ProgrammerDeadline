"use client";

import { useState, useRef } from "react";
import api from "@/app/lib/api";

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

    window.dispatchEvent(
      new CustomEvent("documentUploading", {
        detail: {
          fileName: file.name,
        },
      })
    );

    try {
      const res = await api.post(
        "/api/documents/upload",
        formData
      );

      const data = res.data;

      console.log("UPLOAD SUCCESS:", data);

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
    } catch (err: any) {

      console.error(err);

      alert(
        err.response?.data?.error ??
        "Upload gagal."
      );

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

    <section className="mb-10">

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[32px] border-2 border-dashed bg-white px-8 py-14 text-center shadow-[0_8px_30px_rgba(15,23,42,.04)] transition-all duration-300

            ${isDragging
            ? "scale-[1.01] border-violet-500 bg-violet-50/70"
            : success
              ? "border-green-400 bg-green-50/60"
              : "border-gray-200 hover:border-violet-300 hover:bg-violet-50/40"
          }`}
      >

        {/* Ambient accent blobs */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-violet-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-indigo-100/50 blur-3xl" />

        {/* ICON */}

        <div
          className={`relative z-10 mb-7 flex h-24 w-24 items-center justify-center rounded-full shadow-inner transition-all duration-300

                ${uploading
              ? "bg-gradient-to-br from-violet-100 to-violet-200"
              : success
                ? "bg-gradient-to-br from-green-100 to-green-200"
                : "bg-gradient-to-br from-violet-100 to-indigo-100"
            }`}
        >

          {uploading ? (

            <span className="material-symbols-outlined animate-spin text-[42px] text-violet-600">

              progress_activity

            </span>

          ) : success ? (

            <span className="material-symbols-outlined text-[44px] text-green-600">

              check_circle

            </span>

          ) : (

            <span className="material-symbols-outlined text-[42px] text-violet-600">

              upload_file

            </span>

          )}

        </div>

        {/* TITLE */}

        <div className="relative z-10 text-center">

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">

            {uploading
              ? "Uploading Document..."
              : success
                ? "Upload Successful!"
                : "Upload PDF Documents"}

          </h2>

          <p className="mt-3 max-w-xl text-[15px] leading-7 text-gray-500">

            {uploading ? (

              "AI sedang mengindeks dokumen Anda..."

            ) : success ? (

              "Dokumen berhasil diunggah dan siap digunakan."

            ) : (

              <>
                Drag & Drop file PDF ke area ini atau{" "}

                <span className="font-semibold text-violet-600 underline underline-offset-4">

                  klik untuk memilih file

                </span>

              </>

            )}

          </p>

        </div>

        {/* FILE INFO */}

        {file && (

          <div className="relative z-10 mt-7 flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-5 py-3 shadow-sm">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <span className="material-symbols-outlined text-[20px] text-violet-600">

                picture_as_pdf

              </span>
            </div>

            <div className="text-left">

              <p className="text-sm font-semibold text-gray-900">

                {file.name}

              </p>

              <p className="text-xs text-gray-500">

                {(file.size / 1024 / 1024).toFixed(2)} MB

              </p>

            </div>

          </div>

        )}

        {/* SUCCESS */}

        {success && (

          <div className="relative z-10 mt-7 rounded-2xl border border-green-200 bg-white px-6 py-5 text-center shadow-sm">

            <div className="mb-2 flex justify-center">

              <span className="material-symbols-outlined text-[38px] text-green-600">

                task_alt

              </span>

            </div>

            <h3 className="text-base font-bold text-green-700">

              Upload Berhasil

            </h3>

            <p className="mt-1 text-sm text-green-600">

              Dokumen telah berhasil diindeks dan siap digunakan oleh AI.

            </p>

          </div>

        )}

        {/* LOADING */}

        {uploading && (

          <div className="relative z-10 mt-7 w-full max-w-md">

            <div className="mb-2 flex justify-between text-xs font-medium">

              <span className="text-gray-500">

                Mengunggah...

              </span>

              <span className="text-violet-600">

                Processing

              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

              <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />

            </div>

          </div>

        )}

        {/* FOOTER */}

        <div className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-3">

          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">

            <span className="material-symbols-outlined text-[16px] text-violet-600">

              verified

            </span>

            PDF Only

          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">

            <span className="material-symbols-outlined text-[16px] text-violet-600">

              cloud_upload

            </span>

            Max 10 MB

          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">

            <span className="material-symbols-outlined text-[16px] text-violet-600">

              auto_awesome

            </span>

            AI Ready

          </span>

        </div>

      </div>

    </section>

  );
}
