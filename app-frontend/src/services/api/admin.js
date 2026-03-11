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
        const res = await api.get('/users');
        console.log(res);
        return res.data;
    }
    catch(error){
        throw error;
    }
};
