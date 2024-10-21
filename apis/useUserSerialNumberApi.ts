import type { UserSerialNumberResponse } from '@/types'

export const useUserSerialNumberApi = {
  getAll: async () => {
    return await useRequestApi<UserSerialNumberResponse>('/userSerialNumber/getAll', {
      method: 'GET',
      server: false,
      lazy: false,
    })
  },
  // create: async (payload: any) => {
  //   return await useRequestApi<any>('/userSerialNumber/create', {
  //     method: 'POST',
  //     body: payload,
  //   })
  // },
  // edit: async (id: number, payload: any) => {
  //   return await useRequestApi<any>(`/userSerialNumber/edit`, {
  //     method: 'PUT',
  //     body: payload,
  //   })
  // },
  // delete: async (serialNumberId: number) => {
  //   return await useRequestApi<any>(`/userSerialNumber/delete/${serialNumberId}`, {
  //     method: 'DELETE',
  //   })
  // },
}
