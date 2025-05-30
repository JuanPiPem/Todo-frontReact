// src/services/taskService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

// Agrega el token desde localStorage a cada request
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeaders());
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/${taskId}`, getAuthHeaders());
  return response.data;
};

export const updateTask = async (taskId, updates) => {
  const response = await axios.put(
    `${API_URL}/${taskId}`,
    updates,
    getAuthHeaders()
  );
  return response.data;
};
