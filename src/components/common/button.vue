<template>
  <v-btn
    :loading="loading || false"
    :color="variant.bgColor"
    :href="href"
    :to="to"
    class="text-none font-normal"
    :size="size"
    :disabled="disabled"
    :class="[variant.color, props.classes]"
    @click="onClick"
  >
    <slot></slot>
  </v-btn>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
type variant = 'black' | 'white';

const props = defineProps<{
  variant: variant;
  classes?: string;
  disabled?: boolean;
  size?: string;
  href?: string;
  to?: string;
  loading?: boolean;
  onClick?: (event: MouseEvent) => any;
}>();

const variants: {
  [key in variant]: {
    color: string;
    bgColor: string;
  };
} = {
  black: {
    color: 'text-white',
    bgColor: '#212529',
  },
  white: {
    color: 'text-black',
    bgColor: 'white',
  },
};

const variant = computed(() => variants[props.variant]);
</script>
