"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "@/app/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}
