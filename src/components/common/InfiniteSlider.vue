<template>
    <render />
</template>
<script setup lang="ts">
import { computed, h, defineProps, useSlots } from "vue";

const slots = useSlots()

const props = defineProps<{
    barStyle: Object,
    duration?: {
        type: string
    },
    direction?: {
        type: string
    },
    delay?: {
        type: string
    },
    paused?: {
        type: boolean
    }
}>()

const customStyle = computed(() => {
    return {
        ...props.barStyle,
        'animation-duration': props.duration ? props.duration.type : '30s',
        'animation-direction': props.direction ? props.direction.type : 'normal',
        'animation-delay': props.delay ? props.delay.type : '0s',
        'animation-play-state': (props.paused && props.paused.type) ? 'paused' : 'running'
    }
})

const render = () => {
    // @ts-ignore
    const bar = h('div', { class: 'vifnslb-bar' }, slots.default())
    const slider = h('div', { class: 'vifnslb-element', style: customStyle.value }, [bar, bar])
    return h('div', { class: 'vifnslb-container' }, [slider])
}
</script>

<style>
@keyframes moveSlideshow {
    100% {
        transform: translateX(-50%);
    }
}

.vifnslb-container {
    width: 100%;
    overflow: hidden;
}

.vifnslb-element {
    transform: translate3d(0, 0, 0);
    /* Hey browser, please use my GPU */
    position: relative;
    overflow: hidden;
    animation-name: moveSlideshow;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    display: flex;
    width: max-content;
    min-width: 200%;
}

.vifnslb-bar {
    width: 50%;
}
</style>