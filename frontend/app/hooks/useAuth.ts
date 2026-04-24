"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/lib/auth";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  }, []);
};

export default useAuth;
