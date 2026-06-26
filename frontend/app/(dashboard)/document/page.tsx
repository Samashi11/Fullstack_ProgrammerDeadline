"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import LogoutButton from "../../../app/components/logout/LogoutButton";
// Sub-komponen dideklarasikan di bawah untuk menjaga kode tetap modular dan readable
import Sidebar from "../../../app/components/Sidebar";
import Header from "../../../app/components/Header";
import Dropzone from "../../../app/components/Dropzone";
import DocumentTable from "../../../app/components/DocumentTable";

export default function DashboardPage() {
  useAuth();
  const [userData, setUserData] = useState<any>(null);

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
    <div className="bg-background text-on-background flex h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Sidebar - Ditambahkan LogoutButton di dalamnya secara strategis */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] flex flex-col h-screen relative bg-gradient-to-br from-background via-surface-dim to-background">
        <Header logoutComponent={<LogoutButton />} />

        {/* Scrollable Content Canvas */}
        <div className="flex-1 overflow-y-auto p-gutter custom-scrollbar">
          <div className="max-w-container_max mx-auto space-y-xl pb-2xl">
            <Dropzone />
            <DocumentTable />
          </div>
        </div>
      </main>
    </div>
  );
}
