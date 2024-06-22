<script setup lang="ts" generic="T">
import AppIcon from '@/components/common/AppIcon.vue';
import { computed, defineModel, ref, watch } from "vue";

// Definisci le proprietà del componente
const props = withDefaults(defineProps<{
	selected: T,
  placeholder?: string,
  items: T[],
	filterFN?(item: any, searchQuery: string): boolean, 
	formatItemFN?(item: any): string, 
	isLoading?: boolean;
	variant?: "dotted" | "primary",
	placeholderColor?: "white" | "#ADB5BD" | "black",
	useOptionSearchFeature?: boolean,
	disabled?: boolean,
}>(), {
	variant: "primary",
	useOptionSearchFeature: true,
});
// const selected = defineModel<T>("selected");

const emit = defineEmits<{
	(e: 'change', newValue: T): void
}>();


const searchQuery = ref('');
const isOpen = ref(false);
const selectOptionsContainerRef = ref<HTMLElement>();

/** used to store event listeners that will listen for document clicks to close the select component, only one click listeners needs to exists at once */
const closeSelectListener = ref<any>();

// when the select component opens, we add an event listener to close the menu if an event ocurs anywhere in the page
watch(isOpen, ()=>{
	if(closeSelectListener.value) document.removeEventListener("click", closeSelectListener.value);
	if(isOpen.value){
		setTimeout(()=>{
			closeSelectListener.value = (event: Event)=>{
				if(!selectOptionsContainerRef.value?.contains(event.currentTarget as Node)) isOpen.value = false;
			};
			document.addEventListener("click", closeSelectListener.value, {once: true});
		}, 200)
	}
});

const filteredItems = computed(()=>{
	if(props.filterFN) return props.items?.filter(e=> props.filterFN!(e, searchQuery.value)) || [];
	return props.items?.filter(e=>(e + '').toLowerCase().includes(searchQuery.value.toLowerCase())) || [];
});

function formatItem(item: any){
	return props.formatItemFN ? props.formatItemFN(item as any) : (item + '')
}

const placeholderIsDisplayed = computed(() => {
	return !props.selected;
});

</script>

<template>
    <div
			class="rounded-lg bg-slate-100 pr-2 flex gap-2 items-center justify-between duration-100 cursor-pointer overflow-visible relative border-[1px] border-[#CED4DA] whitespace-nowrap lg:h-[36px]"
			:class="{
				'!cursor-not-allowed !bg-zinc-100': disabled,
				'hover:opacity-90': !isOpen,
				'z-10': isOpen,
				'outline-dotted': variant === 'dotted' || !variant,
				'': variant === 'primary' || !variant,
			}"
			@click="!disabled ? isOpen = !isOpen : void 0"
		>
			<span
				class="p-2"
				:class="{
					'text-gray-400': placeholderIsDisplayed && !placeholderColor,
					'text-white': placeholderIsDisplayed && placeholderColor === 'white',
					'text-black': placeholderIsDisplayed && placeholderColor === 'black',
					'text-[#ADB5BD]': placeholderIsDisplayed && placeholderColor === '#ADB5BD',
				}"
			>
				{{formatItem(selected) || placeholder || 'Select a value'}}
			</span>
      <app-icon :class="{'rotate-180': isOpen, 'text-white': placeholderIsDisplayed && placeholderColor === 'white'}" type="small_arr_down" size="sm"></app-icon>

			<div @click.stop="" ref=selectOptionsContainerRef v-if="isOpen" class="absolute  mt-1 min-w-full w-fit top-full left-0 rounded-lg border-2 p-2 border-gray-300 flex flex-col gap-2 bg-white">
				<div v-if="useOptionSearchFeature" class="flex bg-white flex-row gap-2 pb-1 border-b-[1px] items-center border-gray-300">
					<app-icon class="text-gray-500" type="search"  size="sm"></app-icon>
					<input v-model="searchQuery" class="w-full outline-none" type="text">
				</div>
				<div class="max-h-64 overflow-y-auto flex flex-col gap-1">
					<!-- <div @click.stop="selected = item as any; isOpen = false; emit('change', item)" class="hover:bg-gray-200 px-1 rounded-sm font-thin tracking-wide" v-for="item of filteredItems">{{formatItemFN ? formatItemFN(item) : (item + '')}}</div> -->
					<div v-for="item of filteredItems" @click.stop="isOpen = false; if(item !== selected) emit('change', item);" class="hover:bg-gray-200 flex items-center px-1 rounded-sm font-thin tracking-wide" :class="{'bg-zinc-200 cursor-default': item === selected}">
						<app-icon v-if="item === selected" type="simple-check" size="20" class="text-black" />
						{{formatItem(item)}}
					</div>
				</div>
				<!-- <div v-if="searchQuery && !filteredItems?.length" @click="isOpen = false; selected = searchQuery as any; searchQuery = '';" class="text-ceter pb-1 px-1 rounded-lg bg-sky-100"><span class="text-gray-400 font-thin">use</span> {{ searchQuery }}</div> -->
				<div v-if="searchQuery && !filteredItems?.length" @click="isOpen = false;  emit('change', searchQuery as any); searchQuery = '';" class="text-ceter pb-1 px-1 rounded-lg bg-sky-100"><span class="text-gray-400 font-thin">use</span> {{ searchQuery }}</div>
				<div v-if="!filteredItems?.length && !isLoading" class="text-gray-400 text-center">no results found</div>
				<div v-if="isLoading" role="status" class="mx-auto">
						<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg>
						<span class="sr-only">Loading...</span>
				</div>
			</div>
    </div>
    <!-- Aggiungi qui il tuo codice per visualizzare i dati del productList -->
</template>
