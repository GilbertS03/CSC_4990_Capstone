import api from './api';

// Device Routes
export const getAllDevices = async () => {
    try{
        const res = await api.get('/devices');
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const getDeviceLocations = async (id) => {
    try{
        const res = await api.get(`devices/device-positions/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
}

export const createDevice = async (data) => {
    try{
        const {deviceTypeId} = data;
        const res = api.post("/devices/create", {
            deviceTypeId: Number(deviceTypeId),
        },
        {
            headers : {
                'Content-Type' : 'application/json',
            },
        });
        return res;
    }
    catch(error){
        throw error;
    }
}

export const moveDevice = async (id, data) => {
    try{
        const {xPosition, yPosition} = data;
        const res = api.post(`/devices/device-positions/edit/${id}`, {
            newXPos : xPosition,
            newYPos : yPosition,
        },
        {
            headers : {
                'Content-Type' : 'application/json',
            },
        },
        );
        return res;
    }
    catch(error){
        throw error;
    }
};

export const deleteDevice = async(id) => {
    try{
        const res = api.delete(`/devices/delete${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};



// todo find out if this is actually needed or not
// export const getDevices = async () => {
//     try{
//         const res = await api.get("/devices");
//         return res;
//     }
//     catch(error){
//         throw error;
//     }
// }

// Building Routes
export const getAllBuildings = async () => {
    try{
        const res = await api.get('/buildings');
        return res.data;
    }
    catch(error){
        throw error;
    }
}

// Rooms Routes
export const getRoomsByBuildingId = async (id) => {
    try{
        const res = await api.get(`/rooms/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};

export const getRoomLayoutById = async (id) => {
    try{
        const res = await api.get(`/rooms/room-layouts/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};

// User Routes
export const getAllUsers = async () => {
    try{
        const res = await api.get('/users/all');
        return res.data;
    }
    catch(error){
        throw error;
    }
};

export const getUserById = async(id) => {
    try{
        const res = await api.get(`/users/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};

export const updateUserRole = async(id) => {
    try{
        const res = await api.put(`/users/update-role/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};

export const deleteUser = async(id) => {
    try{
        const res = await api.delete(`/users/delete/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};

// Reservation
export const deleteReservation = async (id) => {
    try{
        const res = await api.delete(`/reservations/delete/${id}`);
        return res;
    }
    catch(error){
        throw error;
    }
};
