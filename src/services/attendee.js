import API from './api';

export const getMyAttendeeProfile = () => API.get('/attendees/me');
export const registerForExpo = (expoId) => API.post('/attendees/register-expo', { expoId });
export const bookmarkSession = (sessionId) => API.put('/attendees/bookmark-session', { sessionId });
