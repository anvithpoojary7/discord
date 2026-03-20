import React from 'react';

const online = [
  { id: 1, name: 'Anvith', status: 'online', avatar: '👤' },
  { id: 2, name: 'Rahul', status: 'online', avatar: '👤' },
  { id: 3, name: 'Kiran', status: 'idle', avatar: '👤' }
];

function OnlineUsers() {
  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-green-500' : 'bg-yellow-500';
  };

  return (
    <div className="bg-[#313338] w-56 p-4 text-gray-300 flex flex-col h-full">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-400">
        Online — {online.length}
      </h2>
      <div className="flex-1 overflow-y-auto space-y-2">
        {online.map(user => (
          <div
            key={user.id}
            className="flex items-center gap-3 py-2 px-2 rounded hover:bg-[#383a40] cursor-pointer transition"
          >
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                {user.avatar}
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                  user.status
                )} rounded-full border-2 border-[#313338]`}
              ></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {user.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineUsers;