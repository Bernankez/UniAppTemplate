import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

const service = axios.create({
  adapter: createUniAppAxiosAdapter(),
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
})

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Show loading toast, defaults to `true` */
    showLoading?: boolean | UniNamespace.ShowLoadingOptions
    /** Whether to set token in header, defaults to `true` */
    needAuth?: boolean
  }
}

// TODO
export interface RestResult<T = unknown> {
  code?: number
  message?: string
  data?: T
}

const loading = new LoadingController()

service.interceptors.request.use((config) => {
  const { showLoading = true, needAuth = true, headers } = config

  if (showLoading !== false) {
    loading.show(showLoading === true ? undefined : showLoading)
  }

  const appStore = useAppStore()
  if (needAuth) {
    if (appStore.token) {
      headers.set('token', appStore.token)
    }
    else {
      console.warn(`Request '${config.url}' needs auth, but token not exists`)
    }
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

service.interceptors.response.use((res: AxiosResponse<RestResult>) => {
  const { showLoading = true } = res.config
  if (showLoading !== false) {
    loading.hide()
  }
  return res
}, (err: AxiosError<RestResult>) => {
  const { showLoading } = err.config || {}
  if (showLoading !== false) {
    loading.hide()
  }

  const statusCode = err.response?.status
  const resCode = err.response?.data.code
  if ((isDefined(statusCode) && (statusCode < 200 || statusCode >= 300)) || resCode !== 0) {
    const message = err.message || err.response?.data.message
    if (message) {
      loading.hide()
      uni.showToast({
        icon: 'none',
        title: message,
      })
    }
    if (statusCode === 401 || resCode === 401) {
      // TODO logout or refresh token
    }
  }
  return Promise.reject(err)
})

export { service, loading as serviceLoading }
