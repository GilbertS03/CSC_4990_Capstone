import api from './api';

export const getAllBuildings = async () => {
    try{
        const res = await api.get('/buildings');
        return res;
    }
    catch (error) {
        throw error;
    }
}

export const getRoomsByBuildingId = async (id) => {
    try {
        const res = await api.get(`/rooms/${id}`);
        return res;
    }
    catch(error){
        throw error
    }
}

export const getAllReservations = async () => {
    try {
        const data = await api.get('/reservations/all')
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const getDevices = async () => {
    try{
        const res = await api.get('/devices/device-positions');
        return res;
    }
    catch(error){
        throw error
    }
}

export const getReservationStatuses = async (resStatus, userId) => {
    try {
        const data = await api.get(`/reservations/status/?resStatus=${resStatus}&userId=${userId}`)
        return data;
    }
    catch (error) {
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

export const getAllBuildingHours = async () => {
    try{
        const res = await api.get("/buildings/all-hours");
        return res;
    }
    catch(error){
        throw error;
    }
}
//Date time object (start and end time), deviceId
// export const createReservation = async () => {
//     try{
        
//     }
//     catch(error){
//         throw new error;
//     }
// }
export const getCurrentUser = async () => {
    try {
        const data = await api.get('/users/me')
        return data;
    }
    catch (error) {
        throw error;
    }
}
