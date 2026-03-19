import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function NotFound() {
  const { user } = useAuth();
  const checkRole = () => {
    if (!user || user.role !== "admin") return "/";
    else return "/admin";
  };
  return (
    <div className="container text-center">
      <h1>404 - Not Found</h1>
      <NavLink className="mt-3" to={checkRole()} end>
        Back to Home
      </NavLink>
    </div>
  );
}

export default NotFound;
