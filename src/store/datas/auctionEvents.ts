import { defineStore } from 'pinia';
import { ref, computed, type Ref } from 'vue';
import { httpGet } from '@/api/api';
import { buildQS } from '@/utils/functions/buildQS';

export const useAuctionEventsStore = defineStore('auctionEvents', () => {
  // state
  const listItems = ref();
  const listAreas = ref();
  const listCountries = ref();
  const listCities = ref();
  const listMaison = ref();
  const listYears = ref();
  const loading = ref(false);
  const detail = ref();
  const loadingListItems = ref(false);
  const listEvents = ref();
  // getters
  const getListItems = computed(() => listItems.value);
  const getListAreas = computed(() => listAreas.value);
  const getListCountries = computed(() => listCountries.value);
  const getListCities = computed(() => listCities.value);
  const getListMaison = computed(() => listMaison.value);
  const getListYears = computed(() => listYears.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const getLoadingListItems = computed(() => loadingListItems.value);
  const getListEvents = computed(() => listEvents.value);
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
      httpGet(`bidwatcher_auction/query_1?${qs}`)
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

  function auctionGetter(list: Ref<any>) {
    
      return async (tablename?: string, columnName?: string) => {
        try {
        const { data } = await httpGet(`filter/${tablename}/${columnName}/`);
        list.value = data.items;
        return data;
        }
        catch (err) {
          console.log(tablename, columnName)
          console.log(err);
          throw err;
        }
        
      };
    }
    
      

  return {
    // state
    // getters
    getListItems,
    getListAreas,
    getLoading,
    getDetail,
    getListCountries,
    getListCities,
    getListMaison,
    getListYears,
    getLoadingListItems,
    getListEvents,

    // actions
    listPaginated,
    auctionAreas: auctionGetter(listAreas),
    auctionCountries: auctionGetter(listCountries),
    auctionCities: auctionGetter(listCities),
    auctionMaison: auctionGetter(listMaison),
    auctionYear: auctionGetter(listYears),
    auctionEvents: auctionGetter(listEvents)
  };
});
