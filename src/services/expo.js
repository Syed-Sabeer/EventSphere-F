import API from './api';

export const getExpos = () => API.get('/expos');
export const createExpo = (data) => API.post('/expos', data);
export const updateExpo = (id, data) => API.put(`/expos/${id}`, data);
export const deleteExpo = (id) => API.delete(`/expos/${id}`);
