<script setup lang="ts">
import { getTeamMembers } from '@/api/landingPage/landingPage';
import type { TeamMember as TeamMemberType } from '@/api/landingPage/team';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Footer from '../Footer.vue';
import Header from '../Header.vue';
import TeamMember from './TeamMember.vue';
import AppIcon from '@/components/common/AppIcon.vue';

const router = useRouter()

const teamMembers = ref<TeamMemberType[]>([])

getTeamMembers()
    .then(response => {
        console.log(response);
        teamMembers.value = response.data.items
        teamMembers.value = teamMembers.value.filter(member => member.active == true && member.name != 'Leonardo')
    })

</script>

<template>
    <div class="flex flex-col relative bg-slate-500 min-h-screen">
        <Header class="w-full" />
        <div class="flex flex-col text-white px-14">
            <div>
                <div class="h-fit w-fit scale-150 mt-24" @click="router.go(-1)">
                    <AppIcon type="arrow_up" class="-rotate-90" />
                </div>
            </div>
            <div class="text-5xl cormorant-custom-500 mt-10 mb-6">
                Team
            </div>
            <div class="text-xl w-3/4">
                We are pleased to introduce you to our team of specialists who worked to make this possible
            </div>
            <div class="grid grid-cols-4 gap-7 mt-10 items-center ">
                <TeamMember v-for="team of teamMembers" :teamMember="team" class="w-[275px] place-self-center" />
            </div>
        </div>
        <Footer />
    </div>
</template>