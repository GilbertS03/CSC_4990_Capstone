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

export const getRoomsByBuildingId = async (id) => {
    try{
        const res = await api.get(`/rooms/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
}

export const getRoomLayoutById = async (id) => {
    try{
        const res = await api.get(`/rooms/room-layouts/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
}

export const getDeviceLocations = async (id) => {
    try{
        const res = await api.get(`devices/device-positions/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
}