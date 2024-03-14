<template>
    <div class="m-5">
      <v-container fluid>
        <v-alert
            color="info"
            variant="tonal"
        >
          <v-row justify="center">
            <v-col cols="12">
              <div class="text-center text-black">
                <h3><strong></strong></h3>
                <p><small></small></p>
              </div>
            </v-col>
          </v-row>
        </v-alert>
      </v-container>
      <v-container fluid>
        <v-row justify="start">
          <v-col class="d-flex flex-column">
            <span class="me-2 mt-1">Choose chart you want to update with dataset selected</span> 
            <span style="font-size: xx-small; color: grey;">Charts below rappresent a preview with a default standard dataset</span>
          </v-col>
        </v-row>
        <v-row justify="start">
          <v-col>
          </v-col>
        </v-row>
      </v-container>

 
       
  
 
  
    </div>
  </template>
  
  <script>
  import router from '@/router/index';
  
  export default {



  }
  </script>
  
  <style scoped>
  .custom-chip {
    background-color: #ffffff;
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px; 
    }
  
  </style>