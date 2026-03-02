const API_URL = import.meta.env.VITE_API_BASE_URL;

//Login
export async function login(email, password){
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username : email,
            password : password,
        }),
    });

    if(!response.ok){
        const errorData = await response.json().catch(() => null);

        if(response.status === 401){
            throw new Error("Invalid email or password");
        }

        throw new Error(errorData?.detail || 'login failed');

    }
    
    const data = await response.json();

    //Storing the token
    localStorage.setItem('access_token', data.access_token);

    return data;
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
