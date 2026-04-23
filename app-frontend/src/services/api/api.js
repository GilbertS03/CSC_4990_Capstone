import axios from 'axios';

async function createAPI(){
    if(import.meta.env.VITE_ENV === 'dev'){
        const api = axios.create({baseURL: "http://127.0.0.1:8000"});
        return api;
    } else{
        const api = axios.create({baseURL: "http://34.202.2.180:8000"});
        return api;
    }

}

export default await createAPI();
