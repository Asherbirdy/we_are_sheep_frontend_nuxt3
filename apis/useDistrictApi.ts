import type { DistrictCreateError, DistrictCreatePayload, DistrictCreateResponse, DistrictGetAllResponse } from '@/types'
import { useRequestApi } from '~/composables/useRequestApi'

export enum DistrictApiKey {
  getAll = 'district-getAll',
}

export const useDistrictApi = {
  getAll: () => {
    return useRequestApi<DistrictGetAllResponse>(
      '/district',
      {
        key: DistrictApiKey.getAll,
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
  edit: (payload: {
    newName: string
    districtId: string
  }) => {
    return useRequestApi(
      '/district',
      {
        method: 'PUT',
        body: payload,
        immediate: false,
        server: false,
        lazy: false,
        watch: false,
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
