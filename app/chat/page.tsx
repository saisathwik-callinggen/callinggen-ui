"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import ChatSidebar from "./_components/ChatSidebar";
import ChatWindow from "./_components/ChatWindow";
import AiAssistantSidebar from "./_components/AiAssistantSidebar";

export default function ChatPage() {
  const [activeContactId, setActiveContactId] = useState("1");

  return (
    <DashboardShell title="Chat">
      {/* 
        Negative margins to remove the default padding of DashboardShell 
        and take full height of the container. 
        h-[calc(100vh-3.5rem)] accounts for the 14 (3.5rem) header height in DashboardShell.
      */}
      <div className="-m-4 md:-m-6 flex h-[calc(100vh-3.5rem)] overflow-hidden bg-white dark:bg-zinc-950">
        <ChatSidebar 
          activeContactId={activeContactId} 
          onSelectContact={setActiveContactId} 
        />
        <ChatWindow activeContactId={activeContactId} />
        {/* Hidden on very small screens, visible on large screens */}
        <div className="hidden xl:block">
           <AiAssistantSidebar />
        </div>
      </div>
    </DashboardShell>
  );
}
