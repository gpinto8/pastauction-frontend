<script lang="ts">
import { ref } from 'vue';
import { fetchProductListById } from '@/components/wallet/ajax/AjaxProductList';
import { fetchProductDetails } from '@/components/wallet/ajax/AjaxProductDetails.js';
import {
  type Product,
  type ProductDetails,
} from '@/components/wallet/services/PlansInfoSelection.vue';
import type { Ref } from 'vue';

const currentBoltsItemCount = ref(0);
const tokensPrice = 50;
const boltsQuantity = 500;
const tableData = ref<{
  Item: ProductDetails[];
  Services: ProductDetails[];
  Charts: ProductDetails[];
}>({
  Item: [],
  Services: [],
  Charts: [],
});
const counters: {
  Item: Record<string, Ref>;
  Services: Record<string, Ref>;
  Charts: Record<string, Ref>;
} = {
  Item: {},
  Services: {},
  Charts: {},
};

function increment(ref: Ref) {
  ref.value++;
}

function decrement(ref: Ref) {
  if (ref.value > 0) {
    ref.value--;
  }
}

function reset(ref: Ref) {
  ref.value = 0;
  tableData.value = {
    Item: [],
    Services: [],
    Charts: [],
  };
}

function resetItem() {
  tableData.value.Item.forEach(item => {
    counters.Item[`${item.id}`].value = 0;
  });
}

function resetServices() {
  tableData.value.Services.forEach(item => {
    counters.Services[`${item.id}`].value = 0;
  });
}

function resetCharts() {
  tableData.value.Charts.forEach(item => {
    counters.Charts[`${item.id}`].value = 0;
  });
}

async function changePlan(plan: Product) {
  reset(currentBoltsItemCount);
  const products: Product[] = await fetchProductListById(plan.family);

  // For each product.properties.product_id, fetch the product details and populate the table data
  products.forEach(async product => {
    const productDetails: ProductDetails = await fetchProductDetails(
      product.id
    );
    if (productDetails) {
      if (productDetails.prezzo > 0) {
        if (productDetails.category === 'CategoryChart') {
          tableData.value.Charts.push(productDetails);
          counters.Charts[`${productDetails.id}`] = ref(0);
        } else if (
          productDetails.category === 'Chart' ||
          productDetails.category === 'Datas' ||
          productDetails.category === 'Locate' ||
          productDetails.category === 'Marketplace'
        ) {
          tableData.value.Services.push(productDetails);
          counters.Services[`${productDetails.id}`] = ref(0);
        } else if (productDetails.category === 'Garage') {
          tableData.value.Item.push(productDetails);
          counters.Item[`${productDetails.id}`] = ref(0);
        }
      }
    }
  });
}

export default {
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  computed: {
    plan(): Product {
      return this.plan;
    },
    console: () => console,
    increment: () => increment,
    decrement: () => decrement,
    reset: () => reset,
    resetItem: () => resetItem,
    resetServices: () => resetServices,
    resetCharts: () => resetCharts,
    currentBoltsItemCount: () => currentBoltsItemCount,
    tokensPrice: () => tokensPrice,
    boltsQuantity: () => boltsQuantity,
    tableData: () => tableData.value,
    counters: () => counters,
  },
  watch: {
    plan: {
      handler: function (newVal) {
        changePlan(newVal);
      },
      deep: true,
    },
  },
  mounted() {
    changePlan(this.plan);
  },
};
</script>

<template>
  <!-- Buy bolts -->
  <div
    class="mb-[50px]"
    style="
      border-radius: 12px;
      background: #fff;
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
      padding: 0;
      overflow: hidden;
    "
  >
    <div class="px-6 py-3 bg-[#0D6EFD55]">
      <h1 class="font-bold text-lg">
        {{ plan.name }}
      </h1>
      <div class="flex items-center gap-2 mt-2 mb-1">
        <img
          src="@/assets/images/bronze_token.png"
          alt="Bronze Token - Pastauction"
          class="w-7"
        />
        <h3 class="font-bold text-lg">
          {{ plan.prezzo > 0 ? plan.prezzo : '***' }}
        </h3>
      </div>
      <p class="opacity-[0.75] text-sm">Bolts required</p>
    </div>

    <v-table>
      <thead>
        <tr>
          <th>Single item</th>
          <th>Price</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bolt.png"
                alt="Bolt - Pastauction"
                class="w-5 rotate-[-90deg]"
              />
              <h3>Quantity</h3>
            </div>
          </th>
          <th>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bronze_token.png"
                alt="Bronze Token - Pastauction"
                class="w-7"
              />
              <h3>Total cost</h3>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bolt.png"
                alt="Bolt - Pastauction"
                class="w-5 rotate-[-90deg]"
              />
              <h3>500</h3>
            </div>
          </td>
          <td>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bronze_token.png"
                alt="Bronze Token - Pastauction"
                class="w-7"
              />
              <h3>50</h3>
            </div>
          </td>
          <td>500 Bolts</td>
          <td>
            <div class="flex flex-col items-start justify-center">
              <div class="flex gap-1">
                <button class="px-2" @click="decrement(currentBoltsItemCount)">
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ currentBoltsItemCount.value }}
                </span>
                <button class="px-2" @click="increment(currentBoltsItemCount)">
                  +
                </button>
              </div>
            </div>
          </td>
          <td>
            <p class="border !border-[#21252992] rounded px-4 text-center">
              {{ currentBoltsItemCount.value * boltsQuantity }}
            </p>
          </td>
          <td>
            <p class="border !border-[#21252992] rounded px-4 text-center">
              {{ currentBoltsItemCount.value * tokensPrice }}
            </p>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-container class="bg-[#ECECEC]">
      <v-row align="center" justify="end">
        <v-col cols="auto">
          <v-btn
            size="small"
            variant="flat"
            @click="reset(currentBoltsItemCount)"
            class="w-[150px] mr-[50px] border-[1px] border-[#21252992] rounded bg-white text-capitalize"
          >
            Reset
          </v-btn>
          <v-btn
            size="small"
            variant="flat"
            @click=""
            class="w-[150px] bg-[#0D6EFD80] rounded text-white text-capitalize"
          >
            Buy Bolts
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- / Buy bolts -->

  <!-- Spend bolts -->
  <div
    class="mb-[50px]"
    style="
      border-radius: 12px;
      background: #fff;
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
      padding: 0;
      overflow: hidden;
    "
  >
    <v-container class="border-t-[1px] border-[#21252910] bg-[#ECECEC]">
      <p class="opacity-[0.75] text-sm py-6 px-3">Required Bolts to activate</p>
    </v-container>
    <v-table>
      <thead>
        <tr>
          <th>One item</th>
          <th>Bolts</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bolt.png"
                alt="Bolt - Pastauction"
                class="w-5 rotate-[-90deg]"
              />
              <h3>Total bolts</h3>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in tableData.Item" :key="product.id">
          <td>{{ product.name }}</td>
          <td>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bolt.png"
                alt="Bolt - Pastauction"
                class="w-5 rotate-[-90deg]"
              />
              <h3>{{ product.prezzo <= 0 ? '-' : product.prezzo }}</h3>
            </div>
          </td>
          <td>{{ parseInt(product.properties['expire(dd)']) }} usage</td>
          <td>
            <div class="flex flex-col items-start justify-center">
              <div class="flex gap-1">
                <button
                  class="px-2"
                  @click="decrement(counters.Item[product.id])"
                >
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ counters.Item[product.id].value }}
                </span>
                <button
                  class="px-2"
                  @click="increment(counters.Item[product.id])"
                >
                  +
                </button>
              </div>
            </div>
          </td>
          <td>
            <p class="border !border-[#21252992] rounded px-4 text-center">
              {{ counters.Item[product.id].value * product.prezzo }}
            </p>
          </td>
        </tr>
        <tr v-for="product in tableData.Services" :key="product.id">
          <td>{{ product.name }}</td>
          <td>
            <div class="flex items-center gap-2">
              <img
                src="@/assets/images/bolt.png"
                alt="Bolt - Pastauction"
                class="w-5 rotate-[-90deg]"
              />
              <h3>{{ product.prezzo <= 0 ? '-' : product.prezzo }}</h3>
            </div>
          </td>
          <td>{{ parseInt(product.properties['expire(dd)']) }} usage</td>
          <td>
            <div class="flex flex-col items-start justify-center">
              <div class="flex gap-1">
                <button
                  class="px-2"
                  @click="decrement(counters.Services[product.id])"
                >
                  -
                </button>
                <span class="border !border-[#21252992] rounded px-4">
                  {{ counters.Services[product.id].value }}
                </span>
                <button
                  class="px-2"
                  @click="increment(counters.Services[product.id])"
                >
                  +
                </button>
              </div>
            </div>
          </td>
          <td>
            <p class="border !border-[#21252992] rounded px-4 text-center">
              {{ counters.Services[product.id].value * product.prezzo }}
            </p>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-container class="bg-[#ECECEC]">
      <v-row align="center" justify="end">
        <v-col cols="auto">
          <span class="border !border-[#21252992] rounded px-4 bg-white">
            {{
              tableData.Item.reduce(
                (acc, product) =>
                  acc + counters.Item[product.id].value * product.prezzo,
                0
              ) +
              tableData.Services.reduce(
                (acc, product) =>
                  acc + counters.Services[product.id].value * product.prezzo,
                0
              )
            }}
          </span>
        </v-col>
      </v-row>
      <v-row align="center" justify="end">
        <v-col cols="auto">
          <v-btn
            size="small"
            variant="flat"
            @click="
              () => {
                resetItem();
                resetServices();
              }
            "
            class="w-[150px] mr-[50px] border-[1px] border-[#21252992] rounded bg-white text-capitalize"
          >
            Reset
          </v-btn>
          <v-btn
            size="small"
            variant="flat"
            @click=""
            class="w-[150px] bg-[#0D6EFD80] rounded text-white text-capitalize"
          >
            Apply
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- / Spend bolts -->

  <!-- Spend bolts extra -->
  <div v-if="tableData">
    <div v-if="tableData.Charts.length > 0">
      <div
        class="mb-[50px]"
        style="
          border-radius: 12px;
          background: #fff;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
          padding: 0;
          overflow: hidden;
        "
      >
        <v-container class="border-t-[1px] border-[#21252910] bg-[#ECECEC]">
          <p class="opacity-[0.75] text-sm py-6 px-3">
            Extra charges ** chart special required
          </p>
        </v-container>
        <v-table>
          <thead>
            <tr>
              <th>One item</th>
              <th>Bolts</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>
                <div class="flex items-center gap-2">
                  <img
                    src="@/assets/images/bolt.png"
                    alt="Bolt - Pastauction"
                    class="w-5 rotate-[-90deg]"
                  />
                  <h3>Total bolts</h3>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in tableData.Charts" :key="product.id">
              <td>{{ product.name }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <img
                    src="@/assets/images/bolt.png"
                    alt="Bolt - Pastauction"
                    class="w-5 rotate-[-90deg]"
                  />
                  <h3>{{ product.prezzo <= 0 ? '-' : product.prezzo }}</h3>
                </div>
              </td>
              <td>{{ parseInt(product.properties['expire(dd)']) }} usage</td>
              <td>
                <div class="flex flex-col items-start justify-center">
                  <div class="flex gap-1">
                    <button
                      class="px-2"
                      @click="decrement(counters.Charts[product.id])"
                    >
                      -
                    </button>
                    <span class="border !border-[#21252992] rounded px-4">
                      {{ counters.Charts[product.id].value }}
                    </span>
                    <button
                      class="px-2"
                      @click="increment(counters.Charts[product.id])"
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <p class="border !border-[#21252992] rounded px-4 text-center">
                  {{ counters.Charts[product.id].value * product.prezzo }}
                </p>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-container class="bg-[#ECECEC]">
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <span class="border !border-[#21252992] rounded px-4 bg-white">
                {{
                  tableData.Charts.reduce(
                    (acc, product) =>
                      acc + counters.Charts[product.id].value * product.prezzo,
                    0
                  )
                }}
              </span>
            </v-col>
          </v-row>
          <v-row align="center" justify="end">
            <v-col cols="auto">
              <v-btn
                size="small"
                variant="flat"
                @click="
                  () => {
                    resetCharts();
                  }
                "
                class="w-[150px] mr-[50px] border-[1px] border-[#21252992] rounded bg-white text-capitalize"
              >
                Reset
              </v-btn>
              <v-btn
                size="small"
                variant="flat"
                @click=""
                class="w-[150px] bg-[#0D6EFD80] rounded text-white text-capitalize"
              >
                Apply
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
  <!-- / Spend bolts extra -->
</template>

<style scoped>
th {
  color: black !important;
}

tr > td:first-child {
  color: black !important;
}
</style>
