import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { upload, getHtml, load } from '@/api/api';

export const useGeneralStore = defineStore('general', () => {
  // state
  const list = ref();
  const loading = ref(false);
  const detail = ref();
  const tokens = ref(0);
  const bolts = ref(0);

  // getters
  const getList = computed(() => list.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getTokens = computed(() => tokens.value);
  const getBolts = computed(() => bolts.value);

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

  async function uploadMedia(tableName: string, columnName: string, file: any) {
    loading.value = true;
    const formData = new FormData();
    formData.append('file', file);

    return await new Promise((resolve, reject) => {
      upload(`${tableName}/?nome_file=${columnName}`, formData)
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

  function loadMedia(stringUrlMedia: string) {
    return new Promise((resolve, reject) => {
      load(`photo/${stringUrlMedia}`)
        .then(({ data }) => {
          console.log(data);
          blobToBase64(data).then(res => resolve(res));
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  function setTokens(value: number) {
    tokens.value = value;
  }

  function setBolts(value: number) {
    bolts.value = value;
  }

  return {
    // state
    // getters
    getList,
    getLoading,
    getDetail,
    getTokens,
    getBolts,

    // actions
    getCharts,
    uploadMedia,
    loadMedia,
    setTokens,
    setBolts,
  };
});
