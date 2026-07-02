"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import HeroSection from "@/app/components/dashboard/HeroSection";
import QuickActions from "@/app/components/dashboard/QuickActions";
import KnowledgeOverview from "@/app/components/dashboard/KnowledgeOverview";
import DashboardContent from "@/app/components/dashboard/DashboardContent";

import Sidebar from "../../../app/components/Sidebar";
import MobileNavbar from "../../../app/components/MobileNavbar";

export default function DashboardPage() {
  useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/api/documents");
      setDocuments(res.data.documents ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchDocuments();
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex selection:bg-primary-container selection:text-white relative">
      {/* Grid Overlay menggunakan Inline Styles */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at top right, rgba(139,92,246,.08), transparent 35%),
            radial-gradient(circle at bottom left, rgba(99,102,241,.06), transparent 30%),
            #f8fafc
        `,
        }}
      />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Container */}
      <main className="flex-1 md:ml-[280px] px-10 pt-8 pb-8">
        <div className="space-y-8">       
          <HeroSection userData={userData} />

          <QuickActions />

          <KnowledgeOverview documents={documents} />

          <DashboardContent documents={documents} />
        </div>
      </main>

      {/* Bottom Floating Menu for Mobile */}
      <MobileNavbar />
    </div>
  );
}
