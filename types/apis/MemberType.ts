export interface GetDistrictMemberResponse {
  msg: string
  members: Members
}

export interface Members {
  A: DistrictMember[]
  B: DistrictMember[]
  C: DistrictMember[]
  D: DistrictMember[]
  E: DistrictMember[]
}

export interface DistrictMember {
  _id: string
  name: string
  meetingStatus: string
}
