import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL
});

// Function to get the token from local storage
const getAuthHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    };
};

// --------------- API calls / working routes --------------
export const fetch = ({ url }) => {
    return api.get(url, { headers: { 'Content-Type': 'application/json' } });
};

export const generateInvoice = ({ url }) => {
    return api.get(url, { headers: { 'Content-Type': 'application/json' } });
};

export const create = ({ url, data }) => {
    return api.post(url, data);
};
export const updateApi = ({ url, data }) => {
    return api.put(url, data);
};
export const createApi = ({ url, data }) => api.post(url, data);
export const deleteApi = ({ url }) => {
    return api.delete(url);
};
export const upload_data = ({ url, file }) => {
    return api.post(url, file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
// -----------------------------------------

export default api;
