import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../../services/auth';

/**
 * @param children: React component to render
 * @param allowedRoles: array of roles allowed (optional)
 * @param publicOnly: boolean; true if route is for logged-out users only (login/signup)
 */

function RoleBasedRoute({ children, allowedRoles = [], publicOnly = false }){
    const loggedIn = isAuthenticated();
    const role = getRole();

    //Public-only route (login/signup)
    if(publicOnly && loggedIn){
        return <Navigate to='/' replace />
    }

    if(!allowedRoles.includes(role)) {
        //Logged in but role not allowed -> show forbidden or redirect to home
        return <Navigate to='/forbidden' replace />
    }

    //No restrictions -> render component
    return children;
}

export default RoleBasedRoute;
