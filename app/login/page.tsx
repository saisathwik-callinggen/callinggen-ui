"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, Lock, Mail, MoonStar, Phone, SunMedium } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("admin@callinggen.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (login(email, password)) {
      return;
    }

    setError("Use the demo credentials below to sign in.");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_35%),linear-gradient(135deg,#f8fafc_0%,#eef2f7_100%)] text-zinc-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.1),_transparent_35%),linear-gradient(135deg,#09090b_0%,#111827_100%)] dark:text-white">
      <nav className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 text-white shadow-sm dark:border-zinc-700 dark:bg-white dark:text-black">
              <Phone className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">CallingGen</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleTheme()}
              className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link
              href="/"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-8 text-white dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-zinc-200">
                Demo Workspace
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
                Manage your calls with a clean, focused dashboard.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300 sm:text-base">
                This demo experience gives you a polished login flow, a responsive sidebar, and a calm overview for your daily operations.
              </p>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4">
              {[
                "Fast sign-in with demo credentials",
                "Dark and light mode support",
                "Simple dashboard navigation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-200">
                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Dummy Login</p>
              <h2 className="mt-2 text-2xl font-semibold">Welcome back</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Sign in with the built-in demo account to open the dashboard.
              </p>
            </div>

            <div className="mb-5 rounded-2xl border border-zinc-200 bg-zinc-100/90 p-3 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-white">Demo credentials</p>
              <p className="mt-1">Email: admin@callinggen.com</p>
              <p>Password: admin123</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white dark:focus:ring-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-black dark:text-white dark:focus:border-white dark:focus:ring-zinc-800"
                  />
                </div>
              </div>

              {error ? (
                <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-100 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              ) : null}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-lg shadow-zinc-300/60 transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:shadow-zinc-950/40 dark:hover:bg-zinc-200"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
