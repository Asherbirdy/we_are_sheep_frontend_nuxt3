export interface AuthLoginTestPayload {
  email: string
  password: string
}

export interface AuthLoginTestResponse {
  user: {
    name: string
    userId: string
    role: string
  }
  token: {
    accessTokenJWT: string
    refreshTokenJWT: string
  }
}
