<script setup lang="ts">
import { defineModel} from 'vue';

import AppIcon from '@/components/common/AppIcon.vue';
const showDialog = defineModel<boolean>({ required: true })
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
            <span class="text-h6 font-weight-bold">Delete administrator</span>
          </v-col>
          <v-col class="d-flex justify-center" :cols="12">
            <span class="text-subtitle-1 text-center">Are you sure you want to delete this administrator? This action cannot be undone</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn class="!bg-gray-400 text-white w-full !rounded-lg" @click="$emit('update:modelValue', false)" size="large">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn class="!bg-primary text-white w-full !rounded-lg" @click="$emit('update:modelValue', false)" size="large">
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

