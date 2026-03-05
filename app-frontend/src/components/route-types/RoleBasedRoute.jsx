import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

/**
 * @param children: React component to render
 * @param allowedRoles: array of roles allowed (optional)
 * @param publicOnly: boolean; true if route is for logged-out users only (login/signup)
 */

function RoleBasedRoute({ children, allowedRoles = [], publicOnly = false }){
    const loggedIn = isAuthenticated();

    //Public-only route (login/signup)
    if(publicOnly && loggedIn){
        return <Navigate to='/' replace />
    }

    // if(allowedRoles.length > 0 && loggedIn) {
    //     //Logged in but role not allowed -> show forbidden or redirect to home
    //     return <Navigate to='/forbidden' replace />
    // }

    //No restrictions -> render component
    return children;
}

export default RoleBasedRoute;
