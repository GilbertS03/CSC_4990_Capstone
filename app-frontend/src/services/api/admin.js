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

export const getAllUsers = async () => {
    try{
        const res = await api.get('/users/all');
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const getAllBuildings = async () => {
    try{
        const res = await api.get('/buildings');
        return res.data;
    }
    catch(error){
        throw error;
    }
}
