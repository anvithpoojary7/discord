import React, { useState } from 'react';
import CreateServerModal from './CreateServerModel';
import { useServer } from '../context/ServerContext';

function ServerSidebar() {
  const [showModal, setShowModal] = useState(false);
  const { servers, selectedServer, selectServer, fetchServers } = useServer();

  return (
    <>
      <div className="bg-gray-900 w-16 flex flex-col items-center py-4 space-y-2">

        {servers.map((server) => {
          const isSelected = selectedServer?._id === server._id;

          return (
            <div key={server._id} className="relative flex items-center w-full justify-center">

              {/* Active pill indicator on the left */}
              <div
                className="absolute left-0 bg-white rounded-r-full transition-all duration-150"
                style={{
                  width: '4px',
                  height: isSelected ? '40px' : '0px',
                }}
              />

              {/* Server icon */}
              <div
                onClick={() => selectServer(server)}
                title={server.name}
                className="w-12 h-12 flex items-center justify-center text-white font-bold cursor-pointer overflow-hidden transition-all duration-150"
                style={{
                  borderRadius: isSelected ? '30%' : '50%',
                  backgroundColor: isSelected ? '#5865f2' : '#36393f',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderRadius = '30%';
                    e.currentTarget.style.backgroundColor = '#5865f2';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderRadius = '50%';
                    e.currentTarget.style.backgroundColor = '#36393f';
                  }
                }}
              >
                {server.image ? (
                  <img
                    src={`http://localhost:3000/uploads/${server.image}`}
                    alt={server.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span style={{ fontSize: '16px' }}>
                    {server.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Add Server Button */}
        <div className="relative flex items-center w-full justify-center mt-auto">
          <div
            onClick={() => setShowModal(true)}
            title="Add a Server"
            className="w-12 h-12 flex items-center justify-center text-green-400 font-bold cursor-pointer transition-all duration-150"
            style={{ borderRadius: '50%', backgroundColor: '#36393f', fontSize: '24px' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderRadius = '30%';
              e.currentTarget.style.backgroundColor = '#3ba55c';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderRadius = '50%';
              e.currentTarget.style.backgroundColor = '#36393f';
              e.currentTarget.style.color = '#3ba55c';
            }}
          >
            +
          </div>
        </div>

      </div>

      {showModal && (
        <CreateServerModal
          closeModal={() => {
            setShowModal(false);
            fetchServers();
          }}
        />
      )}
    </>
  );
}

export default ServerSidebar;