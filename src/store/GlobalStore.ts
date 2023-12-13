import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { httpPost, httpGet } from '@/api/api';

/** Global Store */
export const useGlobalStore = defineStore('global', () => {
  // State

  /** Loading overlay */
  const loading: Ref<boolean> = ref(true);
  /** ProgressBar Percentage */
  const progress: Ref<number | null> = ref(null);
  /** SnackBar Text */
  const message: Ref<string> = ref('');

  // Actions

  /**
   * Show loading Overlay
   *
   * @param display - visibility
   */
  function setLoading(display: boolean): void {
    loading.value = display;
    if (!display) {
      // Reset Progress value
      progress.value = null;
    }
  }

  /**
   * Update progress value
   *
   * @param v - progress value
   */
  function setProgress(v: number | null = null): void {
    // update progress value
    progress.value = v;
    // display loading overlay
    loading.value = true;
  }

  /**
   * Show snackbar message
   *
   * @param msg - snackbar message
   */
  function setMessage(msg: string = ''): void {
    // put snackbar text
    message.value = msg;
  }

  /**
   * Get global query filter
   *
   * @param global - filters
   */
  async function globalFilter(tableName: any, column: any) {
    return await new Promise((resolve, reject) => {
      httpGet(`filter/${tableName}/${column}/?page=1&size=50`)
        .then(({ data }) => {
          resolve(data.items);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  return {
    loading,
    progress,
    message,
    setLoading,
    setProgress,
    setMessage,
    globalFilter,
  };
});

export default useGlobalStore;
