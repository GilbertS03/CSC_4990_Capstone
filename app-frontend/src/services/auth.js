import api from './api/api'
//Login
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
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('role', data.role);

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
            new URLSearchParams({
                username : email,
                firstName : firstName,
                lastName : lastName,
                password : password
            }),
            {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                },
            }
        );
        const data = await response.json();

        //Storing the token
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('role', data.role);

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

export function getRole() {
    return localStorage.getItem('role');
}
