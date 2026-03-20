import { useState } from 'react';
import ServerSidebar from '../components/ServerSidebar.jsx';
import ChannelSidebar from '../components/ChannelSidebar.jsx';
import ChatArea from '../components/ChatArea.jsx';
import OnlineUsers from '../components/OnlineUsers.jsx';

function ChatPage() {
  const channels = ['general', 'backend', 'frontend', 'redis'];
  const [selectedChannel, setSelectedChannel] = useState('general');

  const [messages, setMessages] = useState({
    general: [
      { user: 'User1', text: 'Hello everyone', timestamp: '10:00' },
      { user: 'User2', text: 'Welcome to the general channel', timestamp: '10:02' },
    ],
    backend: [
      { user: 'UserA', text: 'Backend discussion here', timestamp: '10:05' },
    ],
    frontend: [],
    redis: [],
  });

  const handleSend = text => {
    const newMsg = {
      user: 'You',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => ({
      ...prev,
      [selectedChannel]: [...prev[selectedChannel], newMsg],
    }));
  };

  return (
    <div className="flex h-screen text-white">
      <ServerSidebar />
      <ChannelSidebar
        channels={channels}
        selectedChannel={selectedChannel}
        onSelectChannel={setSelectedChannel}
      />
      <ChatArea
        channelName={selectedChannel}
        messages={messages[selectedChannel]}
        onSendMessage={handleSend}
      />
      <OnlineUsers />
    </div>
  );
}

export default ChatPage;