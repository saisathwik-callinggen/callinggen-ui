"use client";

import Link from "next/link";
import { Sun, Moon, Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Industries", href: "/#industries" },
    { name: "Workflow", href: "/#workflow" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQs", href: "/#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6C4CF1] to-[#8b75f2] shadow-lg shadow-[#6C4CF1]/20">
            <Phone className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            CallingGen
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l border-zinc-200 pl-6 dark:border-zinc-800">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/#demo"
              className="rounded-full bg-[#6C4CF1] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#6C4CF1]/20 transition-all hover:bg-[#5b3ce0] hover:shadow-lg hover:shadow-[#6C4CF1]/30 hover:-translate-y-0.5"
            >
              Book Demo
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all dark:bg-zinc-900 dark:text-zinc-400"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-all dark:bg-zinc-900 dark:text-zinc-400"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-96 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 shadow-xl" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="my-2 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
          <Link
            href="/login"
            className="rounded-lg px-4 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/#demo"
            className="mt-2 rounded-xl bg-[#6C4CF1] px-4 py-3.5 text-center text-base font-medium text-white shadow-lg shadow-[#6C4CF1]/20 transition-all hover:bg-[#5b3ce0]"
            onClick={() => setMobileOpen(false)}
          >
            Book Demo
          </Link>
        </div>
      </div>
    </header>
  );
}