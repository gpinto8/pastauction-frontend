<script setup lang="ts">
const props = defineProps<{
  title: string
}>();
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-center">
            <span class="text-h5 font-weight-bold">{{ title }}</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot></slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

