import axios from "axios";
import { API } from "../Utils/Api";

export const taskApi = {
    getTasks: async () => {
      const response = await axios.get(`${API}/tasks`);
      return response.data;
    },
  
    createTask: async (task)=> {
      const response = await axios.post(`${API}/tasks`, task);
      return response.data;
    },
  
    updateTask: async (id, updates)=> {
      const response = await axios.put(`${API}/tasks/${id}`, updates);
      return response.data;
    },
  
    deleteTask: async (id) => {
      await axios.delete(`${API}/tasks/${id}`);
    },
  };