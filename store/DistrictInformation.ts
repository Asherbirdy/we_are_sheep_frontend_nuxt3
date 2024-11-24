import { defineStore } from 'pinia'

// 定義 District 物件的類型
interface District {
  _id: string
  name: string
  active: boolean
  __v: number
}

export const useDistrictId = defineStore('DistrictInformation', {
  state: () => ({
    name: '', // 儲存區的名稱
    IDAll: [] as District[], // 儲存區的 ID 數組
    UpdatedID: '',
    data: null, // 控制 modal 的顯示狀態
  }),
  actions: {
    setName(newName: string, newId: string) {
      this.name = newName // 更新區的名稱
      this.UpdatedID = newId // 更新區的ID
      this.IDAll.push(newId) // 將新的 ID 添加到 IDAll 數組中
      console.log('Updated district name:', this.name) // 日誌輸出
      console.log('Updated district 序號:', this.ID) // 日誌輸出
    },
    saveIDs(newIDs: any[]) {
      this.IDAll = [...this.IDAll, ...newIDs]// 將外部傳入的 ID 陣列添加到 IDAll
      console.log('Updated 全部district 序555號:', this.IDAll) // 日誌輸出
    },
  },
})
