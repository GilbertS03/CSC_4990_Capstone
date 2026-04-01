import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserCard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!isAuthenticated) return;
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="card z-1">
      <div className="card-body">
        <h5 className="card-title">Name: </h5>
        <span>
          <NavLink onClick={handleLogout}>Logout</NavLink>
        </span>
      </div>
    </div>
  );
}

export default UserCard;
