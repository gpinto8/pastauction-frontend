import { defineStore } from 'pinia';

export const updateVehicle = defineStore('updateVehicle', {
  state: () => {
    return {
      mainPicturePath: '',
      selectedVehicleData: {} as any,
    };
  },
});
