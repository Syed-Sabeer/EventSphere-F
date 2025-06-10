import API from './api';

export const registerExhibitor = (data) => API.post('/exhibitors/register', data);
export const getMyExhibitorProfile = () => API.get('/exhibitors/me');
export const updateMyExhibitorProfile = (data) => API.put('/exhibitors/me', data);
export const getAllExhibitors = () => API.get('/exhibitors');
export const approveExhibitor = (id) => API.put(`/exhibitors/${id}/approve`);
export const rejectExhibitor = (id) => API.put(`/exhibitors/${id}/reject`);
