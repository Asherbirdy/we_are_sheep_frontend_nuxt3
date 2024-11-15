import type { Member, MemberDragData } from '../apps/MemberType'

export interface GetDistrictMemberResponse {
  msg: string
  members: MemberDragData[]
}

export interface EditMemberStatusResponse {
  msg: string
  member: Member
}
