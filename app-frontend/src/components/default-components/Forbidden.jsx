import { NavLink } from "react-router-dom";
import "../../theme.css";
import "./Forbidden.css";

function Forbidden() {
  return (
    <div className="fb-container">
      <div className="fb-card card-dark">
        <div className="fb-code">403</div>
        <div className="fb-stripe" />
        <p className="fb-message">You don't have permission to view this page.</p>
        <NavLink className="btn btn-primary" to="/" end>
          Back to home
        </NavLink>
      </div>
    </div>
  );
}

export default Forbidden;
