import axios from "axios"

const API_URL = "http://localhost:5148/api" // Update this to match your API URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

interface RegisterRequest {
  email: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

interface UserResponse {
  id: string
  email: string
  token: string
}

const setAuthToken = (token: string) => {
  if (token) {
    localStorage.setItem("token", token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    localStorage.removeItem("token")
    delete axiosInstance.defaults.headers.common["Authorization"]
  }
}

const register = async (data: RegisterRequest): Promise<UserResponse> => {
  const response = await axiosInstance.post<UserResponse>("/Account/register", data)
  if (response.data.token) {
    setAuthToken(response.data.token)
  }
  return response.data
}

const login = async (
  data: LoginRequest,
): Promise<UserResponse & { userId: string }> => {
  const response = await axiosInstance.post<UserResponse>(`/Account/Login`, data)
  if (response.data.token) {
    setAuthToken(response.data.token)
  }
  return {
    ...response.data,
    userId: response.data.id, // Assuming the backend returns 'id' as the user ID
  }
}

const logout = () => {
  setAuthToken("")
}

// Function to initialize the auth state from local storage
const initializeAuth = () => {
  const token = localStorage.getItem("token")
  if (token) {
    setAuthToken(token)
  }
}

export { register, login, logout, setAuthToken, initializeAuth }
