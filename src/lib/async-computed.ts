// useAsyncComputed.ts
import { ref, type Ref, watch, computed, type ComputedRef } from 'vue'

interface AsyncComputedResult<T> {
  result: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
}

export function useAsyncComputed<T> (
  getter: ComputedRef<Promise<T>> | (() => Promise<T>)
): AsyncComputedResult<T> {
  const result = ref<T | null>(null) as Ref<T | null>
  const loading = ref(true)
  const error = ref<Error | null>(null)

  // Convert the getter to a computed if it's not already one
  const computedGetter = computed(() => {
    return typeof getter === 'function' ? getter() : getter.value
  })

  // Use watch instead of watchEffect to avoid unnecessary executions
  watch(computedGetter, async (promise) => {
    loading.value = true
    error.value = null
    try {
      result.value = await promise
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }, { immediate: true })

  return { result, loading, error }
}