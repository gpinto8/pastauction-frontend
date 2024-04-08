import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { httpDelete, httpGet, httpPatch, httpPost } from '@/api/api';
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
  }
  watch([entityId, entityEventsYear, selectPast, selectOngoing, selectNext], async function() {
    fetchEntityEvents(entityId.value);
  });

  async function fetchEntityId() {
    await entityStore.fetchGeneralInfo();
    entityId.value = +generalInfo.value.id;
  }

  async function initializeFetch() {
    await fetchEntityId();
    await fetchEntityEvents(entityId.value);
  }

  async function initializeAdd() {
    await fetchEntityId();
    return {
      cod_entity_id: entityId.value,
      event_cod_entity_id: entityId.value,
      event_begin_address: "pippo",
      event_begin_city: "string",
      event_begin_country: "string",
      event_begin_date: "2024-03-20",
      event_begin_lat: 0.0,
      event_begin_lon: 0.0,
      event_collect_best_in_garage: "string",
      event_collect_rank: "string",
      event_collect_score: 0.0,
      event_collect_trophy: "string",
      event_collect_year_update: 0,
      event_date_end: "2024-03-20",
      event_description: "string",
      event_end_address: "string",
      event_end_city: "string",
      event_end_country: "string",
      event_end_lat: 0.0,
      event_end_lon: 0.0,
      event_logo: "\\x737472696e67",
      event_logo_url: "string",
      event_main_photo: "string",
      event_name: "string",
      event_peno_to: "string",
      event_event_type: "string",
      event_website: "string",
      user_entity_id: 15796,
      user_id: 64,
      entity_id: 15796,
      entity_address: "string",
      entity_aging_period: "string",
      entity_area_geo: "string",
      entity_brand_main: "string",
      entity_brand_secondary: "string",
      entity_city: "string",
      entity_city_latit: 0.0,
      entity_city_longit: 0.0,
      entity_country: "Italy",
      entity_country_code: "string",
      entity_days_activity: "Lun,Mar,Mer",
      entity_descr_activity: "string",
      entity_descr_history: "string",
      entity_email: "string",
      entity_logo: "string",
      entity_logo_path: "string",
      entity_logo_url: "string",
      entity_main_photo: "string",
      entity_main_photo_path: "string",
      entity_main_photo_url: "string",
      entity_name_complete: "string",
      entity_name_short: "string",
      entity_opening_descr: "string",
      entity_phone: "string",
      entity_phone_hand: "string",
      entity_region_state: "string",
      entity_social_media: "string",
      entity_website: "string",
      event_disabled: false,
      categories: []
  }
}

  async function fetchEntityEventByid(id: number) {
    const search = `search=event_id_key:${id}`;
    const response = await httpGet(`/entity_event?${search}`);
    return response.data.items[0];
  }

  async function addEntityEvent(event: any) {
    await httpPost('/entity_event/create', event);
  }

  async function deleteEntityEvent(id: number) {
    await httpDelete(`/entity_event/delete/${id}`);
  }

  async function updateEntityEvent(id: number, event: any) {
    await httpPatch(`/entity_event/update/${id}`, event);
  }

  async function toggleEntityEventActive(id: number, active: boolean) {
    await httpPatch(`/entity_event/update/${id}`, {event_disabled: !active});
  }

  async function duplicateEvent(event: any) {
    await httpPost('/entity_event/create', {...event, event_id_key: undefined});
  }

  return {
    entityEvents,
    loadingEntityEvents,
    entityEventCategoires,
    entityEventsYear,
    selectPast,
    selectOngoing,
    selectNext,
    initializeAdd,
    initializeFetch,
    statusToColor,
    getStatusFromEvent,
    fetchEntityEvents,
    fetchEntityEventByid,
    addEntityEvent,
    deleteEntityEvent,
    updateEntityEvent,
    toggleEntityEventActive,
    duplicateEvent
  }
});
