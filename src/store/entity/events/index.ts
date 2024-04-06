import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useEntityEventsStore = defineStore('entityEvents', () => {
  const entityEvents = ref<any[]>([]);
  const loadingEntityEvents = ref(false);

  async function fetchEntityEvents() {
    // TODO
    return new Promise((resolve) => {
       loadingEntityEvents.value = true;
       setTimeout(() => {
        resolve(entityEvents.value = [{
            id: 1,
            name: 'Nome',
            location: 'Valdagno',
            beginDate: '2021-10-10',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            status: 'past'
        },
        
        {
            id: 2,
            name: 'Nome',
            location: 'Valdagno',
            beginDate: '2021-10-10',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            status: 'ongoing'
        },
        
        {
            id: 3,
            name: 'Nome',
            location: 'Valdagno',
            beginDate: '2021-10-10',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            status: 'next'
        }
    ])
    loadingEntityEvents.value = false;
}, 2000)});
  }

  return {
    entityEvents,
    loadingEntityEvents,
    fetchEntityEvents
  }
});
