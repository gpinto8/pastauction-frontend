<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import useDetectOutsideClick from "@/composables/useDetectOutsideClick";
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  modelValue: any;
  items: any;
  search: string;
  updated?: boolean;
  label?: string;
  emptySelected?: string;
  maxLength?: number;
}>();

const opened = ref(false);
const inputEl = ref(null);
const listRef = ref();

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "search", value: string): void;
  (e: "click"): void;
  (e: "onOpen"): void;
  (e: "onClose"): void;
}>();

const value = computed<typeof props.modelValue>({
  get() {
    return props.modelValue || undefined;
  },
  set(value: any) {
    emit("update:modelValue", value);
  },
});

const search = computed({
  get() {
    return props.search;
  },
  set(value: string) {
    emit("search", value);
  },
});

const filteredList = computed<typeof props.items>(() => {
  if (props.items?.length > 0)
    return props.items.filter(({ name }) =>
      name.toLowerCase().includes(props.search?.toLowerCase())
    );
  else return [];
});

const isSelected = (item: any) => {
  if (props.modelValue) return props.modelValue === item;
  else return false;
};

const valueClickHandler = () => {
  opened.value = !opened.value;
  if (opened.value) emit("onOpen");
};

const updateVal = (item: any) => {
  value.value = item;
  emit("click");
  opened.value = !opened.value;
};

useDetectOutsideClick(listRef, () => {
  opened.value = false;
  emit("onClose");
});
</script>
<template>
  <div ref="listRef">
    <label v-if="label">{{ label }}</label>
    <div class="relative mt-1">
      <div
        class="relative flex items-center w-full h-8 cursor-default bg-white text-left focus:border-black focus:outline-none text-sm"
      >
        <span
          v-if="!opened"
          class="bg-gray-white appearance-none border shadow-md border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
          @click="valueClickHandler"
        >
          <span v-if="modelValue?.name">
            {{ modelValue.name }}
            <span v-if="updated" class="text-orange-600">✲</span>
          </span>
          <span v-else>{{ emptySelected }}</span>
        </span>
        <ui-input
          v-else
          v-model="search"
          type="text"
          ref="inputEl"
          class="w-full"
          placeholder="Cerca..."
        >
        </ui-input>

        <span
          class="hover:cursor-pointer absolute inset-y-0 right-0 ml-3 flex items-center"
          @click="valueClickHandler"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </div>

      <ul
        v-if="opened"
        class="list"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          v-for="item in filteredList"
          :key="item._id"
          class="list-item"
          id="listbox-option-0"
          role="option"
          @click="updateVal(item)"
        >
          <span
            class="font-normal block truncate"
            :class="{ 'text-blue-500': isSelected(item) }"
          >
            {{ item.name }}
          </span>
        </li>
        <li
          v-if="!filteredList.length"
          class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
        >
          <span class="font-normal block truncate"
            >Nessun elemento trovato</span
          >
        </li>
        <slot name="list-footer" />
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
.list {
  @apply absolute border-t rounded-md z-10 max-h-64 mt-3 w-full overflow-auto bg-white text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm border-x;
}

.list-item {
  @apply text-gray-800 relative cursor-default select-none py-3 pl-3 border-b border-gray-300 hover:cursor-pointer hover:text-blue-500;
}
</style>
