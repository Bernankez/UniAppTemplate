import type { Awaitable } from '@vueuse/core'

export interface UsePaginationOptions {
  /** Start page index, defaults to `0` */
  startPage?: number
  /** Default page index, defaults to `startPage` */
  defaultPage?: number
  /** Default page size, defaults to `10` */
  defaultSize?: number
}

export interface UsePaginationRequest<T> {
  (page: number, size: number): Awaitable<{ data: T[], page?: number }>
}

export function usePagination<T>(request: UsePaginationRequest<T>, options?: UsePaginationOptions) {
  const { startPage = 0, defaultSize = 10 } = options || {}
  const defaultPage = options?.defaultPage ?? startPage

  const page = ref(defaultPage)
  const size = ref(defaultSize)
  const isDone = ref(false)
  const data = shallowRef<T[]>([])

  async function _handleRequest(_page: number, _size: number) {
    if (isDone.value) {
      return
    }
    const { data: returnedData, page: returnedPage } = await request(_page, _size)
    data.value = [...data.value, ...returnedData]
    if (returnedData.length < _size) {
      isDone.value = true
      return returnedData
    }
    if (isDefined(returnedPage)) {
      page.value = returnedPage
    }
    return returnedData
  }

  async function refresh() {
    data.value = []
    page.value = startPage
    size.value = defaultSize
    isDone.value = false
    await _handleRequest(page.value, size.value)
    return data.value
  }

  async function next() {
    page.value++
    await _handleRequest(page.value, size.value)
    return data.value
  }

  return {
    page,
    size,
    data,
    isDone,
    refresh,
    next,
  }
}
