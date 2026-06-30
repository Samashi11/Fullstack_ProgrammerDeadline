"use client";

import { useState, useRef } from "react";
import axios from "axios"; // Pastikan sudah install: npm install axios

export default function Dropzone() {
     const [isDragging, setIsDragging] = useState(false);
     const [file, setFile] = useState<File | null>(null);
     const [uploading, setUploading] = useState(false);
     const [success, setSuccess] = useState(false);

     // 1. TAMBAHKAN STATE UNTUK MENAMPUNG PERSENTASE (0 - 100)
     const [progress, setProgress] = useState<number>(0);

     const fileInputRef = useRef<HTMLInputElement>(null);

     const handleUpload = async (file: File) => {
          const formData = new FormData();
          formData.append("document", file);

          setUploading(true);
          setSuccess(false);
          setProgress(0); // Reset progress ke 0 saat mulai upload

          window.dispatchEvent(
               new CustomEvent("documentUploading", {
                    detail: { fileName: file.name },
               }),
          );

          try {
               // Ambil token dari localStorage
               const token = localStorage.getItem("token");

               if (!token) {
                    throw new Error("Anda harus login terlebih dahulu bos!");
               }

               // 2. GANTI FETCH DENGAN AXIOS.POST
               const res = await axios.post(
                    "http://localhost:3001/api/documents/upload",
                    formData,
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                              // Jangan set 'Content-Type' manual, Axios otomatis tahu jika kita mengirim FormData
                         },
                         // 3. KUNCI UNTUK MENGHITUNG PROGRESS PERSENTASE
                         onUploadProgress: (progressEvent) => {
                              if (progressEvent.total) {
                                   const percentCompleted = Math.round(
                                        (progressEvent.loaded * 100) /
                                             progressEvent.total,
                                   );
                                   setProgress(percentCompleted); // Update state persentase
                              }
                         },
                    },
               );

               console.log("UPLOAD SUCCESS:", res.data);

               setSuccess(true);
               window.dispatchEvent(new CustomEvent("documentUploaded"));

               if (fileInputRef.current) {
                    fileInputRef.current.value = "";
               }

               // Tahan tampilan sukses selama 2 detik sebelum reset total
               setTimeout(() => {
                    setSuccess(false);
                    setFile(null);
                    setProgress(0); // Reset progress setelah selesai
               }, 2000);
          } catch (err: any) {
               console.error(err);
               // Handle error Axios vs Error biasa
               const errorMessage =
                    err.response?.data?.error ||
                    err.message ||
                    "Terjadi kesalahan saat upload.";
               alert(errorMessage);
               setFile(null);
               setProgress(0);
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

     // --- Drag & Drop Handlers ---
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

     const getContainerStyles = () => {
          if (success) return "border-green-500 bg-green-500/5";
          if (uploading)
               return "border-blue-500 bg-blue-500/5 pointer-events-none";
          if (isDragging) return "border-primary bg-primary/10";
          return "border-white/20 hover:border-primary/50 cursor-pointer";
     };

     const getIconStyles = () => {
          if (success) return "bg-green-500/20 text-green-400 scale-110";
          if (uploading) return "bg-blue-500/20 text-blue-400";
          return "bg-primary/10 text-primary group-hover:scale-110";
     };

     return (
          <section className="mb-2xl">
               <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileSelect}
               />

               <div
                    className={`glass-panel rounded-xl border-2 border-dashed p-2xl flex flex-col items-center justify-center gap-lg transition-all duration-300 group emerald-glow relative overflow-hidden ${getContainerStyles()}`}
                    onClick={() =>
                         !uploading && !success && fileInputRef.current?.click()
                    }
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
               >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    {/* Dynamic Icon */}
                    <div
                         className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${getIconStyles()}`}
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

                    {/* Dynamic Title & Subtitle */}
                    <div className="text-center z-10 w-full max-w-md">
                         <h3
                              className={`font-h3 text-h3 mb-xs ${success ? "text-green-400" : "text-on-surface"}`}
                         >
                              {uploading
                                   ? `Mengupload (${progress}%)` // Tampilkan angka persentase di judul
                                   : success
                                     ? "Upload Berhasil!"
                                     : "Drag & Drop PDF Anda di sini"}
                         </h3>

                         <p className="font-body-md text-body-md text-on-surface-variant">
                              {uploading ? (
                                   progress === 100 ? (
                                        "Selesai mengupload! AI sedang memproses dokumen..." // Ketika file 100% sampai di server tapi server masih memproses embedding
                                   ) : (
                                        "Mohon tunggu, sedang mengirim file ke server..."
                                   )
                              ) : success ? (
                                   "Dokumen siap dianalisis!"
                              ) : (
                                   <>
                                        atau{" "}
                                        <span className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                                             klik untuk membuka File Explorer
                                        </span>
                                   </>
                              )}
                         </p>
                    </div>

                    {/* File Info & Determinate Progress Bar */}
                    {file && (
                         <div className="text-center w-full max-w-sm mt-2 p-4 bg-surface/50 rounded-lg border border-white/5 backdrop-blur-sm animate-fade-in">
                              <div className="flex justify-between items-center mb-1">
                                   <p className="text-primary font-semibold truncate text-sm text-left max-w-[70%]">
                                        📄 {file.name}
                                   </p>
                                   <p className="text-xs text-on-surface-variant text-right">
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB
                                   </p>
                              </div>

                              {/* 4. PROGRESS BAR DENGAN LEBAR DINAMIS */}
                              {uploading && (
                                   <div className="w-full mt-3">
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                             <div
                                                  className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                                                  style={{
                                                       width: `${progress}%`,
                                                  }} // Mengatur lebar bar secara nyata
                                             ></div>
                                        </div>
                                        <p className="text-[11px] text-blue-400 text-right mt-1 font-mono">
                                             {progress}%
                                        </p>
                                   </div>
                              )}
                         </div>
                    )}

                    {!uploading && !success && (
                         <p className="font-label-caps text-label-caps text-outline-variant tracking-widest mt-md">
                              MAX FILE SIZE 10MB
                         </p>
                    )}
               </div>
          </section>
     );
}
