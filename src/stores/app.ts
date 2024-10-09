import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const token = ref<string>()

  return {
    token,
  }
}, {
  persist: {
    enabled: true,
  },
})
