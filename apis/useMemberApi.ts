import type { EditMemberStatusResponse, GetDistrictMemberResponse } from '@/types'
import { useRequestApi } from '~/composables/useRequestApi'

interface EditMemberStatusPayload {
  memberId: string
  meetingStatus: string
}

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
  editMemberStatus: (payload: EditMemberStatusPayload) => {
    return useRequestApi<EditMemberStatusResponse, any>('/member/editMemberMeetingStatus', {
      method: 'PATCH',
      server: false,
      lazy: false,
      body: payload,
      immediate: false,
      watch: false,
    })
  },
}
