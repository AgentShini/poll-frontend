import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchPolls = async () => {
    const response = await axios.get(`${API_BASE_URL}/polls`);
    return response.data;
};

export const fetchPollAnalytics = async (pollId) => {
    const response = await axios.get(`${API_BASE_URL}/polls/analytics/${pollId}`);
    return response.data;
};

export const createPoll = async (pollData) => {
    const response = await axios.post(`${API_BASE_URL}/polls`, pollData);
    return response.data;
};

// Additional functions like user login, registration, etc., can be added here.
