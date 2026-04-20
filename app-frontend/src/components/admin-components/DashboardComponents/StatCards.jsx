import React, { useMemo } from "react";

export default function StatCards({ buildings, devices, reservations }) {
  const stats = useMemo(() => {
    const active = reservations.filter(
      (r) => r.status && r.status.toLowerCase().includes("available"),
    ).length;
    const online = devices.filter(
      (d) => d.deviceStatus && d.deviceStatus.toLowerCase() !== "unavailable",
    ).length;
    const offline = devices.length - online;
    const uniqueUsers = new Set(reservations.map((r) => r.userId)).size;

    return { active, online, offline, uniqueUsers };
  }, [buildings, devices, reservations]);

  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="stat-label">Total reservations</div>
        <div className="stat-value">{reservations.length}</div>
        <div className="stat-sub">
          <span className="dot dot-teal" />
          {stats.active} active now
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Devices online</div>
        <div className="stat-value">{stats.online}</div>
        <div className="stat-sub">
          <span className="dot dot-amber" />
          {stats.offline} offline
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Buildings</div>
        <div className="stat-value">{buildings.length}</div>
        <div className="stat-sub">
          <span className="dot dot-blue" />
          {devices.length} total devices
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Unique users</div>
        <div className="stat-value">{stats.uniqueUsers}</div>
        <div className="stat-sub">
          <span className="dot dot-purple" />
          from reservations
        </div>
      </div>
    </div>
  );
}
