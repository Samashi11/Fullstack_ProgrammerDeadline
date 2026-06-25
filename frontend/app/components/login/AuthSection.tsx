"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import { setToken } from "@/app/lib/auth";

type AuthType = "login" | "register";

export default function AuthSection({ type }: { type: AuthType }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/register";

      const res = await api.post(endpoint, {
        email,
        password,
      });

      // ✅ HANDLE REGISTER DULU (STOP DI SINI)
      if (type === "register") {
        alert("Register berhasil, silakan login");
        router.push("/login");
        return;
      }

      // ✅ BARU HANDLE LOGIN
      const token = res.data.tokens.access_token;

      setToken(token);

      router.push("/dashboard");
    } catch (err) {
      console.error(`${type} gagal:`, err);
      alert(`${type === "login" ? "Login" : "Register"} gagal`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md relative overflow-hidden bg-grid-pattern">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 blur-[100px] rounded-[100%] pointer-events-none"></div>

      {/* Card */}
      <div className="w-full max-w-[440px] bg-surface-container/40 backdrop-blur-2xl border border-outline-variant/30 rounded-xl p-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center mb-xl">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center mb-md shadow-inner">
            <span
              className="material-symbols-outlined text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dataset
            </span>
          </div>

          <h1 className="font-h2 text-h2 text-on-surface tracking-tight mb-xs">
            Welcome back
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-center">
            Authenticate to access your workspace
          </p>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-sm mb-lg">
          <button className="w-full flex items-center justify-center gap-md py-3 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-md text-body-md text-on-surface group">
            Continue with GitHub
          </button>

          <button className="w-full flex items-center justify-center gap-md py-3 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-md text-body-md text-on-surface group">
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-lg">
          <div className="flex-grow border-t border-outline-variant/30"></div>
          <span className="px-md font-body-sm text-body-sm text-on-surface-variant">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-outline-variant/30"></div>
        </div>

        {/* Form */}
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="flex flex-col gap-xs mb-md">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              Email Address
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
                mail
              </span>

              <input
                className="w-full bg-surface-container-highest/30 border border-outline-variant/50 rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all shadow-inner"
                placeholder="name@company.com"
                type="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-xs mb-sm">
            <label className="font-label-caps text-label-caps text-on-surface-variant">
              Password
            </label>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
                lock
              </span>

              <input
                className="w-full bg-surface-container-highest/30 border border-outline-variant/50 rounded-lg pl-10 pr-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/50 transition-all shadow-inner"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end mb-lg">
            <a className="font-body-sm text-body-sm text-primary hover:text-primary-fixed-dim transition-colors hover:underline decoration-primary/30 underline-offset-4">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase tracking-wider py-3.5 rounded-lg hover:bg-primary-container/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] border border-primary-container/50"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-lg text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Don&apos;t have an account?{" "}
            <span className="text-primary hover:text-primary-fixed-dim transition-colors font-medium cursor-pointer">
              Request access
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
