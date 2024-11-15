export interface MemberDragData {
  _id: string
  name: string
  meetingStatus: MeetingStatus
}

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

export type MeetingStatus = 'A' | 'B' | 'C' | 'D' | 'E'

export interface TransformedToDraggableData {
  [key: string]: {
    name: string
    list: Member[]
  }
}
