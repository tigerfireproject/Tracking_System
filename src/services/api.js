// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://your-api-endpoint.com/api';

export const fetchBuses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/buses`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch bus data');
  }
};

export const fetchFuelData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fuel`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch fuel data');
  }
};

export const sendNotification = async (busId, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/notifications`, {
      busId,
      message
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send notification');
  }
};