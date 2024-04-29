<script setup lang="ts">
import {ref, computed, defineProps} from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();
const emits = ['update:modelValue'];
const showPassword = ref(false);
const passwordInputType = computed(()=> showPassword.value ? 'text' : 'password');

const password = ref('');
const confirmPassword = ref('');
</script>

<template>
  <v-dialog v-model="props.modelValue" width="600">
    <v-card>
      <v-card-title class="d-flex justify-center my-8">
        <span class="text-h5 font-weight-bold">Enter a new password</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field variant="outlined" density="comfortable" append-inner-icon="mdi-eye"
                @click:append-inner="showPassword = !showPassword" placeholder="Enter password" label="Password*"
                :type="passwordInputType" v-model="password" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field variant="outlined" density="comfortable" append-inner-icon="mdi-eye"
                @click:append-inner="showPassword = !showPassword" placeholder="Repeat password" label="Repeat password*"
                :type="passwordInputType" v-model="confirmPassword" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="px-10 mb-8">
        <v-btn class="!bg-primary text-white w-full !rounded-lg" @click="$emit('update:modelValue', false)" size="large">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

