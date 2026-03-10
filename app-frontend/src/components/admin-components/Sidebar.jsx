import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Menu,
  UserRoundSearch,
  Users,
} from "lucide-react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const iconSize = 24;

  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link active bg-primary text-white d-flex align-items-center"
      : "nav-link text-white d-flex align-items-center";

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3"
      style={{
        width: collapsed ? "80px" : "250px",
        height: "100vh",
        position: "fixed",
        transition: "width 0.3s",
      }}
    >
      {/* Toggle Button */}
      <div className="container">
        {!collapsed && (
          <span className="fs-4 pe-3">{!collapsed && "Admin Tools"}</span>
        )}
        <button
          className="btn btn-outline-light mb-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={iconSize} />
        </button>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column gap-2">
        <li>
          <NavLink to="/admin" end className={linkClass}>
            <Home size={iconSize} className="me-2" />
            {!collapsed && "Admin Home"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-search" end className={linkClass}>
            <UserRoundSearch size={iconSize} className="me-2" />
            {!collapsed && "Search Users"}
          </NavLink>
        </li>

        <li>
          <NavLink to="users" end className={linkClass}>
            <Users size={iconSize} className="me-2" />
            {!collapsed && "All Users"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={iconSize} className="me-2" />
            {!collapsed && "Dashboard"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/messages" className={linkClass}>
            <MessageCircle size={iconSize} className="me-2" />
            {!collapsed && "Messages"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className={linkClass}>
            <Settings size={iconSize} className="me-2" />
            {!collapsed && "Settings"}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
