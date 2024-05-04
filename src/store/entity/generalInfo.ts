import { httpGet, httpPatch } from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEntityGeneralInfoStore = defineStore('entity-general-info', () => {
  const defaultGeneralInfo = {
    nameShort: '',
    nameComplete: '',
    id: '',
    yearBeginning: '',
    yearEnding: '',
    address: '',
    postalCode: '',
    city: '',
    province: '',
    regionState: '',
    country: '',
    geoArea: '',
    latitude: '',
    longitude: '',
    website: '',
    phone: '',
    email: '',
    agePeriods: [],
    typesOfVehicle: []
  };
  type GeneralInfo = typeof defaultGeneralInfo;
  const generalInfo = ref<GeneralInfo>({...defaultGeneralInfo});

  async function fetchGeneralInfo() {
    const entity = (await httpGet('/entity')).data;
    generalInfo.value = {
      nameShort: entity.name_short ?? '',
      nameComplete: entity.name_complete ?? '',
      id: entity.id ?? '',
      yearBeginning: entity.year_beginning ?? '',
      yearEnding: entity.year_end ?? '',
      address: entity.address ?? '',
      postalCode: entity.postal_code ?? '',
      city: entity.city ?? '',
      province: entity.prov ?? '',
      regionState: entity.region_state ?? '',
      country: entity.country ?? '',
      geoArea: entity.area_geo ?? '',
      latitude: entity.city_latit || '0.0',
      longitude: entity.city_longit || '0.0',
      website: entity.website ?? '',
      phone: entity.phone ?? '',
      email: entity.email ?? '',
      agePeriods: entity.aging_period && entity.aging_period !== 'string' ? entity.aging_period.split(',') : [],
      typesOfVehicle: entity.temp_tipo && entity.temp_tipo !== 'string' ? entity.temp_tipo.split(',') : []
    }
  }

  async function saveGeneralInfo() {
    const info = JSON.parse(JSON.stringify(generalInfo.value));
    await httpPatch('/entity_entity/update', {
      name_short: info.nameShort,
      name_complete: info.nameComplete,
      address: info.address,
      postal_code: info.postalCode,
      city: info.city,
      prov: info.province,
      region_state: info.regionState,
      country: info.country,
      area_geo: info.geoArea,
      city_latit: info.latitude,
      city_longit: info.longitude,
      website: info.website,
      phone: info.phone,
      email: info.email,
      aging_period: info.agePeriods.join(','),
      temp_tipo: info.typesOfVehicle.join(',')
    });
  }

  return { generalInfo, fetchGeneralInfo, saveGeneralInfo };
});
