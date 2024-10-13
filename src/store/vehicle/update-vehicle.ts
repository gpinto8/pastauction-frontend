import { defineStore } from 'pinia';

export const updateVehicle = defineStore('updateVehicle', {
  state: () => {
    return {
      mainPicturePath: '',
      parametersResponseData: {} as any,
    };
  },
});
