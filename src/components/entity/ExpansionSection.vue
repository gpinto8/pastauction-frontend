<script setup lang="ts">
const props = defineProps<{
  title: string;
  hideTitle?: boolean;
  panelClass?: string;
  titleClass?: string;
}>();

const emit = defineEmits(['onSelected']);

const handleSelected = (event: any) => {
  console.log({ event });
  emit('onSelected', event.value);
};
</script>

<template>
  <v-expansion-panels
  >
    <v-expansion-panel :class="panelClass" @group:selected="handleSelected">
      <v-expansion-panel-title
        expand-icon="mdi-plus"
        collapse-icon="mdi-minus"
        :class="titleClass"
      >
        <v-row no-gutters>
          <slot name="title"></slot>
          <v-col v-if="!hideTitle" cols="12" class="d-flex justify-between">
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

