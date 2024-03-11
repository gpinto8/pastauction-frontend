<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps<{
  modelValue: any,
  readonly: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const clubTypeInfo = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <v-container class="elevation-1 rounded-lg">
    <v-row class="subheader rounded-lg">
      <v-col>
        <span class="font-weight-bold">Owner's club</span>
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club type" v-model="clubTypeInfo.type"
          :readonly="readonly" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club annual fee"
          v-model="clubTypeInfo.annual_fee" :readonly="readonly" />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club annual fee currency"
          v-model="clubTypeInfo.annual_fee_currency" :readonly="readonly" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club total associates"
          v-model="clubTypeInfo.total_associates" :readonly="readonly" />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club specific model"
          v-model="clubTypeInfo.specific_models" :readonly="readonly" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club models" v-model="clubTypeInfo.models"
          :readonly="readonly" />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club speciality"
          v-model="clubTypeInfo.specific_models" :readonly="readonly" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club activities"
          v-model="clubTypeInfo.activities" :readonly="readonly" />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club affiliation"
          v-model="clubTypeInfo.affiliation" :readonly="readonly" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club event year number"
          v-model="clubTypeInfo.event_year_number" :readonly="readonly" />
      </v-col>
      <v-col>
        <v-text-field variant="underlined" density="compact" label="Club membership restriction"
          v-model="clubTypeInfo.membership_restriction" :readonly="readonly" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.subheader {
  background: #eee073a3;
}
</style>

