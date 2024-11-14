import type { GetDistrictMemberResponse } from '@/types'
import { useRequestApi } from '~/composables/useRequestApi'

export const useMemberApi = {
  getDistrictMember: () => {
    return useRequestApi<GetDistrictMemberResponse>(
      '/member/getAllDistrictMemberFromUser',
      {
        method: 'GET',
        server: false,
        lazy: false,
      },
    )
  },
}
