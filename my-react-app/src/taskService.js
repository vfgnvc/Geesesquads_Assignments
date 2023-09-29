// taskService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/tasks';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (newTask) => {
  try {
    const response = await axios.post(API_BASE_URL, newTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${taskId}`);
  } catch (error) {
    throw error;
  }
};
