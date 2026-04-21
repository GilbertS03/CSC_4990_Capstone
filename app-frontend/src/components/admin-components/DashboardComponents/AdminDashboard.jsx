import React, { useEffect } from "react";
import "./AdminDashboard.css";

import { useDashboardData } from "./useDashboardData";
import { useRooms } from "./useRooms";

import Topbar from "./Topbar";
import StatCards from "./StatCards";
import BuildingPanel from "./BuildingPanel";
import Timeline from "./Timeline";
import AnalyticsPanel from "./AnalyticsPanel";

export default function AdminDashboard() {
  const { buildings, devices, reservations, loading, error, refresh } =
    useDashboardData();
  const { roomsByBuilding, loadingRooms, roomError, loadRooms } = useRooms();

  useEffect(() => {
    if (buildings.length > 0) {
      loadRooms(buildings[0].buildingId);
    }
  }, [buildings]);

  return (
    <div className="admin-dashboard">
      <Topbar onRefresh={refresh} loading={loading} />

      {error && <div className="error-banner">Error: {error}</div>}

      <div className="section">
        <div className="section-label">Overview</div>
        <StatCards
          buildings={buildings}
          devices={devices}
          reservations={reservations}
        />
      </div>

      <div className="section">
        <div className="two-col">
          <div>
            <div className="section-label">Buildings & rooms</div>
            <BuildingPanel
              buildings={buildings}
              devices={devices}
              roomsByBuilding={roomsByBuilding}
              loadingRooms={loadingRooms}
              roomError={roomError}
              onSelectBuilding={loadRooms}
            />
          </div>
          <div>
            <div className="section-label">Today's timeline</div>
            <Timeline reservations={reservations} />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Reports & analytics</div>
        <AnalyticsPanel devices={devices} reservations={reservations} />
      </div>
    </div>
  );
}
