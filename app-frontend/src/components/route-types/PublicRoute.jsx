import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth";

function PublicRoute({ children }) {
    if (isAuthenticated()) {
        // User is logged in → redirect them to dashboard or home
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute;