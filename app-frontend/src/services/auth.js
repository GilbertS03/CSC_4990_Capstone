import api from './api/api';
import { decodeToken, getRole } from '../utils/jwt';
//Logins
export async function login(email, password){
    try{
        const response = await api.post(
        '/auth/login',
        new URLSearchParams({
            username : email,
            password : password
        }),
        {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
        }
    );
    
    const data = response.data;

    //Storing the token
    const token = data.access_token;
    localStorage.setItem('access_token', token);

    return data;

    }
    catch(error){
        if(error.response){
            if(error.response.status === 401){
                throw new Error('Invalid email or password');
            }
            throw new Error(
                error.response.data?.detail || 'login failed'
            );
        }
        throw new Error('Network error. Please try again.');
    }
}

//signup and gaining token
export async function signup(firstName, lastName, email, password){
    try{
        const response = api.post(
            '/auth/signup',
            {
                email : email,
                firstName : firstName,
                lastName : lastName,
                password : password
            },
            {
                headers : {
                    'Content-Type' : 'application/json',
                },
            }
        );
        const data = (await response).data;

        //Storing the token
        localStorage.setItem('access_token', data.access_token);

        return data;
    }
    catch(error){
        console.log(error)
        if(error.response){
            if(error.response.status === 401){
                throw new Error('Invalid email or password');
            }
            throw new Error(
                error.response.data?.detail || 'login failed'
            );
        }
        throw new Error('Network error. Please try again.');
    }
}

//logout
export function logout(){
    localStorage.removeItem('access_token');
}

//get token
export function getToken() {
    return localStorage.getItem('access_token');
}

//check auth
export function isAuthenticated() {
    return !!getToken();
}

export function getUserRole(){
    const token = getToken();
    return getRole(token);
}

export function getExpirationTime(token){
    const decodedToken = decodeToken(token);
    return decodedToken.exp * 1000;
}
