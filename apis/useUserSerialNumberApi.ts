import type { UserSerialNumberResponse } from "@/types";
// import { useNuxtApp } from '#app'

// const nuxtApp = useNuxtApp()
export const useUserSerialNumberApi = {
  getAll: async () => {
    return await useRequestApi<UserSerialNumberResponse>(
      "/userSerialNumber/getAll",
      {
        method: "GET",
        server: false,
        lazy: false,
        // key: '/userSerialNumber/getAll',
        // getCachedData(key) {
        //   return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
        // },
      }
    );
  },
  create: async (payload: any) => {
    return await useRequestApi<any>("/userSerialNumber/create", {
      method: "POST",
      body: payload,
      watch: false,
      immediate: false,
    });
  },
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
};
