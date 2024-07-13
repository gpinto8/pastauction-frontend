<script setup lang="ts">
// Import
import Button from '@/components/common/button.vue';
import { ref, computed } from 'vue';

// Variables
const activeCollapse = ref<number | null>(null);
const selectAll = ref(false);
const selectedItems = ref([...Array(8)].map(() => false));
// Variabili di stato
const modalOpen = ref(false);
const showSecondModalContent = ref(false);

// Function
const toggleCollapse = (i: number) => {
  activeCollapse.value = activeCollapse.value === i ? null : i;
};
const selectAllItems = () => {
  selectedItems.value.forEach((item, index) => {
    console.log('selectAllItems -> index', index);
    selectedItems.value[index] = selectAll.value;
  });
};
const isAnyCheckboxSelected = computed(() => {
  return selectedItems.value.some(item => item);
});
const reset = () => {
  selectedItems.value.fill(false);
  selectAll.value = false;
};
// Funzione per aprire la modale
const openModal = () => {
  modalOpen.value = true;
};

// Funzione per chiudere la modale e resettare lo stato
const closeModal = () => {
  modalOpen.value = false;
  showSecondModalContent.value = false;
};
</script>

<template>
  <div class="tabBlock mt-8">
    <p class="border-b pb-2">Here you will find your payment invoice</p>

    <v-checkbox-btn
      type="checkbox"
      v-model="selectAll"
      id="SelectAll"
      @change="selectAllItems"
      label="Select All"
    />
    <!-- SelectAll -->

    <v-expansion-panels
      class="mb-6 no-chevron"
      v-for="(active, i) in selectedItems"
      :key="i"
      v-model="activeCollapse"
    >
      <v-expansion-panel :value="i">
        <v-expansion-panel-title>
          <div class="w-full flex justify-between items-center">
            <div class="date">
              <v-checkbox-btn
                type="checkbox"
                :name="'payment' + i"
                :id="'payment' + i"
                v-model="selectedItems[i]"
                label="14/08/22"
              />
            </div>
            <div class="price max-sm:hidden">$ 100,00</div>
            <div class="flex gap-2">
              <img
                class="w-[20px] h-[20px]"
                :src="
                  activeCollapse === i
                    ? '/src/assets/svg/vector-.svg'
                    : '/src/assets/svg/vector+.svg'
                "
                alt="info"
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 21 20"
                :fill="active ? '#007aff' : '#DADADA'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5 0C11.1904 0 11.75 0.447715 11.75 1V16.5858L18.3661 11.2929C18.8543 10.9024 19.6457 10.9024 20.1339 11.2929C20.622 11.6834 20.622 12.3166 20.1339 12.7071L11.3839 19.7071C11.1495 19.8946 10.8315 20 10.5 20C10.1685 20 9.85054 19.8946 9.61612 19.7071L0.866116 12.7071C0.377961 12.3166 0.377961 11.6834 0.866117 11.2929C1.35427 10.9024 2.14573 10.9024 2.63388 11.2929L9.25 16.5858L9.25 1C9.25 0.447715 9.80964 0 10.5 0Z"
                />
              </svg>
            </div>
          </div>
        </v-expansion-panel-title>
        <!-- <v-expansion-panel-text></v-expansion-panel-text> -->

        <v-expansion-panel-text>
          <template v-slot:default>
            <div class="px-4 border text-[8px] md:text-[10px] lg:text-[16px]">
              <h2 class="mb-8 lg:mb-16 font-bold text-[18px] lg:text-[40px]">
                Payment receipt
              </h2>
              <!-- Payment receipt -->

              <div class="mb-16">
                <p>Your name/ business name</p>
                <p>Your adress</p>
                <p>Your phone number</p>
                <p>Your e-mail</p>
              </div>
              <!-- /Information person -->

              <div class="bill">
                <h4>Bill to:</h4>
                <div class="flex w-full">
                  <div class="flex-grow-1">
                    <p>Buyer name / buisness name</p>
                    <p>Buyer adress</p>
                    <p>Buyer phone number</p>
                    <p>Buyer e-mail</p>
                  </div>
                  <div class="lg:flex-grow-[2]">
                    <p><b>Receipt number: ######</b></p>
                    <p><b>Receipt date: 12/03/2023</b></p>
                    <p><b>Paymant due: 12/03/2023</b></p>
                  </div>
                </div>
              </div>
              <!-- Information Bill -->

              <table class="w-full mt-16 mb-10">
                <thead
                  class="py-2 lg:py-8 border-t-2 border-b-2 bg-[#0d6dfd2f]"
                >
                  <tr class="text-left">
                    <th class="ps-5">Item</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Price per unit</th>
                    <th class="text-right pe-5">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b" v-for="index in 5" :key="index">
                    <td class="ps-5">Item 1</td>
                    <td class="text-center">###</td>
                    <td class="text-center">$ 0.00</td>
                    <td class="text-right pe-5">$ 0.00</td>
                  </tr>
                </tbody>
              </table>
              <!-- /Amount -->

              <div
                class="total w-2/4 lg:w-1/4 flex flex-col relative right-[-50%] lg:right-[-75%] mt-10 pe-5 overflow-hidden"
              >
                <div class="flex justify-between w-full">
                  <p>Subtotal</p>
                  <div>$ 0.00</div>
                </div>

                <div class="flex justify-between w-full">
                  <p>Tax 0.00%</p>
                  <div>$ 0.00</div>
                </div>

                <div class="flex justify-between w-full">
                  <p>Fees/discounts</p>
                  <div>$ 0.00</div>
                </div>

                <div
                  class="flex justify-between w-full border-t border-b py-4 bg-[#0d6dfd2f] my-10 px-4"
                >
                  <p class="uppercase">total</p>
                  <div>$ 0.00</div>
                </div>
              </div>
              <!-- /.total -->

              <div class="term pb-10">
                <p>Terms and conditions</p>
                <p><i>Terms and conditions go here</i></p>
              </div>
            </div>
          </template>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div
      class="flex flex-col md:flex-row md:justify-end w-full md:w-full pb-16"
    >
      <Button
        variant="white"
        class="button_container md:!w-fit bg-white text-black px-12 me-6 cursor-pointer"
        @click="reset"
      >
        Reset
      </Button>
      <Button
        variant="black"
        class="px-8"
        @click="openModal"
        :disabled="!isAnyCheckboxSelected"
      >
        Download
      </Button>
    </div>
    <!-- CTA -->

    <div
      v-if="modalOpen"
      class="modal"
      :class="{ block: true, hidden: !modalOpen }"
    >
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="!showSecondModalContent">
          <img src="@/assets/images/Content.png" alt="Car - PastAuction" />
          <p class="text-center">Do you want to download all selected files?</p>
          <div class="flex flex-col lg:flex-row lg:gap-6">
            <div
              class="button_container w-fit bg-white text-black px-2 lg:px-12 cursor-pointer"
              @click="closeModal"
            >
              Cancel
            </div>
            <div
              class="button_container w-fit px-8 cursor-pointer"
              @click="showSecondModalContent = true"
            >
              Continue
            </div>
          </div>
        </div>
        <div v-else>
          <img
            class="mx-auto ps-[15px]"
            src="@/assets/svg/visto.svg"
            alt="stroke - PastAuction"
          />
          <h3 class="text-center"><b>DONE</b></h3>
          <p class="text-center">Your files has been successfully dowloaded</p>
          <div class="flex gap-6">
            <div
              class="button_container w-fit bg-back text-white px-12 cursor-pointer"
              @click="closeModal"
            >
              OK
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.modal -->
  </div>
</template>

<style lang="scss">
.v-expansion-panels.no-chevron .v-expansion-panel-title__icon {
  display: none;
}
</style>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.disabled {
  background-color: grey;
  color: white;
  border-color: grey;
}

/* Modal */
.modal {
  position: fixed;
  z-index: 9999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  @apply w-3/4 md:w-2/4 lg:w-1/4 bg-[#fefefe] p-10 absolute top-[15%] md:top-[20%] lg:top-[35%] left-[50%];
  transform: translate(-50%);
  border: 1px solid #888;
}

/* Stili per il pulsante di chiusura della modale */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
