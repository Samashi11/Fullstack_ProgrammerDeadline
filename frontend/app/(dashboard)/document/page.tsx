"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";

// Sub-komponen dideklarasikan di bawah untuk menjaga kode tetap modular dan readable
import Sidebar from "../../../app/components/Sidebar";
import Header from "../../../app/components/Header";
import Dropzone from "../../../app/components/Dropzone";
import DocumentTable from "../../../app/components/DocumentTable";

export default function DashboardPage() {
  useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUserData(res.data);
      } catch (err) {
        console.error("Unauthorized", err);
      }
    };
    fetchUser();
  }, []);

  return (

    <div className="flex h-screen bg-gray-50">

        <Sidebar />

        <main className="relative flex flex-1 flex-col md:ml-[280px]">

            <div
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    background: `
                        radial-gradient(circle at top right, rgba(139,92,246,.07), transparent 35%),
                        radial-gradient(circle at bottom left, rgba(99,102,241,.05), transparent 30%),
                        #f8fafc
                    `,
                }}
            />

            <Header
                search={search}
                setSearch={setSearch}
            />

            <div className="flex-1 overflow-y-auto px-10 py-8">

                <div className="mx-auto max-w-7xl">

                    <Dropzone />

                    <div className="mt-10">

                        <DocumentTable
                            search={search}
                        />

                    </div>

                </div>

            </div>

        </main>

    </div>

);
}
