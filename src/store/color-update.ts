import type { ColorProps } from '@/views/update-vehicle/ColorMainNuance.vue';
import { defineStore } from 'pinia';

type Modes = 'single' | 'multiple';
type State = {
  galleryMode: Modes;
  selectionMode: Modes;
  selectingHexColor: boolean;
  selectedHexColor: string;
  selectedGalleryImageWholePath: string;
  selectedPickColors: {
    key: 'color_main_name' | 'color_sec_name' | 'color_roof_name';
    label: string;
    value: string;
    selected: boolean;
  }[];
  selectedColorFromGallery: ColorProps;
};

export const colorUpdate = defineStore('colorUpdate', {
  state: (): State => {
    return {
      galleryMode: 'single',
      selectionMode: 'single',
      selectingHexColor: false,
      selectedHexColor: '',
      selectedGalleryImageWholePath: '', // When clicking on the gallery's image (only the admin),
      selectedPickColors: [
        {
          key: 'color_main_name',
          label: 'Main color:',
          value: '',
          selected: true,
        },
        {
          key: 'color_sec_name',
          label: 'Bicolor:',
          value: '',
          selected: true,
        },
        {
          key: 'color_roof_name',
          label: 'Top color:',
          value: '',
          selected: true,
        },
      ],
      selectedColorFromGallery: { hex_code: '', id: 0, id_family: 0, name: '' },
    };
  },
});
