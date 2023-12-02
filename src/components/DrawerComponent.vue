<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue';
</script>

<template>
  <v-list-item nav class="p-4">
    <v-img src="@/assets/images/logo.svg" alt="Logo" />

    <template #append>
      <v-btn variant="text" icon="mdi-chevron-left" />
    </template>
  </v-list-item>

  <v-list density="compact" nav class="space-y-4 px-6">
    <v-list-item
      title="Home"
      value="home"
      link
      to="/home"
      class="text-white"
      active-class="bg-[#0D6EFD]"
    >
      <template #prepend>
        <app-icon type="home" class="block mr-4" />
      </template>
    </v-list-item>
    <v-list-item
      title="Datas"
      value="datas"
      link
      to="/datas"
      class="text-white"
      active-class="bg-[#0D6EFD]"
    >
      <template #prepend>
        <app-icon type="datas" class="block mr-4" />
      </template>
    </v-list-item>
    <v-list-item
      title="Garage"
      value="garage"
      link
      to="/garage"
      class="text-white"
      active-class="bg-[#0D6EFD]"
    >
      <template #prepend>
        <app-icon type="garage" class="block mr-4" />
      </template>
    </v-list-item>
    <v-list-item
      title="Charts"
      value="charts"
      link
      to="/charts"
      class="text-white"
      active-class="bg-[#0D6EFD]"
    >
      <template #prepend>
        <app-icon type="chart" class="block mr-4" />
      </template>
    </v-list-item>
    <v-list-item
      title="Locate"
      value="locate"
      link
      to="/locate"
      class="text-white"
      active-class="bg-[#0D6EFD]"
    >
      <template #prepend>
        <app-icon type="locate" class="block mr-4" />
      </template>
    </v-list-item>
    <v-list-item
      title="Wallet"
      value="wallet"
      link
      to="/wallet"
      class="text-white"
      active-class="bg-[#0D6EFD]"
    >
      <template #prepend>
        <app-icon type="wallet" class="block mr-4" />
      </template>
    </v-list-item>
  </v-list>
</template>
