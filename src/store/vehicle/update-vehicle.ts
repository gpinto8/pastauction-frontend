import { defineStore } from 'pinia';

export const updateVehicle = defineStore('updateVehicle', {
  state: () => {
    return {
      currentVehicleData: {} as any, // The data related to the vehicle id, so the first one
      mainPicturePath: '',
      selectedVehicleData: {} as any, // When clicking on the gallery's "Select" button (or the checkbox on mobile)
      selectedImageVehicleData: {} as any, // When clicking on the gallery's image (only the admin)
      selectedColor: { id: 0, name: '', hex_code: '', id_family: 0 },
      selectedSubColor: { id: 0, name: '', hex_code: '', id_family: 0 },
      selectedAttribute: [] as string[],
      selectedSubBodies: [] as string[],
      notesInput: '',
      suggestedData: [
        { label: 'Family', value: '' },
        { label: 'Model', value: '' },
        { label: 'Stage', value: '' },
        { label: 'Series', value: '' },
        { label: 'Year', value: '', disabled: true },
        { label: 'Chasis', value: '', disabled: true },
        { label: 'Body', value: '' },
        { label: 'Color', value: '' },
        { label: 'Attribute', value: '' },
      ],
    };
  },
});
