import type { District } from './DistrictType'

export interface UserSerialNumber {
  _id: string
  serialNumber: string
  isUsed: boolean
  createByUser: string
  createdAt: string
  updatedAt: string
  __v: number
  bindMember?: string
  districtId?: District
  role?: string
  notes?: string
}

export type UserSerialNumberList = Pick<UserSerialNumber, '_id' | 'isUsed' | 'districtId' | 'role' | 'notes'>
