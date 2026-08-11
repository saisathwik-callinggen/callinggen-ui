"use client";

import Link from "next/link";
import { Sun, Moon, Phone, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
    { name: "Industries", href: "/#industries" },
    { name: "How It Works", href: "/#workflow" },
    { name: "Pricing", href: "/pricing" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQs", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90 z-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#4F6BFF] to-[#7B61FF] shadow-lg shadow-[#4F6BFF]/25">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            CallingGen
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4F6BFF] transition-all group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 border-l border-zinc-200/80 pl-8 dark:border-zinc-800/80">
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
              className="group relative overflow-hidden rounded-full bg-zinc-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-zinc-900 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF] to-[#7B61FF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden z-50">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100/80 backdrop-blur-md text-zinc-600 transition-all dark:bg-zinc-900/80 dark:text-zinc-400"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100/80 backdrop-blur-md text-zinc-900 transition-all dark:bg-zinc-900/80 dark:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full border-t border-zinc-200/50 bg-white/95 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/95 shadow-2xl lg:hidden origin-top"
          >
            <div className="flex flex-col px-6 py-6 h-[calc(100vh-72px)] overflow-y-auto pb-32">
              <div className="flex flex-col gap-1 mb-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium text-zinc-800 transition-colors hover:bg-zinc-100/50 dark:text-zinc-200 dark:hover:bg-zinc-800/50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.name}
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto space-y-3 pb-8">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-xl border border-zinc-200 px-4 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/#demo"
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#4F6BFF] to-[#7B61FF] px-4 py-4 text-base font-medium text-white shadow-lg shadow-[#4F6BFF]/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}