import type { Member } from './MemberType'

export interface State {
  data: GroupedData
}

export interface GroupedData {
  [key: string]: { name: string, list: Member[] }
}
