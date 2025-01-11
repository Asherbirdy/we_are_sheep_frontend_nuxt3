import { useDistrictApi } from '@/apis'

import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    districts: ref([]),
  }),
  actions: {
    async fetchDistricts() {
      const { data } = useDistrictApi.getAll()
      console.log('data', data.value)
      if (data.value) {
        this.districts = data.value.districts
      }
    },
    setName(newName: string, newId: string) {
      this.name = newName // 更新區的名稱
      this.UpdatedID = newId // 更新區的ID
      this.IDAll.push(newId) // 將新的 ID 添加到 IDAll 數組中
    },
    saveIDs(newIDs: any[]) {
      this.IDAll = [...this.IDAll, ...newIDs] // 將外部傳入的 ID 陣列添加到 IDAll
    },
  },
})
