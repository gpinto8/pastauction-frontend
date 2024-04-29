<script setup lang="ts">
import {defineProps, computed} from 'vue';

import { useManagingForm } from '@/composables/entity/managingForm';

const props = defineProps<{
  title: string,
  modelValue: any,
  editCallback?: () => Promise<void>,
  onStartClicked?: () => void,
  onCancelClicked?: () => void,
  onSaveClicked?: () => void
}>()
const emit = defineEmits(['update:modelValue'])

const wrappedData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const managingForm = useManagingForm(wrappedData, props.editCallback ?? (async () => {}), props.onStartClicked ?? (() => {}), props.onCancelClicked ?? (() => {}), props.onSaveClicked ?? (() => {}));
</script>

<template>
  <v-sheet>
    <v-container>
      <v-row class="subheader rounded-lg mb-4">
        <v-col>
          <span class="font-weight-bold">{{ title }}</span>
        </v-col>
        <v-col class="text-end">
          <v-btn :icon="managingForm.editBtnIcon.value" :color="managingForm.editBtnColor.value" density="compact" @click="managingForm.editBtnCallback.value" />
        </v-col>
      </v-row>

      <slot v-bind="managingForm"></slot>

      <v-row v-if="managingForm.isEditing.value">
        <v-col class="d-flex justify-end" :cols="12">
          <v-btn class="px-16" color="primary" @click="managingForm.editSave">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.subheader {
  background: rgba(64, 123, 255, 0.12);
}
</style>


