<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('profile');
const tabs = ref([
  {
    name: 'profile',
    label: 'Profile',
    to: './profile'
  },
  {
    name: 'administration',
    label: 'Administration',
    to: './administration'
  },
  {
    name: 'services',
    label: 'Services',
    to: './services'
  },
  {
    name: 'events',
    label: 'Events',
    to: { name: 'EntityEvents' }
  },
  {
    name: 'requests',
    label: 'Requests',
    to: './requests'
  }
]);
</script> 

<template>
  <div class="my-4">
    <v-tabs v-model="tab" bg-color="transparent">
      <v-tab v-for="(value, key) in tabs" :key="key" :to="value.to">{{ value.label }}</v-tab>
    </v-tabs>

    <router-view />
  </div>
</template>


