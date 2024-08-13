import axios from "axios"

const register = async (data: RegisterRequest): Promise<UserResponse> => {
  const response = await axios.post<UserResponse>("/register", data)
  return response.data
}

const login = async (data: LoginRequest): Promise<UserResponse> => {
  const response = await axios.post<UserResponse>("/login", data)
  return response.data
}

export { register, login }
