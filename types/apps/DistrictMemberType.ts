import type { Member } from './MemberType'

export interface State {
  data: GroupedData
  edited: Member[]
}

export interface GroupedData {
  [key: string]: { name: string, list: Member[] }
}
