import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/admin-components/Sidebar";

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "80px" : "250px";
  return (
    <div className="d-flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        style={{
          marginLeft: sidebarWidth,
          padding: "10px",
          width: "100%",
          minHeight: "100vh",
          transition: "margin-left 0.3 ease",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
