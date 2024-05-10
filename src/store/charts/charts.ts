import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { httpPost, getHtml } from '@/api/api';

export const useChartsStore = defineStore('charts', () => {
  // state
  const list = ref();
  const loading = ref(false);
  const detail = ref();
  const selectedChartCategory = ref<null | string>(null)
  const selectedChartType = ref<null | string>(null)
  // getters
  const getList = computed(() => list.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getSelectedChartCategory = computed(() => selectedChartCategory.value);
  const getSelectedChartType = computed(() => selectedChartType.value);

  // actions

  function setSelectedChartCategory(newValue: string | null) {
    selectedChartCategory.value = newValue
  }
  function setSelectedChartType(newValue: string | null) {
    selectedChartType.value = newValue
  }

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
    getSelectedChartCategory,
    getSelectedChartType,
    // actions
    getCharts,
    setSelectedChartCategory,
    setSelectedChartType,
  };
});
