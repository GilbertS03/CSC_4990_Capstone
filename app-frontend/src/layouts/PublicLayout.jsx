import { Outlet } from "react-router-dom";
import Navbar from "../components/default-components/Navbar";
import Footer from "../components/default-components/Footer";

function PublicLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default PublicLayout;
