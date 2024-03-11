<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useEntityStore } from '@/store/entity';

const props = defineProps<{
  vehicle: any;
  isEditing: boolean;
  editInputDisabled: boolean;
  isAddMode: boolean;
}>();

const entityStore = useEntityStore();
const { brands, brandsLoading } = storeToRefs(entityStore);
const { fetchFamilies, fetchModels } = entityStore;

const inputVariant = computed(() => props.isAddMode ? 'outlined' : 'underlined');
const buttonIcon = computed(() => props.isAddMode ? 'mdi-plus' : 'mdi-close');
const buttonColor = computed(() => props.isAddMode ? 'primary' : 'error');

const families = ref<string[]>([]);
const models = ref<string[]>([]);

const brand = computed(() => props.vehicle.brand);
const family = computed(() => props.vehicle.family);

const familyLoading = ref(false);
const modelLoading = ref(false);

async function assignFamilies() {
    if (brand.value) {
        try {
            familyLoading.value = true;
            families.value = await fetchFamilies(brand.value);
        } finally {
            familyLoading.value = false;
        
        }
    }
}
async function assignModels() {
    if (family.value) {
        try {
            modelLoading.value = true;
            models.value = await fetchModels(family.value);
        } finally {
            modelLoading.value = false;
        }
    }
}

watch(brand, async () => {
    props.vehicle.family = '';
    await assignFamilies();
});
watch(family, async () => {
    props.vehicle.model = '';
  await assignModels();
});

async function initialization() {
    await Promise.all([assignFamilies(), assignModels()]);
}
initialization();
</script>

<template>
    <v-row align="center">
        <v-col>
            <v-autocomplete hide-details :variant="inputVariant" density="compact" v-model="vehicle.brand"
                :items="brands" :readonly="editInputDisabled" :loading="brandsLoading" placeholder="Brand" />
        </v-col>
        <v-col>
            <v-autocomplete hide-details :variant="inputVariant" density="compact" v-model="vehicle.family"
                :items="families" :readonly="editInputDisabled" :loading="familyLoading" placeholder="Family" />
        </v-col>
        <v-col>
            <v-autocomplete hide-details :variant="inputVariant" density="compact" v-model="vehicle.model"
                :items="models" :readonly="editInputDisabled" :loading="modelLoading" placeholder="Model" />
        </v-col>
        <v-col>
            <v-text-field hide-details :variant="inputVariant" density="compact" v-model="vehicle.type"
                :readonly="editInputDisabled" placeholder="Type" />
        </v-col>
        <v-col>
            <v-text-field hide-details :variant="inputVariant" density="compact" v-model="vehicle.period"
                :readonly="editInputDisabled" placeholder="Period" />
        </v-col>
        <v-col :cols="1">
            <v-checkbox class="d-flex justify-center" hide-details width="auto" density="compact"
                v-model="vehicle.active" :readonly="editInputDisabled" />
        </v-col>
        <v-col class="d-flex justify-center" v-if="isEditing" :cols="1">
            <v-btn :icon="buttonIcon" :color="buttonColor" density="compact" @click="$emit('buttonClicked')" />
        </v-col>
    </v-row>
</template>
