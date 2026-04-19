import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Menu,
  Users,
  MonitorSmartphone,
  UserRound,
  Building,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ collapsed, setCollapsed }) {
  const width = collapsed ? "80px" : "250px";
  const iconSize = 24;

  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "nav-link active bg-primary text-white d-flex align-items-center"
      : "nav-link text-white d-flex align-items-center";

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3"
      style={{
        width: width,
        height: "100vh",
        position: "fixed",
        transition: "width 0.5s ease",
      }}
    >
      {/* Toggle Button */}
      <div className="container">
        {!collapsed && (
          <span className="fs-4 pe-2">{!collapsed && "Admin Tools"}</span>
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
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={iconSize} className="me-2" />
            {!collapsed && "Dashboard"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users" end className={linkClass}>
            <Users size={iconSize} className="me-2" />
            {!collapsed && "All Users"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/devices" className={linkClass}>
            <MonitorSmartphone size={iconSize} className="me-2" />
            {!collapsed && "All Devices"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/system-settings" className={linkClass}>
            <Settings size={iconSize} className="me-2" />
            {!collapsed && "System Settings"}
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/buildings" className={linkClass}>
            <Building size={iconSize} className="me-2" />
            {!collapsed && "Buildings"}
          </NavLink>
        </li>
      </ul>
      <div className="mt-auto">
        <hr />
        <button className="btn btn-outline-primary" onClick={logout}>
          <UserRound /> {collapsed ? "" : "Logout "}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
