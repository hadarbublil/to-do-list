import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const signIn = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to sign in');
    }
};

export const signUp = async (username, password, phoneNumber) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { username, password, phoneNumber });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to sign up');
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch user profile');
    }
};
