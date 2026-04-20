import React from "react";

export default function Topbar({ onRefresh, loading }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Library Admin</h1>
      </div>
      <div className="topbar-right">
        <span className="badge-admin">Admin</span>
        <button className="refresh-btn" onClick={onRefresh} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
        <div className="avatar">AD</div>
      </div>
    </div>
  );
}
