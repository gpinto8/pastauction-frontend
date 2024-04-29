import { httpDelete, httpGet, httpPatch, httpPut } from '@/api/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useEntityIdentityTypeStore = defineStore('entity-identity-type', () => {
  type IdentityType = {
    type: string;
    data: any;
  }
  const defaultIdentityTypes = [] as IdentityType[];

  const identityTypeSchema = ref([
    {
      type: 'museum',
      label: 'Museum',
      fields: null
    },
    {
      type: 'circuit',
      label: 'Circuit',
      fields: [
        {
          name: 'map_url',
          label: 'Map URL'
        },
        {
          name: 'distance',
          label: 'Distance'
        }
      ]
    },
    {
      type: 'collectors',
      label: 'Collectors',
      fields: [
        {
          name: 'first_car',
          label: 'First Car'
        },
        {
          name: 'born_date',
          label: 'Born Date'
        },
        {
          name: 'age',
          label: 'Age'
        },
        {
          name: 'favorite',
          label: 'Favorite'
        }
      ]
    },
    {
      type: 'historic_car_races',
      label: 'Historic Car Races',
      fields: null
    },
    {
      type: 'auction_house',
      label: 'Auction House',
      fields: null
    },
    {
      type: 'exhibitions',
      label: 'Exhibitions',
      fields: null
    },
    {
      type: 'market',
      label: 'Market',
      fields: null
    },
    {
      type: 'rally',
      label: 'Rally',
      fields: null
    },
    {
      type: 'libraries',
      label: 'Libraries',
      fields: null
    },
    {
      type: 'cars_motorcycle_boat_factories',
      label: 'Cars, Motorcycle & Boat Factories',
      fields: null
    },
    {
      type: 'vintage_racing_car_magazines',
      label: 'Vintage Racing Car Magazines',
      fields: null
    },
    {
      type: 'tours',
      label: 'Tours',
      fields: null
    },
    {
      type: 'sports_car_club',
      label: 'Sports Car Club',
      fields: null
    },
    {
      type: 'concours_elegance',
      label: 'Concours Elegance',
      fields: null
    },
    {
      type: 'private_collections',
      label: 'Private Collections',
      fields: null
    },
    {
      type: 'services',
      label: 'Services',
      fields: null
    },
    {
      type: 'vehicle_spare_parts',
      label: 'Vehicle Spare Parts',
      fields: null
    },
    {
      type: 'club',
      label: 'Club',
      fields: [
        {
          name: 'annual_fee',
          label: 'Annual Fee'
        },
        {
          name: 'annual_fee_currency',
          label: 'Annual Fee Currency'
        },
        {
          name: 'total_associates',
          label: 'Total Associates'
        },
        {
          name: 'specific_model',
          label: 'Specific Model'
        },
        {
          name: 'model',
          label: 'Model'
        },
        {
          name: 'speciality',
          label: 'Speciality'
        },
        {
          name: 'activities',
          label: 'Activities'
        },
        {
          name: 'affiliation',
          label: 'Affiliation'
        },
        {
          name: 'event_year',
          label: 'Event Year'
        },
        {
          name: 'membership_restriction',
          label: 'Membership Restriction'
        }
      ]
    },
    {
      type: 'other',
      label: 'Other',
      fields: null
    }
  ]);
  const selectedIdentityTypes = ref<string[]>([]);
  const identityTypeClubData = ref<any>(null);
  const identityTypeCircuitData = ref<any>(null);
  const identityTypeCollectorsData = ref<any>(null);
  
  const identityTypes = ref<IdentityType[]>([...defaultIdentityTypes]);

  function updateClubDataToEmpty() {
    identityTypeClubData.value = {
      annual_fee: '',
      annual_fee_currency: '',
      total_associates: '',
      specific_model: '',
      model: '',
      speciality: '',
      activities: '',
      affiliation: '',
      event_year: '',
      membership_restriction: ''
    };
  }
  function updateCircuitDataToEmpty() {
    identityTypeCircuitData.value = {
      map_url: '',
      distance: ''
    };
  }
  function updateCollectorsDataToEmpty() {
    identityTypeCollectorsData.value = {
      first_car: '',
      born_date: '',
      age: '',
      favorite: ''
    };
  }

  function updateStuffFromIdentityTypes() {
    selectedIdentityTypes.value = identityTypes.value.map((idType: IdentityType) => idType.type);
    if (selectedIdentityTypes.value.includes('club')) {
      identityTypeClubData.value = identityTypes.value.find((idType: IdentityType) => idType.type === 'club')?.data
      if (!identityTypeClubData.value) {
        updateClubDataToEmpty();
      }
    }
    if (selectedIdentityTypes.value.includes('circuit')) {
      identityTypeCircuitData.value = identityTypes.value.find((idType: IdentityType) => idType.type === 'circuit')?.data;
      if (!identityTypeCircuitData.value) {
        updateCircuitDataToEmpty();
      }
    }
    if (selectedIdentityTypes.value.includes('collectors')) {
      identityTypeCollectorsData.value = identityTypes.value.find((idType: IdentityType) => idType.type === 'collectors')?.data;
      if (!identityTypeCollectorsData.value) {
        updateCollectorsDataToEmpty();
      }
    }
  }

  async function fetchIdentityTypes() {
    const entity = (await httpGet('/entity')).data;
    identityTypes.value = entity.idTypes;
    updateStuffFromIdentityTypes();
  }

  async function saveIdentityTypes() {
    for (const identityType of identityTypeSchema.value) {
      if (selectedIdentityTypes.value.includes(identityType.type)) {
        if (identityType.type === 'club') {
          await httpPut(`/entity_kind/${identityType.type}`, identityTypeClubData.value);
        }
        else if (identityType.type === 'circuit') {
          await httpPut(`/entity_kind/${identityType.type}`, identityTypeCircuitData.value)
        }
        else if (identityType.type === 'collectors') {
          await httpPut(`/entity_kind/${identityType.type}`, identityTypeCollectorsData.value);
        }
        else  {
          await httpPut(`/entity_kind/${identityType.type}`, {});
        }
      }
      else {
        await httpDelete(`/entity_kind/${identityType.type}`);
      }
    }
    await fetchIdentityTypes();
  }

  return { identityTypes, identityTypeSchema, identityTypeClubData,
    updateClubDataToEmpty, updateCircuitDataToEmpty, updateCollectorsDataToEmpty,
    selectedIdentityTypes,
    identityTypeCircuitData,
    identityTypeCollectorsData, fetchIdentityTypes, saveIdentityTypes };
});
