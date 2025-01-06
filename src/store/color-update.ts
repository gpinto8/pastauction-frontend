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
    key: 'colorfamily_name' | 'color_main_name' | 'color_roof_name';
    label: string;
    value: string;
    selected: boolean;
    clicked?: boolean; // Created to fix a problem in which, when selecting and deselecting the checkbox, the color changed .. (because the "selected" prop is inside an object and whenever we update that value, the whole object updates ..)
  }[];
  selectedColorFromGallery: ColorProps;
  filterMissingColorKeys: string[]
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
          key: 'colorfamily_name',
          label: 'Main color:',
          value: '',
          selected: true,
          clicked: false,
        },
        {
          key: 'color_main_name',
          label: 'Bicolor:',
          value: '',
          selected: false,
          clicked: false,
        },
        {
          key: 'color_roof_name',
          label: 'Top color:',
          value: '',
          selected: false,
          clicked: false,
        },
      ],
      selectedColorFromGallery: { hex_code: '', id: 0, id_family: 0, name: '' },
      filterMissingColorKeys: [],
    };
  },
});
