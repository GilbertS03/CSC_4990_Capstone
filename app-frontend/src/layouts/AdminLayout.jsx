import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin-components/Sidebar";

function AdminLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "30px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
