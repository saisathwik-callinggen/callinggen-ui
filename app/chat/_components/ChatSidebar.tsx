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
    <div className="flex h-full w-full flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sm:w-80 lg:w-96">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Chats</h2>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Search and New Broadcast */}
      <div className="space-y-3 px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:placeholder:text-zinc-500"
          />
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/20 hover:opacity-90">
          <Plus className="h-4 w-4" />
          New Broadcast
        </button>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {mockContacts.map((contact) => {
          const isActive = contact.id === activeContactId;
          return (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`flex cursor-pointer gap-3 border-b border-zinc-100 p-4 transition hover:bg-zinc-50 dark:border-zinc-800/50 dark:hover:bg-zinc-800/50 ${
                isActive ? "bg-zinc-50 dark:bg-zinc-800/80" : ""
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                {contact.online && (
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
                )}
              </div>

              {/* Details */}
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {contact.name}
                  </h3>
                  <span className="shrink-0 text-xs text-zinc-500">{contact.time}</span>
                </div>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {contact.lastMessage}
                </p>

                {/* Tags */}
                {contact.tags && contact.tags.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {contact.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                          tag.color === "green"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : tag.color === "blue"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
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
