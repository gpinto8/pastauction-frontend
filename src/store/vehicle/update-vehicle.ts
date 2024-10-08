import { defineStore } from 'pinia';

export const updateVehicle = defineStore('updateVehicle', {
  state: () => {
    return {
      parametersResponseData: {} as any,
    };
  },
});
