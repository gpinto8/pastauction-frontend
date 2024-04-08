import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { httpGet } from '@/api/api';
import { useEntityStore } from '@/store/entity';
const entityStore = useEntityStore();
const { generalInfo } = storeToRefs(entityStore);

export const useEntityEventsStore = defineStore('entityEvents', () => {
  const entityId = ref<number | null>(null);
  const entityEvents = ref<any[]>([]);
  const loadingEntityEvents = ref(false);

  const entityEventsYear = ref(new Date().getFullYear());
  const entityEventsYearBegin = computed(() => `${entityEventsYear.value}-01-01`);
  const entityEventsYearEnd = computed(() => `${entityEventsYear.value}-12-31`);

  const selectPast = ref(true);
  const selectOngoing = ref(true);
  const selectNext = ref(true);

  const statusFilter = computed(() => {
    const status = [];
    if (selectPast.value) status.push('past');
    if (selectOngoing.value) status.push('ongoing');
    if (selectNext.value) status.push('next');
    return status;
  });

  async function fetchAllItems<T>(url: string): Promise<T[]> {
    function addToUrl(url: string, params: string): string {
      return url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
    }
    const firstQueryUrl = addToUrl(url, 'size=1');
    const firstQueryResponse = await httpGet(firstQueryUrl);
    const totalItems = firstQueryResponse.data.total;
    const pageSize = 100;
    const numberOfPages = Math.ceil(totalItems / pageSize);
    const items: T[] = [];
    for (let page = 1; page <= numberOfPages; page++) {
      const queryUrl = addToUrl(url, `page=${page}&size=${pageSize}`);
      const response = await httpGet(queryUrl);
      items.push(...response.data.items);
    }
    return items;
  }
    
  const entityEventCategoires = ref<{ label: string, value: string}[]>([
    {
      label: 'Race',
      value: 'race'
    },
    {
      label: 'Exhibition',
      value: 'exhibition'
    },
    {
      label: 'Museum',
      value: 'museum'
    },
    {
      label: 'Circuit',
      value: 'circuit'
    },
    {
      label: 'Races',
      value: 'races'
    },
    {
      label: 'Market',
      value: 'market'
    },
    {
      label: 'Rally',
      value: 'rally'
    },
    {
      label: 'Tours',
      value: 'tours'
    },
    {
      label: 'Library',
      value: 'library'
    },
    {
      label: 'Factory',
      value: 'factory'
    },
    {
      label: 'Magazine',
      value: 'magazine'
    },
    {
      label: 'Owner club',
      value: 'owner_club'
    },
    {
      label: 'Concours',
      value: 'concours'
    },
    {
      label: 'Collection',
      value: 'collection'
    },
    {
      label: 'Services',
      value: 'services'
    }
  ]);

  function statusToColor(status: string) {
    switch (status) {
      case 'past':
        return 'red';
      case 'ongoing':
        return 'green';
      case 'next':
        return 'blue';
      default:
        return 'red';
    }
  }
  function getStatusFromEvent(event: {event_begin_date: string, event_date_end: string}) {
    const beginDate = new Date(event.event_begin_date);
    const endDate = new Date(event.event_date_end);
    const today = new Date();
    if (today > endDate) {
      return 'past';
    }
    if (today >= beginDate && today <= endDate) {
      return 'ongoing';
    }
    return 'next';
  }

  async function fetchEntityEvents(entityId: number | null) {
    if (entityId !== null) {
      try {
        loadingEntityEvents.value = true;
        const search = `search=event_cod_entity_id:${entityId}`;
        const begin = `event_begin_date=${entityEventsYearBegin.value}`;
        const end = `event_end_date=${entityEventsYearEnd.value}`;
        const status = statusFilter.value.length && statusFilter.value.length < 3 ? `&status=${statusFilter.value}` : '';
        entityEvents.value = await fetchAllItems<any>(`/entity_event?search=${search}&${begin}&${end}${status}`);
      }
      finally {
        loadingEntityEvents.value = false;
      }
    }
    // TODO
    // return new Promise((resolve) => {
       
    //    setTimeout(() => {
    //     resolve(entityEvents.value = [{
    //         id: 1,
    //         name: 'Nome',
    //         location: 'Valdagno',
    //         beginDate: '2021-10-10',
    //         avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    //         status: 'past'
    //     },
        
    //     {
    //         id: 2,
    //         name: 'Nome',
    //         location: 'Valdagno',
    //         beginDate: '2021-10-10',
    //         avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    //         status: 'ongoing'
    //     },
        
    //     {
    //         id: 3,
    //         name: 'Nome',
    //         location: 'Valdagno',
    //         beginDate: '2021-10-10',
    //         avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    //         status: 'next'
    //     }
    // ])
    // loadingEntityEvents.value = false;
// }, 2000)});
  }
  watch([entityId, entityEventsYear, selectPast, selectOngoing, selectNext], async function() {
    fetchEntityEvents(entityId.value);
  });

  async function initializeFetch() {
      await entityStore.fetchGeneralInfo();
      entityId.value = +generalInfo.value.id;
      await fetchEntityEvents(entityId.value);
    
  }

  async function fetchEntityEventByid(id: number) {
    return {
      id: 1,
      status: 'past',
      name: 'Nome',
      beginDate: '2022-01-01',
      beginCountry: 'Italy',
      beginCity: 'Rome',
      beginAddress: 'Via Roma 1',
      beginLongitude: 12.4963655,
      beginLatitude: 41.9027835,
      endDate: '2022-01-01',
      endCountry: 'Italy',
      endCity: 'Rome',
      endAddress: 'Via Roma 1',
      endLongitude: 12.4963655,
      endLatitude: 41.9027835,
      categories: [],
      openDay: '2022-01-01',
      openTime: '00:00',
      description: 'Description',
      website: 'https://www.google.com',
      logo: 'https://www.google.com',
      photo: 'https://www.google.com',
      active: false
    };
  }

  async function addEntityEvent(event: any) {
    console.log('ciao')
  }

  async function deleteEntityEvent(id: number) {
    console.log('ciao')
  }

  async function updateEntityEvent(id: number, event: any) {
    console.log('ciao')
  }

  async function toggleEntityEventActive(id: number, active: boolean) {
    console.log('ciao')
  }

  return {
    entityEvents,
    loadingEntityEvents,
    entityEventCategoires,
    entityEventsYear,
    selectPast,
    selectOngoing,
    selectNext,
    initializeFetch,
    statusToColor,
    getStatusFromEvent,
    fetchEntityEvents,
    fetchEntityEventByid,
    addEntityEvent,
    deleteEntityEvent,
    updateEntityEvent,
    toggleEntityEventActive
  }
});
