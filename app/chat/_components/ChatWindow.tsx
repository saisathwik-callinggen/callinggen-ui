import { MoreVertical, Phone, Paperclip, Smile, Mic, Send, MapPin } from "lucide-react";
import { mockMessages, mockContacts } from "../_mockData";

export default function ChatWindow({ activeContactId }: { activeContactId: string }) {
  const contact = mockContacts.find((c) => c.id === activeContactId) || mockContacts[0];

  return (
    <div className="flex h-full flex-1 flex-col bg-[#f0f2f5] dark:bg-[#0b141a]">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {contact.name}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {contact.online ? "Online" : "Last seen recently"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-800/50 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/50">
            <Phone className="h-3.5 w-3.5" />
            Call Summary
          </button>
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ backgroundImage: "url('/chat-bg.png')", backgroundSize: "cover", opacity: 0.95 }}>
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <span className="rounded-lg bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm dark:bg-zinc-800/80 dark:text-zinc-400">
              TODAY
            </span>
          </div>

          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm sm:max-w-[75%] lg:max-w-[65%] ${
                  msg.isMe
                    ? "bg-[#d9fdd3] text-[#111b21] dark:bg-[#005c4b] dark:text-[#e9edef] rounded-tr-none"
                    : "bg-white text-[#111b21] dark:bg-[#202c33] dark:text-[#e9edef] rounded-tl-none"
                }`}
              >
                {msg.agentLabel && (
                  <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-[#025144] dark:text-[#46c2a1]">
                    <Smile className="h-3 w-3" />
                    {msg.agentLabel}
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400/80">
                    {msg.time}
                  </span>
                  {msg.isMe && (
                    <svg viewBox="0 0 16 15" width="16" height="15" className="fill-blue-500 dark:fill-[#53bdeb]">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Example Rich Media Bubble (Location/Image) */}
          <div className="flex w-full justify-end">
             <div className="relative max-w-[85%] rounded-2xl bg-[#d9fdd3] p-1 shadow-sm rounded-tr-none dark:bg-[#005c4b] sm:max-w-[75%] lg:max-w-[65%]">
               <div className="overflow-hidden rounded-xl bg-zinc-200 aspect-[4/3] flex flex-col items-center justify-center relative group dark:bg-zinc-800">
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex flex-col items-center">
                       <MapPin className="h-8 w-8 text-violet-500 mb-2" />
                       <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Skyline Penthouse - Midtown</span>
                    </div>
                  </div>
               </div>
               <div className="px-3 pb-2 pt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400/80">12:30</span>
                  <svg viewBox="0 0 16 15" width="16" height="15" className="fill-blue-500 dark:fill-[#53bdeb]">
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                  </svg>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 bg-[#f0f2f5] px-4 py-3 dark:bg-[#202c33]">
        <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
          <Smile className="h-6 w-6" />
        </button>
        <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
          <Paperclip className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-xl border-none bg-white px-4 py-2.5 text-sm outline-none dark:bg-[#2a3942] dark:text-zinc-100 dark:placeholder:text-zinc-400"
          />
        </div>
        <button className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
          <Mic className="h-6 w-6" />
        </button>
        <button className="rounded-full bg-violet-600 p-2 text-white hover:bg-violet-700 dark:bg-[#00a884]">
          <Send className="h-5 w-5 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
