"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DeletePage() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const deleteDoc = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/documents/${params.id}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();
        console.log("DELETE RESULT:", data);

        alert("Document berhasil dihapus");

        // redirect setelah delete
        router.push("/upload");
      } catch (err) {
        console.error("DELETE ERROR:", err);
        alert("Gagal delete");
      }
    };

    if (params.id) {
      deleteDoc();
    }
  }, [params.id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>Deleting document...</p>
    </div>
  );
}
