<script setup lang="ts">
import { computed} from 'vue';

import AppIcon from '@/components/common/AppIcon.vue';
const props = defineProps<{ modelValue: boolean }>();
const showDialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
});


const emit = defineEmits(['update:modelValue', 'cancel', 'delete']);

function cancel() {
  emit('update:modelValue', false);
  emit('cancel');
}
function remove() {
  emit('update:modelValue', false);
  emit('delete');
}
</script>

<template>
  <v-dialog v-model="showDialog" width="400">
    <v-sheet class="rounded-xl">
      <v-container class="pa-8">
        <v-row no-gutters class="mb-8">
          <v-col class="d-flex justify-center mb-4" :cols="12">
            <app-icon type="bin" :size="56" />
          </v-col>
          <v-col class="d-flex justify-center mb-4" :cols="12">
            <span class="text-h6 font-weight-bold">Delete event</span>
          </v-col>
          <v-col class="d-flex justify-center" :cols="12">
            <span class="text-subtitle-1 text-center">Are you sure you want to delete this event? This action cannot be undone</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn class="!bg-gray-400 text-white w-full !rounded-lg" @click="cancel" size="large">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn class="!bg-primary text-white w-full !rounded-lg" @click="remove" size="large">
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

