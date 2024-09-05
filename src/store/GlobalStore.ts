import { defineStore } from 'pinia';
import { ref, watch, type Ref } from 'vue';
import { httpPost, httpGet } from '@/api/api';
import { useDisplay } from 'vuetify';

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
  function globalFilter (tableName: any, column: any, page = 1, size = 50) {
    return httpGet(`filter/${tableName}/${column}/?page=${page}&size=${size}`)
      .then(({ data }) => data.items)
  }

  async function globalFilterAll<T> (tableName: string, column: string, _page = 1, _size = 100, _items: T[] = []): Promise<T[]> {
    const {
      items,
      page,
      pages,
      size,
      total,
    } = await httpGet(`filter/${tableName}/${column}/?page=${_page}&size=${_size}`).then(({ data }) => data)

    _items = _items.concat(items)

    if (page < pages) {
      return globalFilterAll(tableName, column, page + 1, _size, _items)
    }

    return _items
  }

	const vuetifyDisplay = useDisplay();

	/** a state that represens the current user's size/type of display, this is to sync vuetify with tailwnid media queries sizes*/
	const displayMediaQuery = ref({
		sm: vuetifyDisplay.width.value >= 640,
		md: vuetifyDisplay.width.value >= 768,
		lg: vuetifyDisplay.width.value >= 1024,
	});
	watch([vuetifyDisplay.width], ()=>{
		displayMediaQuery.value = {
			sm: vuetifyDisplay.width.value >= 640,
			md: vuetifyDisplay.width.value >= 768,
			lg: vuetifyDisplay.width.value >= 1024,
		}
	});

  return {
    loading,
    progress,
    message,
		displayMediaQuery,
    setLoading,
    setProgress,
    setMessage,
    globalFilter,
    globalFilterAll,
  };
});

export default useGlobalStore;
