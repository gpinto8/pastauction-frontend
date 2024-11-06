import { defineStore } from 'pinia';

type Modes = 'single' | 'multiple';
type State = {
  galleryMode: Modes;
  selectionMode: Modes;
};

export const colorUpdate = defineStore('colorUpdate', {
  state: (): State => {
    return {
      galleryMode: 'single',
      selectionMode: 'single',
    };
  },
});
