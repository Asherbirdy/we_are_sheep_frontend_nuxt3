import { useAuthApi } from '@/apis'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
//   const count = ref(0)
//   const add = () => {
//     count.value++
//   }

  //   return { count, add }

  const getMemberStatus = async () => {
    const { data } = await useAuthApi.useStatus()
    console.log(data.value)
  }

  return { getMemberStatus }
})
