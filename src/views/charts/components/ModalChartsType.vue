<template>
  <v-dialog v-model="dialogVisible" max-width="250" max-height="280">
    <v-card>
      <v-card-text class="text-center pt-2 pb-1">
        <img class="ms-11" src="@/assets/images/car-dialog-chart.svg" alt="Immagine" width="120">
        <div class="mt-2">
          <small>Brand is not included in your plan, you will be charged 150 Bolts</small>
        </div>
      </v-card-text>
      <v-card-actions class="col-12 d-flex justify-center">
        <v-btn @click="closeDialog" size="small" variant="flat" color="grey">Cancel</v-btn>
        <v-btn @click="goToFilters" size="small" variant="flat" color="black">Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modalOpen: Boolean
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    modalOpen(value) {
      this.dialogVisible = value;
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:modalOpen', false);
    },

    goToFilters(){
      this.$emit('continueClicked');
    }
  }
};
</script>
