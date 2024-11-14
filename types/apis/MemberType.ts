export interface GetDistrictMemberResponse {
  msg: string
  members: Member[]
}

export interface Member {
  _id: string
  name: string
  meetingStatus: string
}
