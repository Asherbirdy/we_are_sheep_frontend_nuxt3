import { useRequestApi } from '~/composables/useRequestApi'

export const useDistrictApi = {
  getAll: () => {
    return useRequestApi('/district', {
      method: 'GET',
    })
  },
  create: (data: any) => {
    return useRequestApi('/district', {
      method: 'POST',
      body: data,
    })
  },
  edit: (data: any) => {
    return useRequestApi('/district', {
      method: 'PUT',
      body: data,
    })
  },
  close: () => {
    return useRequestApi('/district/close', {
      method: 'PUT',
    })
  },
  open: () => {
    return useRequestApi('/district/open', {
      method: 'PUT',
    })
  },
}
