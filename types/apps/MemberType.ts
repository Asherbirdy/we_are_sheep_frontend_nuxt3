export type MeetingStatus = 'A' | 'B' | 'C' | 'D' | 'E'
export interface Member {
  _id: string
  name: string
  district: string
  identity: string
  meetingStatus: MeetingStatus
  createdBy: string
  notes: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export type MemberDragData = Pick<Member, '_id' | 'name' | 'meetingStatus'>

export interface TransformedToDraggableData {
  [key: string]: {
    name: string
    list: Member[]
  }
}
