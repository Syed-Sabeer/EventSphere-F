import API from './api';

export const getBooths = (expoId) => API.get(`/booths/${expoId}`);
export const createBooth = (data) => API.post('/booths', data);
export const updateBooth = (id, data) => API.put(`/booths/${id}`, data);
export const deleteBooth = (id) => API.delete(`/booths/${id}`);
