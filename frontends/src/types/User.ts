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
