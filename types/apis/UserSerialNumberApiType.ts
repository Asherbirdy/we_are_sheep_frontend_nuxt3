import type { UserSerialNumber } from '../apps/UserSerialNumberType'

export interface UserSerialNumberResponse {
  msg: string
  userSerialNumber: UserSerialNumber[]
}
