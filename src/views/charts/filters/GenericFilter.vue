<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    filterName: string
}>()
const toggle = ref(false)

</script>

<template>
    <div class="flex flex-col sm:flex-row">
        <div class="custom-chip mr-3 align-self-start flex px-2">
            <div class="flex-1 flex-center">{{ filterName }}</div>
            <div class="sm:hidden">
                <img src="@/assets/icons/arrow_with_base.svg" type="arrow_with_base" class="transition-transform duration-500" style="width: 100%" :class="toggle == true ? 'rotate-180' : 'rotate-0'" @click="toggle = !toggle"/>
            </div> 
        </div>
        <div class="grid sm:block grid-rows-[0fr] transition-[grid-template-rows] duration-500" :class="toggle ? 'grid-rows-[1fr]' : ''">
            <div class="flex flex-col overflow-hidden">
                <slot></slot>
            </div>
        </div>
    </div>
</template>