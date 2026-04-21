import React, { useState, useEffect } from 'react';

function RoomCard({ room, devices }) {
  const roomDevices = devices.filter((d) => d.roomId === room.roomId);
  const online = roomDevices.filter(
    (d) => d.deviceStatus && d.deviceStatus.toLowerCase() !== 'offline'
  ).length;

  let statusClass = 's-open';
  if (roomDevices.length > 0) {
    if (online === 0) statusClass = 's-offline';
    else if (online < roomDevices.length) statusClass = 's-busy';
  }

  return (
    <div className="room-card">
      <span className={`room-status ${statusClass}`} />
      <div className="room-name">{room.roomName}</div>
      <div className="room-devices">
        {roomDevices.length} device{roomDevices.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default function BuildingPanel({
  buildings,
  devices,
  roomsByBuilding,
  loadingRooms,
  roomError,
  onSelectBuilding,
}) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (buildings.length > 0 && selectedId === null) {
      const first = buildings[0].buildingId;
      setSelectedId(first);
      onSelectBuilding(first);
    }
  }, [buildings]);

  const handleSelect = (id) => {
    setSelectedId(id);
    onSelectBuilding(id);
  };

  const selectedBuilding = buildings.find((b) => b.buildingId === selectedId);
  const rooms = roomsByBuilding[selectedId] || [];

  return (
    <div className="panel">
      <div className="building-list">
        {buildings.map((b) => (
          <div
            key={b.buildingId}
            className={`building-row${selectedId === b.buildingId ? ' active' : ''}`}
            onClick={() => handleSelect(b.buildingId)}
          >
            <div>
              <div className="building-name">{b.buildingName}</div>
              <div className="building-meta">ID: {b.buildingId}</div>
            </div>
            <span className="pill pill-purple">
              {roomsByBuilding[b.buildingId]
                ? `${roomsByBuilding[b.buildingId].length} rooms`
                : '— rooms'}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '0.75rem' }}>
        <div className="room-panel-title">
          {selectedBuilding ? `${selectedBuilding.buildingName} — rooms` : 'Select a building'}
        </div>
        {loadingRooms && <div className="loading-text">Loading rooms...</div>}
        {roomError && <div className="error-text">{roomError}</div>}
        {!loadingRooms && !roomError && (
          <div className="room-grid">
            {rooms.length === 0 ? (
              <div className="loading-text">No rooms found.</div>
            ) : (
              rooms.map((r) => (
                <RoomCard key={r.roomId} room={r} devices={devices} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
