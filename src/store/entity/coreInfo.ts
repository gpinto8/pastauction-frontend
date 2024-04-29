import { httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEntityCoreInfoStore = defineStore('entity-core-info', () => {
  const defaultCoreInfo = {
    openDay: '',
    timeFrom: '',
    timeTo: '',
    mainPhoto: '',
    activityDescription: '',
    historyOfActivity: '',
    openingDescription: '',
  };
  type CoreInfo = typeof defaultCoreInfo;
  const coreInfo = ref<CoreInfo>({...defaultCoreInfo});

  async function fetchCoreInfo() {
    const entity = (await httpGet('/entity')).data;
    coreInfo.value = {
      openDay: entity.days_activity ?? '',
      timeFrom: entity.time_open ?? '',
      timeTo: entity.time_close ?? '',
      mainPhoto: entity.main_photo ?? '',
      activityDescription: entity.descr_activity ?? '',
      historyOfActivity: entity.descr_history ?? '',
      openingDescription: entity.opening_descr ?? '',
    }
  }

  async function saveCoreInfo() {
    const info = JSON.parse(JSON.stringify(coreInfo.value));
    await httpPatch('/entity_entity/update', {
      days_activity: info.openDay,
      time_open: info.timeFrom,
      time_close: info.timeTo,
      descr_activity: info.activityDescription,
      descr_history: info.historyOfActivity,
      opening_descr: info.openingDescription,
    });
  }

  async function uploadPhoto(fileList: FileList | null) {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      const response = await httpUpload('/entity_entity/', formData);
      const url = response.data.url;
      coreInfo.value.mainPhoto = url;
    } 
  }

  return { coreInfo, fetchCoreInfo, saveCoreInfo, uploadPhoto };
});
