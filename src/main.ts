import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import './styles/variables.css'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const piniaPersistedstate = createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  })
  pinia.use(piniaPersistedstate)
  app.use(pinia)
  return {
    app,
  }
}
