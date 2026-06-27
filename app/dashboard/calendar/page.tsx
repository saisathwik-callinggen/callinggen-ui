"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import DashboardShell from "@/components/DashboardShell";
import { ChevronLeft, ChevronRight, Clock, Phone, User } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ── Dummy Events ─────────────────────────────────── */
type CalEvent = { id: number; title: string; time: string; type: "call" | "meeting" | "followup"; contact: string };

const dummyEvents: Record<string, CalEvent[]> = {
  "2026-06-10": [
    { id: 1, title: "Follow-up: Lead A", time: "09:00 AM", type: "followup", contact: "Ravi Kumar" },
    { id: 2, title: "Qualifying Call", time: "11:30 AM", type: "call", contact: "Priya Shah" },
  ],
  "2026-06-15": [
    { id: 3, title: "Team Review", time: "02:00 PM", type: "meeting", contact: "Internal" },
  ],
  "2026-06-18": [
    { id: 4, title: "Sales Call: Enterprise", time: "10:00 AM", type: "call", contact: "Anil Mehta" },
    { id: 5, title: "Demo Presentation", time: "03:30 PM", type: "meeting", contact: "TechCorp Ltd" },
  ],
  "2026-06-24": [
    { id: 6, title: "Reminder: Policy renewal", time: "10:00 AM", type: "followup", contact: "Sneha Patel" },
    { id: 7, title: "Agent check-in", time: "04:00 PM", type: "meeting", contact: "Internal" },
  ],
  "2026-06-26": [
    { id: 8, title: "Bulk campaign review", time: "09:30 AM", type: "meeting", contact: "Internal" },
    { id: 9, title: "Lead qualification", time: "01:00 PM", type: "call", contact: "Karan Joshi" },
    { id: 10, title: "Follow-up: Insurance", time: "04:30 PM", type: "followup", contact: "Meera Iyer" },
  ],
  "2026-06-28": [
    { id: 11, title: "Monthly report call", time: "11:00 AM", type: "call", contact: "Management" },
  ],
};

const typeColors: Record<string, string> = {
  call: "bg-zinc-900 dark:bg-white",
  meeting: "bg-zinc-500",
  followup: "bg-zinc-300 dark:bg-zinc-600",
};

const typeBadge: Record<string, string> = {
  call: "bg-zinc-900 text-white dark:bg-white dark:text-black",
  meeting: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100",
  followup: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const today = new Date();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string>(toKey(today.getFullYear(), today.getMonth(), today.getDate()));

  useEffect(() => {
    if (!isLoggedIn) router.replace("/login");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  /* ── Calendar grid helpers ── */
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { day: number; current: boolean; key: string }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, current: false, key: "" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, key: toKey(viewYear, viewMonth, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false, key: "" });
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectedEvents = dummyEvents[selected] ?? [];

  return (
    <DashboardShell title="Calendar">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">

        {/* ── Calendar Grid ── */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Month navigation */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
            <h2 className="text-sm font-semibold">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); setSelected(toKey(today.getFullYear(), today.getMonth(), today.getDate())); }}
                className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-zinc-100 dark:border-zinc-800">
            {DAYS.map(d => (
              <div key={d} className="py-2 text-center text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((cell, idx) => {
              const isToday = cell.current && cell.key === toKey(today.getFullYear(), today.getMonth(), today.getDate());
              const isSelected = cell.current && cell.key === selected;
              const hasEvents = cell.current && !!dummyEvents[cell.key];
              return (
                <button
                  key={idx}
                  onClick={() => cell.current && setSelected(cell.key)}
                  disabled={!cell.current}
                  className={`relative border-b border-r border-zinc-100 p-2 text-center transition dark:border-zinc-800 ${
                    !cell.current ? "bg-zinc-50/50 dark:bg-zinc-950/40" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  } ${isSelected ? "bg-zinc-900 dark:bg-white" : ""}`}
                >
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                      isSelected
                        ? "text-white dark:text-black"
                        : isToday
                        ? "rounded-full border-2 border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                        : cell.current
                        ? "text-zinc-700 dark:text-zinc-300"
                        : "text-zinc-300 dark:text-zinc-700"
                    }`}
                  >
                    {cell.day}
                  </span>
                  {hasEvents && !isSelected && (
                    <div className="mx-auto mt-1 flex justify-center gap-0.5">
                      {(dummyEvents[cell.key] ?? []).slice(0, 3).map((_, i) => (
                        <div key={i} className="h-1 w-1 rounded-full bg-zinc-500 dark:bg-zinc-400" />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Event panel ── */}
        <div className="flex flex-col gap-4">
          {/* Selected date header */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Selected</p>
            <p className="mt-1 text-lg font-bold">
              {selected
                ? new Date(selected + "T00:00:00").toLocaleDateString("en-IN", {
                    weekday: "long", day: "numeric", month: "long",
                  })
                : "—"}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              {selectedEvents.length === 0
                ? "No events scheduled"
                : `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} scheduled`}
            </p>
          </div>

          {/* Events list */}
          <div className="flex flex-col gap-2">
            {selectedEvents.length === 0 ? (
              <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-400 dark:text-zinc-500">No events for this day</p>
              </div>
            ) : (
              selectedEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${typeColors[ev.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-tight">{ev.title}</p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <Clock className="h-3 w-3" /> {ev.time}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <User className="h-3 w-3" /> {ev.contact}
                        </span>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeBadge[ev.type]}`}>
                      {ev.type === "call" ? "Call" : ev.type === "meeting" ? "Meeting" : "Follow-up"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Upcoming summary */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Upcoming Events</p>
            {Object.entries(dummyEvents)
              .sort()
              .slice(0, 3)
              .map(([date, events]) => (
                <button
                  key={date}
                  onClick={() => { setSelected(date); const d = new Date(date + "T00:00:00"); setViewMonth(d.getMonth()); setViewYear(d.getFullYear()); }}
                  className="mb-2 flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-xs font-bold dark:border-zinc-700 dark:bg-zinc-800">
                    {new Date(date + "T00:00:00").getDate()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-medium">{events[0].title}</p>
                    <p className="text-[10px] text-zinc-400">{events.length} event{events.length > 1 ? "s" : ""}</p>
                  </div>
                  <Phone className="h-3.5 w-3.5 text-zinc-400" />
                </button>
              ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
