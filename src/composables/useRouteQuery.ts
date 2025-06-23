export interface UseRouteQueryOptions {
}

export interface UseRouteQueryOptionsWithTransform<V, R> extends UseRouteQueryOptions {
  transform?: (value: V) => R
}

export function useRouteQuery(name: string): Ref<undefined | null | string>
export function useRouteQuery<T extends string, K = T>(name: string, defaultValue?: MaybeRefOrGetter<T>, options?: UseRouteQueryOptionsWithTransform<T, K>): Ref<K>
export function useRouteQuery<T extends string, K = T>(name: string, defaultValue?: MaybeRefOrGetter<T>, options?: UseRouteQueryOptionsWithTransform<T, K>) {
  const query = ref<Record<string, any>>({})

  onLoad((params) => {
    if (params) {
      query.value = params
    }
  })

  return computed({
    get() {
      const rawValue = query.value[name]
      const defaultVal = toValue(defaultValue)

      if (rawValue === undefined || rawValue === null) {
        return defaultVal as K
      }

      if (options?.transform) {
        return options.transform(rawValue as T)
      }

      return rawValue as K
    },
    set(value) {
      query.value[name] = value
    },
  })
}
