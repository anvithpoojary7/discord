import React, { useRef, useEffect } from 'react';
import { Hash } from 'lucide-react';
function MessageList({ messages }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col items-center justify-center py-10">
        <div className="w-20 h-20 bg-[#41434a] rounded-full flex items-center justify-center mb-4">
           <Hash size={45} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome to Power Rangers</h1>
        <p className="text-[#b5bac1]">This is the beginning of this server.</p>
        <div className="w-full border-b border-[#3f4147] mt-10"></div>
      </div>

      {messages.map((m, idx) => (
        <div key={idx} className="group hover:bg-[#2e3035] -mx-4 px-4 py-[2px] transition-colors">
          {m.type === 'system' ? (
            /* System Join Message */
            <div className="flex items-center gap-4 py-1">
              <span className="text-[#23a559] text-xl">➔</span>
              <div className="flex flex-col">
                <p className="text-[#b5bac1]">
                  Good to see you, <span className="text-white font-semibold">{m.user}</span>. 
                  <span className="text-[#949ba4] text-xs ml-2">{m.timestamp}</span>
                </p>
                <button className="mt-2 w-fit bg-[#2b2d31] hover:bg-[#4e5058] border border-transparent rounded-md px-3 py-1 flex items-center gap-2 text-sm transition">
                  👋 <span className="text-white font-medium text-xs">Wave to say hi!</span>
                </button>
              </div>
            </div>
          ) : (
            /* Regular Chat Message */
            <div className="flex flex-col py-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white hover:underline cursor-pointer">{m.user}</span>
                <span className="text-[#949ba4] text-[10px]">{m.timestamp}</span>
              </div>
              <p className="text-[#dbdee1]">{m.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageList;