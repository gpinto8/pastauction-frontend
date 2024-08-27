import { ref, computed, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { httpDelete, httpGet, httpPatch, httpPost, httpUpload } from '@/api/api';
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

  function vistaEventToEvent(vistaEvent: any) {
    return {
        id_key: vistaEvent.event_id_key,
        begin_address: vistaEvent.event_begin_address,
        begin_city: vistaEvent.event_begin_city,
        begin_country: vistaEvent.event_begin_country,
        begin_date: vistaEvent.event_begin_date,
        begin_lat: vistaEvent.event_begin_lat,
        begin_lon: vistaEvent.event_begin_lon,
        collect_best_in_garage: vistaEvent.event_collect_best_in_garage,
        collect_rank: vistaEvent.event_collect_rank,
        collect_score: vistaEvent.event_collect_score,
        collect_trophy: vistaEvent.event_collect_trophy,
        collect_year_update: vistaEvent.event_collect_year_update,
        cod_entity_id: vistaEvent.event_cod_entity_id,
        date_end: vistaEvent.event_date_end,
        description: vistaEvent.event_description,
        end_address: vistaEvent.event_end_address,
        end_city: vistaEvent.event_end_city,
        end_country: vistaEvent.event_end_country,
        end_lat: vistaEvent.event_end_lat,
        end_lon: vistaEvent.event_end_lon,
        logo: vistaEvent.event_logo,
        logo_url: vistaEvent.event_logo_url,
        main_photo: vistaEvent.event_main_photo,
        event_logo: vistaEvent.event_logo,
        name: vistaEvent.event_name,
        open_to: vistaEvent.event_open_to,
        event_type: vistaEvent.event_event_type.split(','),
        website: vistaEvent.event_website,
        disabled: vistaEvent.event_disabled,
    }
  }

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
        entityEvents.value = await fetchAllItems<any>(`/entity_event?${search}&${begin}&${end}${status}`);
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
      begin_address: "pippo",
      begin_city: "string",
      begin_country: "string",
      begin_date: "2024-03-20",
      begin_lat: 0.0,
      begin_lon: 0.0,
      collect_best_in_garage: "string",
      collect_rank: "string",
      collect_score: 0.0,
      collect_trophy: "string",
      collect_year_update: 0,
      date_end: "2024-03-20",
      description: "string",
      end_address: "string",
      end_city: "string",
      end_country: "string",
      end_lat: 0.0,
      end_lon: 0.0,
      logo: "",
      logo_url: "",
      main_photo: "",
      name: "string",
      peno_to: "string",
      event_type: [],
      website: "string",
      disabled: false
  }
}

  async function fetchEntityEventByid(id: number) {
    const search = `search=event_id_key:${id}`;
    const response = await httpGet(`/entity_event?${search}`);
    return response.data.items[0];
  }

  async function addEntityEvent(event: any) {
    const body = {...event, event_type: event.event_type.join(',')};
    await httpPost('/entity_event/create', body);
  }

  async function deleteEntityEvent(id: number) {
    await httpDelete(`/entity_event/delete/${id}`);
  }

  async function updateEntityEvent(id: number, event: any) {
    const body = {...event, id_key: undefined, main_photo: undefined, logo_test: undefined, logo: undefined, event_type: event.event_type.join(',')};
    await httpPatch(`/entity_event/update/${id}`, body);
  }

  async function toggleEntityEventActive(id: number, active: boolean) {
    await httpPatch(`/entity_event/update/${id}`, {disabled: !active});
  }

  async function duplicateEvent(event: any) {
    await httpPost('/entity_event/create', {...event, id_key: undefined, main_photo: undefined, logo_test: undefined, logo: undefined, event_type: event.event_type.join(',')});
  }

  async function uploadMainPhoto(fileList: FileList | null, id: number): Promise<string> {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      const response = await httpUpload(`/entity_event/?nome_file=${id}`, formData);
      return response.data.url;
    } 
    return '';
  }

  async function uploadLogo(fileList: FileList | null, id: number): Promise<string> {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      const response = await httpUpload(`/entity_event_logo/?nome_file=${id}`, formData);
      return response.data.url;
    } 
    return '';
  }

  return {
    entityEvents,
    loadingEntityEvents,
    entityEventCategoires,
    entityEventsYear,
    selectPast,
    selectOngoing,
    selectNext,
    vistaEventToEvent,
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
    duplicateEvent,
    uploadMainPhoto,
    uploadLogo,
  }
});
