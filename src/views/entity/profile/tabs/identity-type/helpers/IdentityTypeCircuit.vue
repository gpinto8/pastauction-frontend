<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any;
  readonly: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const clubTypeInfo = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<template>
  <v-container class="elevation-1 rounded-lg">
    <v-row class="subheader rounded-lg">
      <v-col>
        <span class="font-weight-bold">Circuit</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="clubTypeInfo.map_url"
          variant="underlined"
          density="compact"
          :readonly="props.readonly"
          label="Map URL"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="clubTypeInfo.distance"
          variant="underlined"
          density="compact"
          :readonly="props.readonly"
          label="Distance"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.subheader {
  background: #eee073a3;
}
</style>
