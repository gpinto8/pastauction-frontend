<script setup lang="ts">
import { defineProps, computed, ref} from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';
import deepClone from 'deep-clone'

const entityEventsStore = useEntityEventsStore();
const { entityEventCategoires } = storeToRefs(entityEventsStore);

const props = defineProps({
  isAdd: { type: Boolean },
  event: { type: Object }
});

const emit = defineEmits(['add', 'save', 'delete', 'enable', 'disable', 'duplicate']);

const internalEvent = ref<any>(deepClone(props.event));
const showDeleteDialog = ref(false);
const showEnableDialog = ref(false);
const showDisableDialog = ref(false);

const iconActive = computed(() => internalEvent.value.active ? activeIcon : inactiveIcon);

function duplicateEvent() {
  emit('duplicate', internalEvent.value);
}
function deleteEvent() {
  showDeleteDialog.value = true;
}
function addEvent() {
  emit('add', internalEvent.value);
}
function saveEvent() {
  console.log('saveEvent');
}
function resetEvent() {
  internalEvent.value = deepClone(props.event);
}
function toggleActive() {
  if (internalEvent.value.active) {
    showDisableDialog.value = true;
  } else {
    showEnableDialog.value = true;
  }
}

import activeIcon from '@/assets/icons/active_on.svg?url';
import inactiveIcon from '@/assets/icons/active_off.svg?url';
import Linguetta from './Linguetta.vue';
import DeleteEventDialog from './DeleteEventDialog.vue';
import EnableEventDialog from './EnableEventDialog.vue';
import DisableEventDialog from './DisableEventDialog.vue';
</script>

<template>
  <v-sheet>
    <v-container>
      <v-row class="subheader rounded-lg mb-4">
        <v-col :cols="2" class="d-flex align-center" v-if="!isAdd">
          <Linguetta :color="entityEventsStore.statusToColor(internalEvent.status)" :width="100" />
        </v-col>
        <v-col class="text-center d-flex align-center justify-center">
          <img :src="iconActive" class="icon-active mr-2" @click="toggleActive" v-if="!isAdd" />
          <span class="font-weight-bold" style="font-size: 18px">Event</span>
        </v-col>
        <v-col :cols="2" class="text-end" v-if="!isAdd">
          <v-btn class="mr-2" icon="mdi-file-document" color="black" density="compact" @click="duplicateEvent" />
          <v-btn icon="mdi-delete" color="red" density="compact" @click="deleteEvent" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="4" class="d-flex">
          <v-text-field class="mr-2" variant="outlined" density="compact" label="ID" :model-value="internalEvent.id" disabled v-if="!isAdd"/>
          <v-text-field variant="outlined" density="compact" label="Name" v-model="internalEvent.name" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Begin</span>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Date" type="date" v-model="internalEvent.beginDate" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Country" v-model="internalEvent.beginCountry" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="City" v-model="internalEvent.beginCity" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Address" v-model="internalEvent.beginAddress" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Longitude" v-model="internalEvent.beginLongitude" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Latitude" v-model="internalEvent.beginLatitude" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">End</span>
        </v-col>

        <v-col>
          <v-text-field variant="outlined" density="compact" label="Date" type="date" v-model="internalEvent.endDate" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Country" v-model="internalEvent.endCountry" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="City" v-model="internalEvent.endCity" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Address" v-model="internalEvent.endAddress" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Longitude" v-model="internalEvent.endLongitude" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Latitude" v-model="internalEvent.endLatitude" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Category</span>
        </v-col>
        <v-col cols="12">
          <v-checkbox class="d-inline-flex mr-4" v-for="category of entityEventCategoires" v-model="internalEvent.categories"
            :value="category.value" :label="category.label" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Event information</span>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Open day" type="date" v-model="internalEvent.openDay" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Open time" v-model="internalEvent.openTime" />
        </v-col>
        <v-col :cols="12">
          <v-textarea variant="outlined" density="compact" label="Description" v-model="internalEvent.description" />
        </v-col>
        <v-col :cols="12">
          <v-text-field variant="outlined" density="compact" label="Website" v-model="internalEvent.website" />
        </v-col>
      </v-row>

      <v-row v-if="isAdd">
        <v-col class="d-flex justify-end" :cols="12">
          <v-btn class="px-16 mr-4" color="grey" @click="resetEvent">Reset</v-btn>
          <v-btn class="px-16" color="primary" @click="addEvent">Add</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col class="d-flex justify-end" :cols="12">
          <v-btn class="px-16 mr-4" color="grey" @click="resetEvent">Reset</v-btn>
          <v-btn class="px-16" color="primary" @click="saveEvent">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

  <DeleteEventDialog v-model="showDeleteDialog" @delete="$emit('delete')" />
  <EnableEventDialog v-model="showEnableDialog" @delete="$emit('enable')" />
  <DisableEventDialog v-model="showDisableDialog" @delete="$emit('disable')" />
</template>

<style scoped>
.subheader {
  background: rgba(64, 123, 255, 0.12);
}

.icon-active {
  height: 25px;
  width: 25px;
  display: inline-block;
  cursor: pointer;
}
</style>
