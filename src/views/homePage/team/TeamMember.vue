<script setup lang="ts">
import type { TeamMember } from '@/api/landingPage/team';
import AppIcon from '@/components/common/AppIcon.vue';
import { ref } from 'vue';

const props = defineProps<{
    teamMember: TeamMember
}>()

const selected = ref(false)

</script>

<template>
    <div class="flex flex-col justify-between group relative duration-[500ms] [&_*]:duration-[500ms] h-[20rem]">
        <div class="absolute absolute-center w-full max-h-full h-full">
            <div class="flex flex-col min-h-0 items-center">
                <img :src="teamMember.media_path || ''" :class="selected == false ? 'w-52 mt-0 ' : '-m-10 w-16'"
                    :style="{ transform: selected == false ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
                <div class="h-[100px]"></div>
            </div>
        </div>
        <!-- Shadow -->
        <div class="flex flex-col bg-white h-full">
            <div class="" :class="selected == false ? 'h-[80%] mt-0' : 'h-[0%] mt-7'">

            </div>
            <Transition name="fade" mode="out-in">
                <div v-if="selected == false"
                    class="flex flex-col [&>*]:flex first:[&>*>div]:w-16 last:[&>*>div]:text-zinc-600 text-sm p-5">
                    <div class="">
                        <div>Name: </div>
                        <div>{{ teamMember.name }}</div>
                    </div>
                    <div class="">
                        <div>Role: </div>
                        <div>{{ teamMember.role }}</div>
                    </div>
                    <div class="">
                        <div>Country: </div>
                        <div>{{ teamMember.country }}</div>
                    </div>
                </div>
                <div v-else class="flex min-h-0 flex-col items-center grow-0 z-20">
                    <div class="text-zinc-600 text-sm flex flex-col items-center">
                        <div>{{ teamMember.name }}</div>
                        <div>{{ teamMember.role }}</div>
                    </div>
                    <div class="flex-1 min-h-0 overflow-y-scroll px-5">
                        {{ teamMember.description }}
                    </div>
                </div>
            </Transition>

        </div>
        <button>
            <AppIcon type="arrow_up" class="rotate-90 text-zinc-600 absolute bottom-5 right-5"
                @click="selected = !selected" />
        </button>
    </div>
</template>

<style>
.team-member-enter-active,
.team-member-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.team-member-enter-from,
.team-member-leave-to {
    opacity: 0;
    transform: rotateY(360deg);
}

.team-member-enter-to,
.team-member-leave-from {
    opacity: 1;
    transform: rotateY(0deg);
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>