import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { httpPost, getHtml } from '@/api/api';

export const useChartsStore = defineStore('charts', () => {
  // state
  const list = ref();
  const loading = ref(false);
  const detail = ref();

  // getters
  const getList = computed(() => list.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);

  // actions

  async function getCharts() {
    loading.value = true;
    return await new Promise((resolve, reject) => {
      getHtml('chart')
        .then(({ data }) => {
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  return {
    // state
    // getters
    getList,
    getLoading,
    getDetail,

    // actions
    getCharts,
  };
});
