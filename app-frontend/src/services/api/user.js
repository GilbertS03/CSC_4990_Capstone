import api from './api';

export const getAllBuildings = async () => {
    try {
        const data = await api.get('/buildings');
        return data;
    }
    catch (error) {
        throw error;
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

export const getReservationStatuses = async (resStatus, userId) => {
    try {
        const data = await api.get(`/reservations/status/?resStatus=${resStatus}&userId=${userId}`)
        return data;
    }
    catch (error) {
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const data = await api.get('/users/me')
        return data;
    }
    catch (error) {
        throw error;
    }
}