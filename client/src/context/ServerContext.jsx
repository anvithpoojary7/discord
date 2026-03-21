import React, { createContext, useContext, useState, useEffect } from 'react';

const ServerContext = createContext();

export function ServerProvider({ children }) {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Fetch all servers on mount
  const fetchServers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/servers", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setServers(data);

      // Auto-open the first server on load
      if (data.length > 0) {
        await selectServer(data[0]);
      }
    } catch (err) {
      console.error("Error loading servers", err);
    }
  };

  // Fetch channels for a given server and auto-select the first one
  const selectServer = async (server) => {
    setSelectedServer(server);
    setSelectedChannel(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/servers/${server._id}/channels`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setChannels(data);
      
      // Auto-select the top channel
      if (data.length > 0) {
        setSelectedChannel(data[0]);
      }
    } catch (err) {
      console.error("Error loading channels", err);
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <ServerContext.Provider value={{
      servers,
      setServers,
      fetchServers,
      selectedServer,
      selectServer,
      channels,
      selectedChannel,
      setSelectedChannel,
    }}>
      {children}
    </ServerContext.Provider>
  );
}

// Custom hook for easy consumption
export function useServer() {
  return useContext(ServerContext);
}