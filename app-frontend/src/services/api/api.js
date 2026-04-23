import axios from 'axios';

function createAPI(){
    if(import.meta.env.VITE_ENV === 'dev'){
        const api = axios.create({baseURL: "http://localhost:8000"});
        return api;
    } else{
        const api = axios.create({baseURL: "https://api.womm.space"});
        return api;
    }

}

export default createAPI();
    