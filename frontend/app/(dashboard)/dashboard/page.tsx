"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { useAuth } from "@/app/hooks/useAuth";
import LogoutButton from "../../../app/components/logout/LogoutButton";

import Sidebar from "../../../app/components/Sidebar";
import Header from "../../../app/components/Header";
import StatGrid from "../../components/StatGrid";
import RecentActivity from "../../../app/components/RecentActivity";
import PinnedSection from "../../../app/components/PinnedSection";
import ActivityChart from "../../../app/components/ActivityChart";
import MobileNavbar from "../../../app/components/MobileNavbar";

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
    <div className="bg-background text-on-background font-body-md min-h-screen flex selection:bg-primary-container selection:text-white relative">
      {/* Grid Overlay menggunakan Inline Styles */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Content Container */}
      <main className="flex-1 md:ml-[280px] p-6 md:p-xl max-w-container_max mx-auto w-full mb-16 md:mb-0">
        <Header logoutComponent={<LogoutButton />}  />
        <StatGrid />

        {/* Main Content Split (Activity vs Sidebar Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <RecentActivity />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <PinnedSection />
            <ActivityChart />
          </div>
        </div>
      </main>

      {/* Bottom Floating Menu for Mobile */}
      <MobileNavbar />
    </div>
  );
}
