import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
  } catch (error) {
    throw error;
  }
};

export default api;
