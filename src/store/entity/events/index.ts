import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useEntityEventsStore = defineStore('entityEvents', () => {
  const entityEvents = ref<any[]>([]);
  const loadingEntityEvents = ref(false);

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
    entityEventCategoires,
    statusToColor,
    fetchEntityEvents
  }
});
