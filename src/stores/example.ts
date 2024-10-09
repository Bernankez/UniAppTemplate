import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', () => {
  const title = ref('uni-app-template')

  return {
    title,
  }
}, {
  persist: {
    enabled: true,
  },
})
