import { jwtDecode } from 'jwt-decode';

export function decodeToken(token){
    if(!token) return null;
    try{
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
    catch(error){
        console.error(error);
        return null;
    }

}

export function getRole(token) {
    if(!token) return null;

    const decoded = decodeToken(token);
    return decoded?.role || null;
}
