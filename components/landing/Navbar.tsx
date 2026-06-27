"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Phone className="h-4 w-4" />
          </div>
          <span className="gradient-text">CallingGen</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#features"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            Features
          </Link>

          <Link
            href="/#industries"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            Industries
          </Link>

          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            Pricing
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all hover:text-foreground hover:bg-accent hover:border-primary/30 hover:shadow-md active:scale-95"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            id="theme-toggle"
          >
            <Sun
              className={`h-[18px] w-[18px] transition-all duration-300 ${
                theme === "dark"
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              style={{ position: theme === "dark" ? "absolute" : "relative" }}
            />
            <Moon
              className={`h-[18px] w-[18px] transition-all duration-300 ${
                theme === "light"
                  ? "-rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              style={{ position: theme === "light" ? "absolute" : "relative" }}
            />
          </button>

          <Link
            href="/login"
            className="ml-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.97]"
          >
            Login
          </Link>
        </div>

        {/* Mobile hamburger + theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all hover:text-foreground active:scale-95"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            id="theme-toggle-mobile"
          >
            {theme === "light" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-all active:scale-95"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X className="h-[18px] w-[18px]" />
            ) : (
              <Menu className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-64 border-t border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          <Link
            href="/#features"
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/#industries"
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            Industries
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}