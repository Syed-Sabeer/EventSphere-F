import API from './api';

export const getSchedules = (expoId) => API.get(`/schedules/${expoId}`);
export const createSchedule = (data) => API.post('/schedules', data);
export const updateSchedule = (id, data) => API.put(`/schedules/${id}`, data);
export const deleteSchedule = (id) => API.delete(`/schedules/${id}`);
