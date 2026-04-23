import axios from 'axios';

async function createAPI(){
    if(import.meta.env.VITE_ENV === 'dev'){
<<<<<<< HEAD
        const api = axios.create({baseURL: "http://127.0.0.1:8000"});
        return api;
    } else{
        const api = axios.create({baseURL: "https://api.womm.space"});
=======
        const api = axios.create({baseURL: "http://127.0.0.1:8000/"});
        return api;
    } else{
        const api = axios.create({baseUrl: "http://100.31.89.76:8000/"});
>>>>>>> ece1190460bb83a99dbf4cce101d08217cf1aff3
        return api;
    }

}

export default await createAPI();