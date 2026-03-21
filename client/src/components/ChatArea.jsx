import React, { useState, useEffect } from 'react';
import {
  Hash, Bell, Pin, Users, Search, Inbox, HelpCircle
} from 'lucide-react';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useServer } from "../context/ServerContext";

const ChatArea = () => {

  const { selectedServer, selectedChannel } = useServer();

  const [messages, setMessages] = useState([]);

  // ✅ FETCH MESSAGES WHEN CHANNEL CHANGES
  useEffect(() => {
    if (!selectedChannel) return;
    fetchMessages(selectedChannel._id);
  }, [selectedChannel]);

  // ✅ FETCH FUNCTION
  const fetchMessages = async (channelId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/messages/${channelId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      const formatted = data.map(msg => ({
        type: msg.type,
        user: msg.username,
        text: msg.text,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      }));

      setMessages(formatted);

    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  // ✅ SEND MESSAGE
  const addMessage = async (text) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:3000/api/messages/${selectedChannel._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      // refresh messages
      fetchMessages(selectedChannel._id);

    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#313338] text-[#dbdee1]">

      {/* HEADER */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-[#26272d]">

        <div className="flex items-center gap-2">
          <Hash size={24} className="text-[#80848e]" />
          <span className="font-bold text-white">
            {selectedChannel?.name || "general"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#b5bac1]">
          <Bell size={20} />
          <Pin size={20} />
          <Users size={20} />
          <div className="bg-[#1e1f22] flex items-center px-2 py-1 rounded text-sm w-36">
            <input placeholder="Search" className="bg-transparent outline-none w-full" />
            <Search size={14} />
          </div>
          <Inbox size={20} />
          <HelpCircle size={20} />
        </div>

      </div>

      {/* MESSAGES */}
      <MessageList
        messages={messages}
        serverName={selectedServer?.name}
        selectedChannel={selectedChannel}
      />

      {/* INPUT */}
      <MessageInput onSend={addMessage} />

    </div>
  );
};

export default ChatArea;