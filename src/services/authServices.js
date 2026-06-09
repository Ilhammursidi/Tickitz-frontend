import api from './api';

export const registerAPI = async (payload) => {
    const response = await api.post("/auth/register", payload);
    return response.data;
};

export const loginAPI = async (payload) => {
    const response = await api.post("/auth", payload);
    return response.data;
}
export const activateAPI = async (payload) => {
    const response = await api.post("/auth/register/activate", payload);
    return response.data;
}