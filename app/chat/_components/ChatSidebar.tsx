import { Search, Plus, Filter } from "lucide-react";
import { mockContacts } from "../_mockData";

export default function ChatSidebar({
  activeContactId,
  onSelectContact,
}: {
  activeContactId: string;
  onSelectContact: (id: string) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col border-r border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80 sm:w-80 lg:w-96 shadow-lg relative z-10">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-5">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Chats</h2>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-all hover:bg-violet-200 hover:scale-105 hover:shadow-md dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Search and New Broadcast */}
      <div className="space-y-4 px-5 pb-5">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-violet-500" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_auto] hover:bg-right py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:-translate-y-0.5">
          <Plus className="h-4 w-4" />
          New Broadcast
        </button>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 custom-scrollbar">
        {mockContacts.map((contact) => {
          const isActive = contact.id === activeContactId;
          return (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`flex cursor-pointer gap-3 rounded-2xl p-3 transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-r from-violet-50 to-indigo-50/50 shadow-sm ring-1 ring-violet-200/50 dark:from-violet-900/20 dark:to-indigo-900/10 dark:ring-violet-800/30 translate-x-1" 
                  : "hover:bg-zinc-50 hover:translate-x-1 dark:hover:bg-zinc-900/50"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="h-11 w-11 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-zinc-950"
                />
                {contact.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-zinc-900" />
                )}
              </div>

              {/* Details */}
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h3 className={`truncate text-sm font-bold ${isActive ? "text-violet-900 dark:text-violet-100" : "text-zinc-900 dark:text-zinc-100"}`}>
                    {contact.name}
                  </h3>
                  <span className={`shrink-0 text-[11px] font-medium ${isActive ? "text-violet-600 dark:text-violet-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {contact.time}
                  </span>
                </div>
                <p className={`truncate text-xs mt-0.5 ${isActive ? "text-violet-700/80 dark:text-violet-300/80" : "text-zinc-500 dark:text-zinc-400"}`}>
                  {contact.lastMessage}
                </p>

                {/* Tags */}
                {contact.tags && contact.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {contact.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                          tag.color === "green"
                            ? "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 ring-1 ring-emerald-200/50 dark:ring-emerald-800/30"
                            : tag.color === "blue"
                            ? "bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 ring-1 ring-blue-200/50 dark:ring-blue-800/30"
                            : "bg-zinc-100/80 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 ring-1 ring-zinc-200/50 dark:ring-zinc-700/50"
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

