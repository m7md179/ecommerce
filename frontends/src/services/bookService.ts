import axiosInstance from "@/utils/axiosInsance"; 

const API_URL = 'http://localhost:5148/api/books';

export const getBookById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the book:', error);
    throw error;
  }
};
