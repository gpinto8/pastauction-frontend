<script setup lang="ts">
import type { ProductDetails } from './PlansInfoSelection.vue';

const props = defineProps<{
	products: {
		Item: any[];
		Services: any[];
		Charts: any[];
	}
}>();
</script>

<template>
  <div class="container-card md:p-[20px]">
    <div class="p-2">
      <h2 class="plan-title">Start</h2>
      <p style="margin: 20px 0;">Summary and detail of the availability of your current plan</p>
    </div>
    <div class="md:p-[20px]">
      <v-table>
        <thead class="table-header">
          <tr>
            <th>Service/Product</th>
            <th>Included in plan</th>
            <th>Limits</th>
            <th>Used</th>
            <th>Available</th>
            <th>
              <div style="display: flex; flex-direction: row; align-items: center;">
                <img src="@/assets/images/bolt.png" alt="" class="w-[15px] h-[15px]" style="margin-right: 5px;" />
                <span>Cost</span>
              </div>
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>&nbsp;</tr>
          <tr class="group-header" style="margin-top: 20px;">
            <td colspan="7">Item</td>
          </tr>
          <tr v-for="product in products.Item" :key="product.id">
            <td>{{ product.name }}</td>
            <td>-</td>
            <td>{{ parseInt(product.properties.limit) < 0 ? "unlimited" : product.properties.limit }}</td>
            <td>-</td>
            <td>{{ parseInt(product.properties.available) < 0 ? "unlimited" : product.properties.available }}</td>
            <td>{{ parseInt(product.prezzo) <= 0 ? "-" : product.prezzo }}</td>
            <td>
              <v-chip variant="outlined" class="status-chip active">
                Active
              </v-chip>
            </td>
          </tr>
          <tr>&nbsp;</tr>
          <tr class="group-header" style="margin-top: 20px;">
            <td colspan="7">Services</td>
          </tr>
          <tr v-for="product in products.Services" :key="product.id">
            <td>{{ product.name }}</td>
            <td>-</td>
            <td>{{ parseInt(product.properties.limit) < 0 ? "unlimited" : product.properties.limit }}</td>
            <td>-</td>
            <td>{{ parseInt(product.properties.available) < 0 ? "unlimited" : product.properties.available }}</td>
            <td>{{ parseInt(product.prezzo) <= 0 ? "-" : product.prezzo }}</td>
            <td>
              <v-chip variant="outlined" class="status-chip active">
                Active
              </v-chip>
            </td>
          </tr>
          <tr>&nbsp;</tr>
          <tr class="group-header" style="margin-top: 20px;">
            <td colspan="7">Charts</td>
          </tr>
          <tr v-for="product in products.Charts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>-</td>
            <td>{{ parseInt(product.properties.limit) < 0 ? "unlimited" : product.properties.limit }}</td>
            <td>-</td>
            <td>{{ parseInt(product.properties.available) < 0 ? "unlimited" : product.properties.available }}</td>
            <td>{{ parseInt(product.prezzo) <= 0 ? "-" : product.prezzo }}</td>
            <td>
              <v-chip variant="outlined" class="status-chip active">
                Active
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<style scoped>
.container-card {
  margin-top: 20px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.15);
}

.plan-title {
  font-size: 20px;
  font-weight: 500;
}

th, td {
  color: #212529 !important;
}

tr:not(.group-header) > td:first-child {
  position: sticky;
  left: 0;
  background: white;
}

.group-header {
  background: #ffda4450;
  height: 40px;
  font-weight: 500;
}

.status-chip {
  border-width: 2px;
  width: 90px;
  justify-content: center;
  font-weight: 500;
}

.status-chip.active {
  background: #16c09844;
  border-color: #00B087;
  color: #008767;
}
</style>
