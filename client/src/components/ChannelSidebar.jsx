import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';

function ChannelSidebar() {
  const { selectedServer, channels, selectedChannel, setSelectedChannel } = useServer();

  const [textCollapsed, setTextCollapsed] = useState(false);
  const [voiceCollapsed, setVoiceCollapsed] = useState(false);

  if (!selectedServer) return (
    <div style={{ width: '240px', backgroundColor: '#2f3136' }} />
  );

  // Split channels by type — default to 'text' if no type field
  const textChannels = channels.filter(ch => !ch.type || ch.type === 'text');
  const voiceChannels = channels.filter(ch => ch.type === 'voice');

  return (
    <div
      style={{
        width: '240px',
        minWidth: '240px',
        backgroundColor: '#2f3136',
        display: 'flex',
        flexDirection: 'column',
        color: '#dcddde',
        fontFamily: "'gg sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        userSelect: 'none',
      }}
    >
      {/* ── Server name header ── */}
      <div
        style={{
          padding: '0 16px',
          height: '48px',
          borderBottom: '1px solid #26282c',
          fontWeight: 600,
          fontSize: '15px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selectedServer.name}
        </span>
        {/* Chevron down */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b9bbbe" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Channel list ── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: '8px' }}>

        {/* ── TEXT CHANNELS section ── */}
        <SectionHeader
          label="Text Channels"
          collapsed={textCollapsed}
          onToggle={() => setTextCollapsed(p => !p)}
        />

        {!textCollapsed && (
          <>
            {textChannels.length > 0 ? textChannels.map(ch => (
              <ChannelRow
                key={ch._id}
                channel={ch}
                isSelected={selectedChannel?._id === ch._id}
                onClick={() => setSelectedChannel(ch)}
                icon="text"
              />
            )) : (
              <EmptyNote text="No text channels" />
            )}
          </>
        )}

        {/* ── VOICE CHANNELS section ── */}
        {voiceChannels.length > 0 && (
          <>
            <SectionHeader
              label="Voice Channels"
              collapsed={voiceCollapsed}
              onToggle={() => setVoiceCollapsed(p => !p)}
              style={{ marginTop: '16px' }}
            />
            {!voiceCollapsed && voiceChannels.map(ch => (
              <ChannelRow
                key={ch._id}
                channel={ch}
                isSelected={selectedChannel?._id === ch._id}
                onClick={() => setSelectedChannel(ch)}
                icon="voice"
              />
            ))}
          </>
        )}

      </div>
    </div>
  );
}

/* ── Section header with collapse chevron ── */
function SectionHeader({ label, collapsed, onToggle, style }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px 4px 6px',
        margin: '0 0 2px 0',
        cursor: 'pointer',
        ...style,
      }}
    >
      {/* Collapse chevron */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={hovered ? '#dcddde' : '#8e9297'}
        strokeWidth="3"
        style={{
          marginRight: '4px',
          flexShrink: 0,
          transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>

      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: hovered ? '#dcddde' : '#8e9297',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          flex: 1,
          transition: 'color 0.1s',
        }}
      >
        {label}
      </span>

      {/* Plus icon on hover */}
      {hovered && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dcddde"
          strokeWidth="2.5"
          onClick={e => e.stopPropagation()}
          style={{ cursor: 'pointer' }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}
    </div>
  );
}

/* ── Single channel row ── */
function ChannelRow({ channel, isSelected, onClick, icon }) {
  const [hovered, setHovered] = useState(false);
  const active = isSelected || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 8px',
        margin: '1px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: isSelected
          ? 'rgba(79,84,92,0.6)'
          : hovered
          ? 'rgba(79,84,92,0.3)'
          : 'transparent',
        color: isSelected ? '#ffffff' : hovered ? '#dcddde' : '#8e9297',
        fontSize: '15px',
        fontWeight: isSelected ? 500 : 400,
        transition: 'background-color 0.1s, color 0.1s',
      }}
    >
      {/* Icon: hash for text, speaker for voice */}
      {icon === 'voice' ? (
        <VoiceIcon color={active ? '#b9bbbe' : '#6d6f78'} />
      ) : (
        <HashIcon color={active ? '#b9bbbe' : '#6d6f78'} />
      )}

      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}
      >
        {channel.name}
      </span>

      {/* Invite / Settings icons on hover */}
      {hovered && (
        <div style={{ display: 'flex', gap: '4px', marginLeft: '4px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b9bbbe" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>
      )}
    </div>
  );
}

function HashIcon({ color }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2"
      style={{ marginRight: '8px', flexShrink: 0 }}
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

function VoiceIcon({ color }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2"
      style={{ marginRight: '8px', flexShrink: 0 }}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
  
function EmptyNote({ text }) {
  return (
    <div style={{ padding: '4px 16px', fontSize: '13px', color: '#72767d' }}>
      {text}
    </div>
  );
}

export default ChannelSidebar;