import React, { useRef, useEffect } from 'react';
import { Hash } from 'lucide-react';

function MessageList({ messages, serverName, selectedChannel }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-6 bg-[#313338]">

      {/* HEADER */}
      <div className="mb-8 flex flex-col items-center py-10">
        <div className="w-20 h-20 bg-[#41434a] rounded-full flex items-center justify-center mb-4">
          <Hash size={45} className="text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white text-center">
          Welcome to {serverName || "Server"}
        </h1>

        <p className="text-[#b5bac1] mt-2">
          This is the beginning of #{selectedChannel?.name || "general"}
        </p>

        <div className="w-full border-b border-[#3f4147] mt-10"></div>
      </div>

      {/* MESSAGES */}
      {messages.map((m, idx) => (
        <div key={idx} className="hover:bg-[#2e3035] px-4 py-1">
          <div className="flex gap-2">
            <span className="font-bold text-white">{m.user}</span>
            <span className="text-[#949ba4] text-xs">{m.timestamp}</span>
          </div>
          <p className="text-[#dbdee1]">{m.text}</p>
        </div>
      ))}

    </div>
  );
}

export default MessageList;