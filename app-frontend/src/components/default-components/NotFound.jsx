import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../theme.css";
import "./NotFound.css";

function NotFound() {
  const { user } = useAuth();

  const homePath = user?.role === "admin" ? "/admin" : "/";

  return (
    <div className="nf-container">
      <div className="nf-card card-dark">
        <div className="nf-code">404</div>
        <div className="nf-stripe" />
        <p className="nf-message">
          This page doesn't exist or you don't have access.
        </p>
        <NavLink className="btn btn-primary" to={homePath} end>
          Back to home
        </NavLink>
        <p className="nf-sub">or contact your lab administrator</p>
      </div>
    </div>
  );
}

export default NotFound;
