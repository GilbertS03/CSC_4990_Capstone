import api from './api';

export const getAllBuildings = async () => {
    try{
        const res = await api.get('/buildings/');
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
        const res = await api.get('/reservations/all')
        return res;
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
        const res = await api.get(`/reservations/status/?resStatus=${resStatus}&userId=${userId}`)
        return res;
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

export const createReservation = async (data) => {
    try{
        const { deviceId, startTime, endTime } = data;
        const res = api.post(`/reservations/create`, {
            deviceId: Number(deviceId),
            startTime: startTime,
            endTime: endTime
        },
        {
            headers : {
                'Content-Type' : 'application/json',
            },
        });

        return res;
    }
    catch(error){
        console.error("Full error body:", JSON.stringify(error.response?.data, null, 2));
        throw error;
    }
}
export const getCurrentUser = async () => {
    try {
        const res = await api.get('/users/me')
        return res;
    }
    catch (error) {
        throw error;
    }
}
