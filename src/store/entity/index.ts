import { defineStore, storeToRefs } from 'pinia';
import { useEntityGeneralInfoStore } from './generalInfo';
import { useEntityIdentityTypeStore } from './identityType';
import { useEntityVehiclesOfInterestStore } from './vehiclesOfInterest';
import { useEntityCoreInfoStore } from './coreInfo';

export const useEntityStore = defineStore('entity', () => {
  const generalInfoStore = useEntityGeneralInfoStore();
  const identityTypeStore = useEntityIdentityTypeStore();
  const vehiclesOfInterestStore = useEntityVehiclesOfInterestStore();
  const coreInfoStore = useEntityCoreInfoStore();

  const {generalInfo} = storeToRefs(generalInfoStore);
  const {fetchGeneralInfo, saveGeneralInfo} = generalInfoStore;
  const {identityTypes, identityTypeSchema,
    selectedIdentityTypes,
    identityTypeClubData,
    identityTypeCircuitData,
    identityTypeCollectorsData,} = storeToRefs(identityTypeStore);
  const {fetchIdentityTypes, saveIdentityTypes, updateClubDataToEmpty, updateCircuitDataToEmpty, updateCollectorsDataToEmpty,} = identityTypeStore;
  const {brands, vehiclesOfInterest, brandsLoading} = storeToRefs(vehiclesOfInterestStore);
  const {fetchVehiclesOfInterest, saveVehiclesOfInterest, fetchBrands, fetchFamilies, fetchModels, fetchTypes, fetchPeriods} = vehiclesOfInterestStore;
  const {coreInfo} = storeToRefs(coreInfoStore);
  const {fetchCoreInfo, saveCoreInfo, uploadPhoto} = coreInfoStore;

  return {
    generalInfo,
    fetchGeneralInfo,
    saveGeneralInfo,
    identityTypes,
    identityTypeSchema,
    selectedIdentityTypes,
    identityTypeClubData,
    identityTypeCircuitData,
    identityTypeCollectorsData,
    updateClubDataToEmpty,
updateCircuitDataToEmpty,
updateCollectorsDataToEmpty,
    fetchIdentityTypes,
    saveIdentityTypes,
    brands,
    vehiclesOfInterest,
    brandsLoading,
    fetchBrands,
    fetchFamilies,
    fetchModels,
    fetchTypes, fetchPeriods,
    fetchVehiclesOfInterest,
    saveVehiclesOfInterest,
    coreInfo,
    fetchCoreInfo,
    saveCoreInfo,
    uploadPhoto
  }
});
