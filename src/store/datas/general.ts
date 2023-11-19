import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { get, upload, getHtml, load } from '@/api/api';

export const useGeneralStore = defineStore('general', () => {
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

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
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
    uploadMedia,
    loadMedia,
  };
});
