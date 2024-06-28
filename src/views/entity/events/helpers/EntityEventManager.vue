<script setup lang="ts">
import { defineProps, computed, ref} from 'vue';
import { storeToRefs } from 'pinia';
import { useEntityEventsStore } from '@/store/entity/events';
import deepClone from 'deep-clone'
import config from '@/config';

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

const iconActive = computed(() => internalEvent.value.disabled ? inactiveIcon :  activeIcon);

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
  emit('save', internalEvent.value);
}
function resetEvent() {
  internalEvent.value = deepClone(props.event);
}
function toggleActive() {
  if (!internalEvent.value.disabled) {
    showDisableDialog.value = true;
  } else {
    showEnableDialog.value = true;
  }
}

async function updateLogoCallback(value: any) {
  const url = await entityEventsStore.uploadLogo(value, internalEvent.value.id_key);
  internalEvent.value.event_logo = url;
}

async function updateMainPhotoCallback(value: any) {
  const url = await entityEventsStore.uploadMainPhoto(value, internalEvent.value.id_key);
  internalEvent.value.main_photo = url;
}

const apiUrl = ref(config.apiUrl);

import activeIcon from '@/assets/icons/active_on.svg?url';
import inactiveIcon from '@/assets/icons/active_off.svg?url';
import Linguetta from './Linguetta.vue';

import BtnFileInput from '@/components/common/BtnFileInput.vue';
import DeleteEventDialog from './DeleteEventDialog.vue';
import EnableEventDialog from './EnableEventDialog.vue';
import DisableEventDialog from './DisableEventDialog.vue';
</script>

<template>
  <v-sheet>
    <v-container>
      <v-row class="subheader rounded-lg mb-4">
        <v-col :cols="2" class="d-flex align-center" v-if="!isAdd">
          <Linguetta :color="entityEventsStore.statusToColor(entityEventsStore.getStatusFromEvent(internalEvent))"
            :width="100" />
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
          <v-text-field class="mr-2" variant="outlined" density="compact" label="ID" :model-value="internalEvent.id_key"
            disabled v-if="!isAdd" />
          <v-text-field variant="outlined" density="compact" label="Name" v-model="internalEvent.name" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Begin</span>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Date" type="date"
            v-model="internalEvent.begin_date" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Country" v-model="internalEvent.begin_country" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="City" v-model="internalEvent.begin_city" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Address" v-model="internalEvent.begin_address" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Longitude" v-model="internalEvent.begin_lon" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Latitude" v-model="internalEvent.begin_lat" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">End</span>
        </v-col>

        <v-col>
          <v-text-field variant="outlined" density="compact" label="Date" type="date"
            v-model="internalEvent.date_end" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Country" v-model="internalEvent.end_country" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="City" v-model="internalEvent.end_address" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Address" v-model="internalEvent.end_city" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Longitude" v-model="internalEvent.end_lat" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Latitude" v-model="internalEvent.end_lon" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Category</span>
        </v-col>
        <v-col cols="12">
          <v-checkbox class="d-inline-flex mr-4" v-for="category of entityEventCategoires"
            v-model="internalEvent.event_type" :value="category.value" :label="category.label" />
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Event information</span>
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Open day" type="date"
            v-model="internalEvent.openDay" />
        </v-col>
        <v-col>
          <v-text-field variant="outlined" density="compact" label="Open time"
            v-model="internalEvent.entity_opening_descr" />
        </v-col>
        <v-col :cols="12">
          <v-textarea variant="outlined" density="compact" label="Description" v-model="internalEvent.description" />
        </v-col>
        <v-col :cols="12">
          <v-text-field variant="outlined" density="compact" label="Website" v-model="internalEvent.website" />
        </v-col>
      </v-row>



      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Main photo</span>
        </v-col>
        <v-col>
          <div class="d-flex align-center flex-column" style="width: 230px">
            <img class="mb-4" :src="`${apiUrl}/photo/${internalEvent.main_photo}`" width="230" v-if="internalEvent.main_photo"/>
            <BtnFileInput @selected="updateMainPhotoCallback" v-if="!isAdd">
              <template #activator="{ activate }">
                <v-btn class="ml-0 mx-2" color="primary" @click="activate">{{
                  internalEvent.main_photo ? 'Change photo' : 'Add photo'
                  }}</v-btn>
              </template>
            </BtnFileInput>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col :cols="12">
          <span class="font-weight-bold">Event logo</span>
        </v-col>
        <v-col>
          <div class="d-flex align-center flex-column" style="width: 230px">
            <img class="mb-4" :src="`${apiUrl}/photo/${internalEvent.event_logo}`" width="230"
              v-if="internalEvent.event_logo" />
            <BtnFileInput @selected="updateLogoCallback" v-if="!isAdd">
              <template #activator="{ activate }">
                <v-btn class="ml-0 mx-2" color="primary" @click="activate">{{
                  internalEvent.event_logo ? 'Change photo' : 'Add photo'
                  }}</v-btn>
              </template>
            </BtnFileInput>
          </div>
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
  <EnableEventDialog v-model="showEnableDialog" @enable="$emit('enable')" />
  <DisableEventDialog v-model="showDisableDialog" @disable="$emit('disable')" />
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
