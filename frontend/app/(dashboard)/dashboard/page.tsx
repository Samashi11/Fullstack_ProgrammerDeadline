"use client";

import LogoutButton from "../../../app/components/logout/LogoutButton";
import { getToken } from "@/app/lib/auth";
import { useEffect } from "react";
import api from "@/app/lib/api";
import { useRouter } from "next/dist/client/components/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export default function DashboardPage() {
  useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        console.log(res.data);
      } catch (err) {
        console.error("Unauthorized", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
}
