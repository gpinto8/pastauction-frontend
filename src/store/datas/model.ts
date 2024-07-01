import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { httpGet} from '@/api/api';
import { buildQS } from '@/utils/functions/buildQS';

export const useModelStore = defineStore('model', () => {
  // state
  const listItems = ref();
  const loading = ref(false);
  const detail = ref();
  const loadingListItems = ref(false);
  // getters
  const getListItems = computed(() => listItems.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getLoadingListItems = computed(() => loadingListItems.value);

  // actions
  async function listPaginated(
    page: number,
    size: number,
    search?: any,
    sort?: any
  ) {
    loadingListItems.value = true;
    const qs = buildQS({
      page: page,
      size: size,
      search: search,
      sort: sort,
    });

    return await new Promise((resolve, reject) => {
      httpGet(`bidwatcher_vehicle/query_5?${qs}`)
        .then(({ data }) => {
          console.log(data);
          listItems.value = data;
          loadingListItems.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loadingListItems.value = false;
          reject(err);
        });
    });
  }

  return {
    // state
    // getters
    getListItems,
    getLoading,
    getDetail,
    getLoadingListItems,

    // actions
    listPaginated,
  };
});
