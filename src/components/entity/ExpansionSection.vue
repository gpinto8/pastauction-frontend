<script setup lang="ts">
const props = defineProps<{
  title?: string;
  panelClass?: string;
  titleClass?: string;
  hideActions?: boolean;
  forceOpen?: number; // 0 - open | 1 - close
  disabled?: boolean;
}>();

defineEmits(['clickTitle']);
</script>

<template>
  <v-expansion-panels
    v-model="props.forceOpen"
    :disabled="disabled"
    @click="$emit('clickTitle')"
  >
    <v-expansion-panel :class="panelClass">
      <v-expansion-panel-title
        expand-icon="mdi-plus"
        collapse-icon="mdi-minus"
        :class="titleClass"
        :hide-actions="!!hideActions"
      >
        <slot name="title"></slot>
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-between">
            <span class="text-h5 font-weight-bold">
              {{ title }}
            </span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot></slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
