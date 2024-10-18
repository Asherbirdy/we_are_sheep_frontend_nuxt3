export interface AuthLoginPayload {
  email: string
  password: string
}

export interface AuthLoginResponse {
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
