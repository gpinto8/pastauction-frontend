<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
const store = useAuthStore();
const user = ref({
  email: '',
  password: '',
});
const rules = {
  password: { required },
  email: { required, email },
};
const v$ = useVuelidate(rules, user);
const submit = () => {
  store.login(user.value);
};
</script>

<template>
  <div class="space-y-2 text-center">
    <h2 class="text-4xl p-0">Sign In</h2>
    <div class="text-grey">Welcome back! Login to your account</div>
  </div>

  <div class="login_social_main_box">
    <div class="login_social_box"><img src="@/assets/images/google.png" alt="Google"></div>
    <div class="login_social_box x_logo"><img src="@/assets/icons/twitterLogo.svg" alt="Google"></div>
    <div class="login_social_box fb_logo"><img src="@/assets/icons/facebookLogo.svg" alt="Google"></div>
  </div>


  <div class="or_txt">Or</div>

  <v-form @submit.prevent="submit" class="space-y-4">
    <v-text-field v-model="user.email" :error-messages="(v$.email.$errors.map(e => e.$message) as any)"
      placeholder="Enter your email" label="Email" required variant="outlined" density="comfortable"
      @input="v$.email.$touch" @blur="v$.email.$touch"></v-text-field>

    <v-text-field v-model="user.password" :error-messages="(v$.password.$errors.map(e => e.$message) as any)" :counter="10"
      density="comfortable" placeholder="Password" label="Password" type="password" required variant="outlined"
      @input="v$.password.$touch" @blur="v$.password.$touch"></v-text-field>


      <v-btn class="!bg-primary text-white w-full !rounded-lg mt-8" :disabled="v$.$invalid" :loading="store.getLoading"
      size="large" type="submit">
      Sign in
    </v-btn>
    <div class="text-center mb-1 mt-5">
      <router-link to="/forgot-password" class="text-blue-600 underline">
        Forgot password
      </router-link>
    </div>

    <div class="text-center mb-3 mt-1">
      Don't you have an account?
      <router-link to="/sign-up" class="text-blue-600 underline">
        Sign up
      </router-link>
    </div>
  </v-form>
</template>
<style scoped>
  .login_social_main_box {
    display: flex;
    width: 100%;
    justify-content: space-between;


    .login_social_box {
      background: #fff;
      width: 30%;
      cursor: pointer;
      border: 1px solid #E0E0E9;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0px 8px 16px 0px #00000026;

      img {
        width: 23px;
        height: 23px;
        display: block;
        margin: 0 auto;
      }
    }
    .x_logo {
      background-color: #000;
    }
    .fb_logo {
      background-color: #0D6EFD;
    }
  }
.or_txt {
  text-align: center;
  font-size: 16px;
  margin-bottom: 24px;
  font-weight: 400;
  line-height: 24px;

}
</style>
