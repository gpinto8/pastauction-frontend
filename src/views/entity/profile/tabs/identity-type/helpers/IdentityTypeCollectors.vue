<script setup lang="ts">
import { computed, defineEmits } from 'vue';

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
        <span class="font-weight-bold">Collectors</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="clubTypeInfo.first_car"
          variant="underlined"
          density="compact"
          :readonly="props.readonly"
          label="First Car"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="clubTypeInfo.born_date"
          variant="underlined"
          density="compact"
          :readonly="props.readonly"
          label="Born Date"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="clubTypeInfo.age"
          variant="underlined"
          density="compact"
          :readonly="props.readonly"
          label="Age"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="clubTypeInfo.favorite"
          variant="underlined"
          density="compact"
          :readonly="props.readonly"
          label="Favorite"
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
