import axios from 'axios';
import {SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";


async function createAPI(){
    if(import.meta.env.VITE_ENV === 'dev'){
        const api = axios.create({baseURL: "http://localhost:5173"});
        return api;
    } else{
        const api = axios.create({baseUrl: "http://44.203.109.104:80"});
        return api;
    }

}

export default await createAPI();
