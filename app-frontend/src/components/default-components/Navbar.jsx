import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-rou
import { asset } from '../../utils/assets';
import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import { UserCircle } from "lucide-react";
const WoMM = asset('WoMM.jpg');
>>>>>>> main
function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (!isAuthenticated) return;
    logout();
    navigate("/", { replace: true });
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar-custom">
      {/* Main bar */}
      <div className="navbar-inner">
        <NavLink to="/" end className="navbar-brand" onClick={closeMenu}>
          <img src={WoMM} alt="WoMM logo" className="navbar-logo" />
          <span className="brand-badge">WoMM</span>
          <span className="brand-name">Lab Reservations</span>
        </NavLink>

        {/* Desktop links — always visible on wide screens */}
        <div className="navbar-links">
          <NavLink className={({ isActive }) => "nav-link-custom" + (isActive ? " active" : "")} to="/" end>
            Home
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link-custom" + (isActive ? " active" : "")} to="/buildings" end>
            Reserve a Computer
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link-custom" + (isActive ? " active" : "")} to="/about" end>
            About Us
          </NavLink>
          {!isAuthenticated && (
            <NavLink className={({ isActive }) => "nav-link-custom" + (isActive ? " active" : "")} to="/login" end>
              Login
            </NavLink>
          )}
          {isAuthenticated && (
            <button className="nav-link-custom nav-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {/* Right side: profile + hamburger */}
        <div className="navbar-right">
          {isAuthenticated && (
            <Link to="/profile" className="nav-profile-btn" aria-label="Profile" onClick={closeMenu}>
              <UserCircle size={20} />
            </Link>
          )}
          <button
            className="navbar-toggler-custom"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — appears below the bar, never off-screen */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <NavLink className={({ isActive }) => "nav-link-mobile" + (isActive ? " active" : "")} to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link-mobile" + (isActive ? " active" : "")} to="/buildings" end onClick={closeMenu}>
            Reserve a Computer
          </NavLink>
          <NavLink className={({ isActive }) => "nav-link-mobile" + (isActive ? " active" : "")} to="/about" end onClick={closeMenu}>
            About Us
          </NavLink>
          {!isAuthenticated && (
            <NavLink className={({ isActive }) => "nav-link-mobile" + (isActive ? " active" : "")} to="/login" end onClick={closeMenu}>
              Login
            </NavLink>
          )}
          {isAuthenticated && (
            <button className="nav-link-mobile nav-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
