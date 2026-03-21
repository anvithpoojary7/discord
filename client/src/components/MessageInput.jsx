import React, { useState } from 'react';
import { PlusCircle, Gift, StickyNote, Smile, Ghost } from 'lucide-react';
import { useServer } from "../context/ServerContext"; // ✅ ADD

function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const { selectedChannel } = useServer(); // ✅ ADD

  const handleSend = (e) => {
    e.preventDefault();

    if (text.trim() === '') return;
    if (!selectedChannel) return; // ✅ safety

    onSend(text); // 🔥 call parent (ChatArea API logic)
    setText('');
  };

  return (
    <div className="px-4 pb-6 bg-[#313338]">
      <form 
        onSubmit={handleSend}
        className="flex items-center bg-[#383a40] rounded-lg px-4 py-2 gap-4"
      >
        <PlusCircle className="text-[#b5bac1] hover:text-white cursor-pointer" size={24} />
        
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Message #${selectedChannel?.name || "general"}`} // ✅ dynamic
          className="flex-1 bg-transparent text-[#dbdee1] focus:outline-none placeholder-[#72767d]"
        />

        <div className="flex items-center gap-3 text-[#b5bac1]">
          <Gift size={22} className="hover:text-white cursor-pointer" />
          <Ghost size={22} className="hover:text-white cursor-pointer" />
          <StickyNote size={22} className="hover:text-white cursor-pointer" />
          <Smile size={22} className="hover:text-white cursor-pointer" />
        </div>
      </form>
    </div>
  );
}

export default MessageInput;