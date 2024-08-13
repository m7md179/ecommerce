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
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("isLoggedIn", "true")
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("isLoggedIn")
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
    sessionStorage.setItem("userId", response.data.id)
  }
  return {
    ...response.data,
    userId: response.data.id,
  }
}

const logout = () => {
  setAuthToken("")
  sessionStorage.removeItem("userId")
}

// Function to initialize the auth state from session storage
const initializeAuth = () => {
  const token = sessionStorage.getItem("token")
  if (token) {
    setAuthToken(token)
  }
}

const isLoggedIn = (): boolean => {
  return sessionStorage.getItem("isLoggedIn") === "true"
}

const getUserId = (): string | null => {
  return sessionStorage.getItem("userId")
}

export {
  register,
  login,
  logout,
  setAuthToken,
  initializeAuth,
  isLoggedIn,
  getUserId,
}
