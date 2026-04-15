import axios from 'axios';
import {SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";


async function createAPI(){
    if(import.meta.env.VITE_ENV === 'dev'){
        const api = axios.create({baseURL: import.meta.env.VITE_API_BASE_URL});
        return api;
    } else {
        const client = new SecretsManagerClient({region: 'us-east-1'});
        const {SecretString} =await client.send(new GetSecretValueCommand({SecretId:"myapp/front-end"}));
        const api = axios.create({baseURL: SecretString});
        return api;
    }

}

export default await createAPI();
