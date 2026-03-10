import api from './api';

export const getAllDevices = async () => {
    try{
        const res = await api.get('/devices');
        return res.data;
    }
    catch(error){
        throw error;
    }
};