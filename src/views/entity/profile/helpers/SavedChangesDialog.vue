<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
const showDialog = defineModel<boolean>({ required: true });
</script>

<template>
  <v-dialog v-model="showDialog" width="400">
    <v-sheet class="rounded-xl">
      <v-container class="pa-8">
        <v-row no-gutters class="mb-8">
          <v-col class="d-flex justify-center mb-4" :cols="12">
            <app-icon type="success" :size="56" />
          </v-col>
          <v-col class="d-flex justify-center mb-4" :cols="12">
            <span class="text-h6 font-weight-bold">Saved changes</span>
          </v-col>
          <v-col class="d-flex justify-center" :cols="12">
            <span class="text-subtitle-1 text-center">
              Your password has been successfully changed
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              class="!bg-primary text-white w-full !rounded-lg"
              @click="$emit('update:modelValue', false)"
              size="large"
            >
              Accept
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
