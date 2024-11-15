import type { Member } from '../apps/MemberType'

export interface GetDistrictMemberResponse {
  msg: string
  members: Member[]
}

export interface EditMemberStatusResponse {
  msg: string
  member: Member
}
