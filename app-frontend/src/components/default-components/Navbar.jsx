import { NavLink, useNavigate } from "react-router-dom";
import WoMM from "../../assets/WoMM.jpg";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import { UserCircle } from "lucide-react";
function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (!isAuthenticated) return;
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-sm sticky-top">
      <div className="container-fluid">
        <NavLink id="NavImg" to="/" end>
          <img src={WoMM} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/" end>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/reserve" end>
              Reserve a Computer
            </NavLink>
            <NavLink className="nav-link" to="/about" end>
              About Us
            </NavLink>
            {!isAuthenticated && (
              <NavLink className="nav-link" to="/login" end>
                Login
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink className="nav-link" onClick={handleLogout}>
                Logout
              </NavLink>
            )}
          </div>
        </div>
        <div className="float-right">
          {/* todo Add functionality to this button and put the logout here and make a dropdown */}
          <button className="btn " type="button">
            {isAuthenticated && <UserCircle />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
