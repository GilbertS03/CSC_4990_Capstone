import api from './api';

export const getAllBuildings = async () => {
    try{
        const data = await api.get('/buildings');
        return data;
    }
    catch(error){
        throw error;
    }
}
