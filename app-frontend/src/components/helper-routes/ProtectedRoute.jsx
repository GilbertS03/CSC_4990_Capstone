//This is used to renavigate those who do not bear a token
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/api/auth';

export default function ProtectedRoute({ children }) {
    if(!isAuthenticated()){
        return <Navigate to='/login' replace />
    }
    return children;
}
