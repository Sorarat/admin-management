import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users/", {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users/", userData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

export default api;
