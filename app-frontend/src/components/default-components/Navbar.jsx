import { NavLink, useNavigate, Link } from "react-router-dom";
import { asset } from '../../utils/assets';
import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import { UserCircle } from "lucide-react";
const WoMM = asset('WoMM.jpg');
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
            <NavLink className="nav-link" to="/buildings" end>
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
            {/* {isAuthenticated && user.role === "admin" && (
              <NavLink className="nav-link" to="/admin" end>
                Admin Home
              </NavLink>
            )} */}
          </div>
        </div>
        <div className="float-right">
          {/* todo Add functionality to this button and put the logout here and make a dropdown or 
          take them to a page that displays their information such as user/information/:id or something
          so they can know their role and such*/}
          <div>
            {isAuthenticated && <Link className="nav-link" to="/profile"><UserCircle /></Link>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
