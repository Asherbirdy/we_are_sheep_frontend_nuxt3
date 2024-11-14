import type { GetDistrictMemberResponse } from '@/types'
import { useRequestApi } from '~/composables/useRequestApi'

function transformMembers(data) {
  // 建立一個暫存物件來保存分組資料
  const groupedData = {}

  data.members.forEach((member) => {
    const status = member.meetingStatus

    // 如果該狀態尚未存在於分組資料中，則初始化
    if (!groupedData[status]) {
      groupedData[status] = {
        name: status,
        list: [],
      }
    }

    // 將成員添加到對應的分組中
    groupedData[status].list.push({
      name: member.name,
      id: member._id,
    })
  })

  // 將暫存物件轉換成所需的陣列格式
  return Object.values(groupedData)
}

export const useMemberApi = {
  getDistrictMember: () => {
    return useRequestApi<GetDistrictMemberResponse>(
      '/member/getAllDistrictMemberFromUser',
      {
        method: 'GET',
        server: false,
        lazy: false,
        transform: (data: GetDistrictMemberResponse) => {
          const groupedData = {}
          data.members.forEach((member) => {
            const status = member.meetingStatus

            // 如果該狀態尚未存在於分組資料中，則初始化
            if (!groupedData[status]) {
              groupedData[status] = {
                name: status,
                list: [],
              }
            }

            // 將成員添加到對應的分組中
            groupedData[status].list.push({
              name: member.name,
              id: member._id,
            })
          })

          // 將暫存物件轉換成所需的陣列格式
          return Object.values(groupedData)
        },
      },
    )
  },
}
