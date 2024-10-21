import type { DistrictCreateError, DistrictCreatePayload, DistrictCreateResponse, DistrictGetAllResponse } from '@/types'
import { useRequestApi } from '~/composables/useRequestApi'

export const useDistrictApi = {
  getAll: () => {
    return useRequestApi<DistrictGetAllResponse>(
      '/district',
      {
        method: 'GET',
        server: false,
        lazy: false,
      },
    )
  },
  create: (payload: DistrictCreatePayload) => {
    return useRequestApi<DistrictCreateResponse, DistrictCreateError>(
      '/district',
      {
        method: 'POST',
        body: payload,
        immediate: false,
        server: false,
        lazy: false,
        watch: false,
      },
    )
  },
  edit: (data: any) => {
    return useRequestApi(
      '/district',
      {
        method: 'PUT',
        body: data,
      },
    )
  },
  close: () => {
    return useRequestApi(
      '/district/close',
      {
        method: 'PUT',
      },
    )
  },
  open: () => {
    return useRequestApi(
      '/district/open',
      {
        method: 'PUT',
      },
    )
  },
}
