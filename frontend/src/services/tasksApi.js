import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    return { 'Authorization': `Bearer ${token}` };
};

export const addTask = async (title, description, assignedUser, priority, status, due_date) => {
    try {
        const newTask = {
            title,
            description,
            assignedUser,
            priority,
            status,
            due_date: new Date(due_date).getTime(),
        };
        await axios.post(API_URL, { task: newTask }, { headers: getAuthHeaders() });
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to add task');
    }
};

export const updateTask = async (task_id, updatedFields) => {
    try {
        await axios.put(`${API_URL}/${task_id}`, updatedFields, { headers: getAuthHeaders() });
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update task');
    }
};

export const getAllTasks = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data.filter(task => task.status_id !== 5);
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch tasks');
    }
};

export const deleteTask = async (task_id) => {
    try {
        await axios.delete(`${API_URL}/${task_id}`, { headers: getAuthHeaders() });
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to delete task');
    }
};
