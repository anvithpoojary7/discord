import React, { useState } from 'react';
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, PlusCircle, Gift, StickyNote, Smile } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatArea = () => {
  const [messages, setMessages] = useState([
    { type: 'system', user: 'Gowrika', timestamp: '11-06-2025 02:29 PM' },
    { type: 'system', user: 'Dhruva', timestamp: '11-06-2025 02:46 PM' },
    { type: 'chat', user: 'gojo@1989', text: 'Domain Expansion: Infinite Void', timestamp: '10:05 PM' }
  ]);

  const addMessage = (text) => {
    const newMessage = {
      type: 'chat',
      user: 'You',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col flex-1 bg-[#313338] text-[#dbdee1] font-sans">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#26272d] shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <Hash size={24} className="text-[#80848e]" />
          <span className="font-bold text-white">general</span>
        </div>
        <div className="flex items-center gap-4 text-[#b5bac1]">
          <Bell size={20} className="hover:text-white cursor-pointer" />
          <Pin size={20} className="hover:text-white cursor-pointer" />
          <Users size={20} className="hover:text-white cursor-pointer" />
          <div className="bg-[#1e1f22] flex items-center px-2 py-1 rounded text-sm w-36">
            <input type="text" placeholder="Search" className="bg-transparent outline-none w-full" />
            <Search size={14} />
          </div>
          <Inbox size={20} className="hover:text-white cursor-pointer" />
          <HelpCircle size={20} className="hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Content */}
      <MessageList messages={messages} />
      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatArea;