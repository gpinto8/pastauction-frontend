import { defineStore } from 'pinia';

export const updateVehicle = defineStore('updateVehicle', {
  state: () => {
    return {
      mainPicturePath: '',
      selectedVehicleData: {} as any, // When clicking on the gallery's "Select" button (or the checkbox on mobile)
      selectedImageVehicleData: {} as any, // When clicking on the gallery's image (only the admin)
    };
  },
});
