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
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-slate-900">
      <div className="w-full max-w-md">
        <div className="mb-10 lg:hidden">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">
              school
            </span>
            <h2 className="text-xl font-bold dark:text-white">StudyAI</h2>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {type === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {type === "login"
              ? "Please enter your university details to sign in."
              : "Start your journey with StudyAI today."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
              Email Address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-xl">
                  mail
                </span>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-primary focus:border-primary transition-all"
                placeholder="name@university.edu"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
                Password
              </label>
              <a className="text-sm font-semibold text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-xl">
                  lock
                </span>
              </div>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-primary focus:border-primary transition-all"
                type="password"
                placeholder="••••••••"
                required
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  visibility
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary border-slate-300 rounded"
            />
            <label className="ml-2 text-sm text-slate-700 dark:text-slate-300">
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-xl text-white bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all"
          >
            {loading ? "Loading..." : type === "login" ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-sm text-center text-slate-500">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              onClick={() =>
                router.push(type === "login" ? "/register" : "/login")
              }
              className="text-primary font-semibold cursor-pointer ml-1"
            >
              {type === "login" ? "Sign up" : "Sign in"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
