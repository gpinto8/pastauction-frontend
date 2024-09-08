import type { Ref } from 'vue'

export function withLoading (loading: Ref<boolean>, promise: Promise<any>) {
  loading.value = true
  return promise.finally(() => {
    loading.value = false
  })
}
