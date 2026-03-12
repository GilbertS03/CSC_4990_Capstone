import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * @param children: React component to render
 * @param allowedRoles: array of roles allowed (optional)
 * @param publicOnly: boolean; true if route is for logged-out users only (login/signup)
 */

function RoleBasedRoute({ children, allowedRoles = [], publicOnly = false }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  //Public-only route (login/signup)
  if (publicOnly) {
    return isAuthenticated ? <Navigate to="/" replace /> : children;
  }

  //if route requires authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //If roles are specified, check permissions
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  //No restrictions -> render component
  return children;
}

export default RoleBasedRoute;
