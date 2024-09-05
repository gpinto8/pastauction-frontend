import { useGeneralStore } from '@/store/datas/general'
import { ref } from 'vue'

export class MediaStore {
  constructor(
    public map = ref<Record<string, string>>({}),
    private store = useGeneralStore(),
  ) {}

  async loadMedia (resource: string, id = resource) {
    if (resource && resource !== 'string') {
      await this.store.loadMedia(resource).then(res => {
        this.map.value[id] = res as string
      })
    }
  }
}