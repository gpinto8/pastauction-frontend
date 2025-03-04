import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import router from '@/router';

import { httpPost, httpGet, httpPut, httpDelete, httpPatch } from '@/api/api'
import { useGeneralStore } from './datas/general'

export const useAuthStore = defineStore('auth', () => {
  // state
  const authToken = ref(window.localStorage.getItem('past_token'));
  const loading = ref(false);
  const detail = ref();
  const listCountries = ref();
  const listCities = ref();
  const imageUrl = ref();

  // getters
  const isUserLoggedIn = computed(() => !!authToken.value);
  const getLoading = computed(() => loading.value);
  const getDetail = computed(() => detail.value);
  const isUserAuthenticated = computed(() =>
    Boolean(authToken.value)
  );

  const getListCountries = computed(() => listCountries.value);
  const getListCities = computed(() => listCities.value);
  const getProfileImage = computed(() => imageUrl.value);

  // actions
  async function login(user: any) {
    loading.value = true;
    return await new Promise((resolve, reject) => {
      httpPost('login', user)
        .then(({ data }) => {
          console.log(data);

          saveToken(data.access_token);
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function forgotPassword (email: string) {
    loading.value = true
    return httpPost('reset_password?email=' + email, {})
      .finally(() => {
        loading.value = false
      })
  }

  async function register(user: any) {
    loading.value = true;
    return await new Promise((resolve, reject) => {
      httpPost('sign_up', user)
        .then(({ data }) => {
          console.log(data);
          loading.value = false;
          router.push({ name: 'LoginView' }).catch(() => {});
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function getLoggedUserInfo () {
    const promise = httpGet('user_info')
    promise.then((data) => {
      detail.value = data
    })
    return promise
  }

  async function changePassword(info: any) {
    loading.value = true;
    return await new Promise((resolve, reject) => {
      httpPost('changePassword', info)
        .then(({ data }) => {
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function updateUser (postPayload: {
    // gender: string;
    first_name: string
    surname: string
    // address: string;
    // city: string;
    country: string
    birthdate?: Date
    // phone: string;
    // vat: string;
    // nickname: string;
    // currency: string;
  }) {
    const format = (date: Date) => {
      const newDate = new Date(date);
      const day = newDate.getDate();
      let month: any = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      if (month < 10) month = `0${month}`;

      return `${year}-${month}-${day}`;
    };

    loading.value = true;
    return await new Promise((resolve, reject) => {
      httpPatch('user_info_update', {
        first_name: postPayload.first_name,
        surname: postPayload.surname,
        birthdate: postPayload.birthdate ? format(postPayload.birthdate) : null,
        country: postPayload.country,
        // city_id: postPayload.city_id, // TODO
      })
        .then(({ data }) => {
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function getCountries() {
    return await new Promise((resolve, reject) => {
      httpGet('list_countries')
        .then(({ data }) => {
          console.log('countires', data);
          listCountries.value = data.items;
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async function getCities(county: string) {
    return await new Promise((resolve, reject) => {
      httpGet(`list_cities/${county}`)
        .then(({ data }) => {
          console.log('cities', data);

          listCities.value = data.items;
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async function uploadPicture(file: any) {
    let formData = new FormData();
    formData.append('file', file);

    loading.value = true;
    return await new Promise((resolve, reject) => {
      httpPost('profile_image/', formData)
        .then(({ data }) => {
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function deletePicture() {
    return await new Promise((resolve, reject) => {
      httpDelete('profile_image/')
        .then(({ data }) => {
          imageUrl.value = null;
          loading.value = false;
          resolve(data);
        })
        .catch((err: any) => {
          loading.value = false;
          reject(err);
        });
    });
  }

  async function loadImage(imgUrl: string) {
    imageUrl.value = await useGeneralStore().loadMedia(imgUrl)
  }

  function saveToken(token: string) {
    window.localStorage.setItem('past_token', token);
    authToken.value = token;
    router.push({ name: 'Home' }).catch(() => {});
  }

  function logout() {
    window.localStorage.removeItem('past_token');
    window.localStorage.removeItem('user');
    router.push({ path: '/login' }).catch(() => {});
  }

  return {
    // state
    detail,
    authToken,

    // getters
    isUserLoggedIn,
    getLoading,
    getDetail,
    isUserAuthenticated,
    getListCountries,
    getListCities,
    getProfileImage,

    // actions
    login,
    forgotPassword,
    getLoggedUserInfo,
    changePassword,
    saveToken,
    logout,
    updateUser,
    getCountries,
    getCities,
    uploadPicture,
    deletePicture,
    loadImage,
    register,
  };
});
