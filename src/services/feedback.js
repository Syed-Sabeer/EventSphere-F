import API from './api';

export const submitFeedback = (data) => API.post('/feedback', data);
export const getAllFeedback = () => API.get('/feedback');
