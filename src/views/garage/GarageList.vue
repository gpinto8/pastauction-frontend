<script setup lang="ts">
import { ref, mergeProps } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '@/store/garage';

import { useGeneralStore } from '@/store/datas/general';
import { watch } from 'vue';
import { onBeforeMount } from 'vue';

const props = defineProps<{
  order: Record<string, string>;
}>();

/** Store */
const store = useGarageStore();
const generalStore = useGeneralStore();

/** Router */
const router = useRouter();

const loadedMedia = ref<Record<string, string>>({});

/** Methods */
function loadGarage() {
  store.listPaginated(1, 10, {}, props.order).then(() => {
    store.getListItems?.items?.forEach((item: any) =>
      loadMedia(item.id, item.photo)
    );
  });
}
watch(() => props.order, loadGarage);
onBeforeMount(loadGarage);

const loadMedia = async (id: number, resource: string) => {
  if (resource && resource !== 'string') {
    await generalStore.loadMedia(resource).then(res => {
      loadedMedia.value[id] = res as string;
    });
  }
};
</script>

<template>
  <div
    v-if="store.getListItems?.items?.length"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
  >
    <router-link
      v-for="item in store.getListItems?.items"
      :key="item.id"
      :to="`/garage/detail/${item.id}`"
    >
      <v-card class="mx-auto h-full">
        <v-img
          class="align-end text-white"
          height="200"
          :src="loadedMedia[item.id] || 'src/assets/images/img-1.png'"
          cover
        />
        <v-card-title class="pt-4">{{ item.name }}</v-card-title>

        <v-card-text class="text-[#5E5E5E]">
          <div>{{ item.description }}</div>

          <ul class="list-disc mt-4 pl-4">
            <li>
              Number of vehicles:
              <b>{{ item.vehicle_capacity || 0 }}</b>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </router-link>
  </div>
  <div v-else class="card space-y-4 text-center mt-10">
    <div class="text-grey">You don't have any Garage yet.</div>
    <div>
      <v-btn
        color="#212529"
        class="text-white text-none font-normal w-[200px]"
        @click="router.push('garage/create_garage')"
      >
        Add Garage
      </v-btn>
    </div>
  </div>
</template>
