import { MoreVertical, Phone, Paperclip, Smile, Mic, Send, MapPin } from "lucide-react";
import { mockMessages, mockContacts } from "../_mockData";

export default function ChatWindow({ activeContactId }: { activeContactId: string }) {
  const contact = mockContacts.find((c) => c.id === activeContactId) || mockContacts[0];

  return (
    <div className="flex h-full flex-1 flex-col bg-zinc-50 dark:bg-zinc-950 relative">
      {/* Background with abstract shapes/gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-400/10 blur-[100px]" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200/50 bg-white/70 px-6 py-2 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/70 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-transparent transition-all group-hover:ring-violet-500/50"
            />
            {contact.online && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-zinc-900" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {contact.name}
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              {contact.online ? (
                <span className="text-emerald-500">Online</span>
              ) : (
                "Last seen recently"
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 px-3.5 py-1.5 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-violet-200/50 hover:bg-violet-100 dark:from-violet-900/20 dark:to-indigo-900/20 dark:text-violet-300 dark:ring-violet-800/30 dark:hover:bg-violet-900/40 transition-all hover:scale-105">
            <Phone className="h-3.5 w-3.5" />
            Call Summary
          </button>
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 rounded-xl transition-all">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 z-10 relative custom-scrollbar">
        <div className="flex flex-col gap-5">
          <div className="text-center my-2">
            <span className="rounded-full bg-white/60 px-4 py-1.5 text-xs font-bold text-zinc-600 shadow-sm backdrop-blur-md ring-1 ring-zinc-200/50 dark:bg-zinc-800/60 dark:text-zinc-400 dark:ring-zinc-700/50">
              TODAY
            </span>
          </div>

          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full group ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md transition-all sm:max-w-[75%] lg:max-w-[65%] hover:shadow-lg ${
                  msg.isMe
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm"
                    : "bg-white/90 text-zinc-900 backdrop-blur-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900/90 dark:text-zinc-100 dark:ring-zinc-800/50 rounded-tl-sm"
                }`}
              >
                {msg.agentLabel && (
                  <div className={`mb-1.5 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider ${msg.isMe ? "text-violet-200" : "text-violet-600 dark:text-violet-400"}`}>
                    <Smile className="h-3.5 w-3.5" />
                    {msg.agentLabel}
                  </div>
                )}
                <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                <div className="mt-1.5 flex items-center justify-end gap-1.5">
                  <span className={`text-[10px] font-medium ${msg.isMe ? "text-violet-200" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {msg.time}
                  </span>
                  {msg.isMe && (
                    <svg viewBox="0 0 16 15" width="14" height="13" className="fill-white/80">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Example Rich Media Bubble (Location/Image) */}
          <div className="flex w-full justify-end">
             <div className="relative max-w-[85%] rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-1 shadow-md hover:shadow-lg transition-all rounded-tr-sm sm:max-w-[75%] lg:max-w-[65%]">
               <div className="overflow-hidden rounded-[14px] bg-white/10 aspect-[4/3] flex flex-col items-center justify-center relative group backdrop-blur-md">
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20 group-hover:bg-zinc-900/30 transition-colors">
                    <div className="flex flex-col items-center p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                       <MapPin className="h-8 w-8 text-white mb-2 drop-shadow-md" />
                       <span className="text-xs font-bold text-white drop-shadow-md">Skyline Penthouse - Midtown</span>
                    </div>
                  </div>
               </div>
               <div className="px-3 pb-1.5 pt-2 flex items-center justify-end gap-1.5">
                  <span className="text-[10px] font-medium text-violet-200">12:30</span>
                  <svg viewBox="0 0 16 15" width="14" height="13" className="fill-white/80">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                  </svg>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 border-t border-zinc-200/50 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/70 z-10 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <button className="p-2.5 text-zinc-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all dark:text-zinc-400 dark:hover:text-violet-400 dark:hover:bg-violet-900/30">
          <Smile className="h-6 w-6" />
        </button>
        <button className="p-2.5 text-zinc-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all dark:text-zinc-400 dark:hover:text-violet-400 dark:hover:bg-violet-900/30">
          <Paperclip className="h-6 w-6" />
        </button>
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/50 px-5 py-3 text-sm font-medium outline-none transition-all focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-900"
          />
        </div>
        <button className="p-2.5 text-zinc-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all dark:text-zinc-400 dark:hover:text-violet-400 dark:hover:bg-violet-900/30">
          <Mic className="h-6 w-6" />
        </button>
        <button className="ml-1 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-3.5 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all">
          <Send className="h-5 w-5 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
