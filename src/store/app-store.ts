import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    token: "",
    wxAppId: "",
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});
