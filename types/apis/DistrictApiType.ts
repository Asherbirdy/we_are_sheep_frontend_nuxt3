import type { District } from '../apps/DistrictType'

// ** GET ALL **
export interface DistrictGetAllResponse {
  msg: string
  districts: District[]
}

// ** CREATE **
export interface DistrictCreatePayload {
  name: string
}

export interface DistrictCreateResponse {
  msg: string
  districts: District[]
}

export interface DistrictCreateError {
  data: {
    error: 'CREATE_ERROR'
    msg: string
  }
}
