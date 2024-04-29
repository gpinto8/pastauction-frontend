<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}>();

const value = computed<typeof props.modelValue>({
  get() {
    return props.modelValue;
  },
  set(value:any) {
    emit("update:modelValue", value);
  },
});

const close = () => {
  emit("close");
};

const router = useRouter();
</script>
<template>
  <TransitionRoot appear :show="value" as="template">
    <Dialog as="div" @close="close" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 text-center"
              >
                <div class="flex">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mx-auto"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#6C757D"
                      fill-opacity="0.2"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#F4F4F4"
                      stroke-width="8"
                    />
                    <g clip-path="url(#clip0_3_207859)">
                      <path
                        d="M32.5 25C32.5 26.1935 32.0259 27.3381 31.182 28.182C30.3381 29.0259 29.1935 29.5 28 29.5C26.8065 29.5 25.6619 29.0259 24.818 28.182C23.9741 27.3381 23.5 26.1935 23.5 25C23.5 23.8065 23.9741 22.6619 24.818 21.818C25.6619 20.9741 26.8065 20.5 28 20.5C29.1935 20.5 30.3381 20.9741 31.182 21.818C32.0259 22.6619 32.5 23.8065 32.5 25Z"
                        fill="#212529"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 28C16 24.8174 17.2643 21.7652 19.5147 19.5147C21.7652 17.2643 24.8174 16 28 16C31.1826 16 34.2348 17.2643 36.4853 19.5147C38.7357 21.7652 40 24.8174 40 28C40 31.1826 38.7357 34.2348 36.4853 36.4853C34.2348 38.7357 31.1826 40 28 40C24.8174 40 21.7652 38.7357 19.5147 36.4853C17.2643 34.2348 16 31.1826 16 28ZM28 17.5C26.0227 17.5001 24.0855 18.0585 22.4116 19.111C20.7377 20.1635 19.3949 21.6673 18.5379 23.4493C17.681 25.2313 17.3446 27.219 17.5675 29.1837C17.7904 31.1485 18.5636 33.0103 19.798 34.555C20.863 32.839 23.2075 31 28 31C32.7925 31 35.1355 32.8375 36.202 34.555C37.4364 33.0103 38.2096 31.1485 38.4325 29.1837C38.6554 27.219 38.319 25.2313 37.4621 23.4493C36.6051 21.6673 35.2623 20.1635 33.5884 19.111C31.9145 18.0585 29.9773 17.5001 28 17.5Z"
                        fill="#212529"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_207859">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(16 16)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer"
                    @click="value = false"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#667085"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <div class="mt-4">Finish completing your information.</div>
              </DialogTitle>
              <div class="my-7 text-gray-500 text-sm text-center">
                Complete your account information to discover the benefits of
                Past Auction.
              </div>

              <div class="flex space-x-3">
                <UiButton @click="close" color="gray">Cancel</UiButton>

                <UiButton
                  @click="
                    () => {
                      close();
                      router.push('/user-info');
                    }
                  "
                >
                  Complete Profile
                </UiButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
