import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useAuthStore } from "./login";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  // Data
  const { $toast } = useNuxtApp();
  const authStore = useAuthStore();
  const router = useRouter();
  const listCountries = ref();
  const listCities = ref();
  const endpoint = ref("https://api.pastauction.com/");
  const userPrompted = useStorage("userPrompted", false);
  const imageUrl = ref();
  // Getters and setters
  const getListCountries = computed(() => listCountries.value);
  const getListCities = computed(() => listCities.value);
  const getUserPrompted = computed(() => userPrompted.value);
  const getProfileImage = computed(() => imageUrl.value);

  async function updateUser(postPayload: any) {
    const format = (date: Date) => {
      const newDate = new Date(date);
      const day = newDate.getDate();
      let month: any = newDate.getMonth() + 1;
      const year = newDate.getFullYear();

      if (month < 10) month = `0${month}`;

      return `${day}-${month}-${year}`;
    };

    let formData = new FormData();
    formData.append("name", postPayload.name);
    formData.append("surname", postPayload.surname);
    formData.append("birth", format(postPayload.birth));
    formData.append("country_id", postPayload.country_id);
    formData.append("city_id", postPayload.city_id);

    await useFetch(`${endpoint.value}/user_info`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },

      onResponse({ response }) {
        if (typeof response._data === "object") {
          userPrompted.value = true;
          router.push("/home");
        }
      },
      onResponseError({ response }) {
        $toast.error(response._data);
      },
    });
  }

  async function getCountries() {
    return await useFetch(`${endpoint.value}list_countries`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },

      onResponse({ request, response, options }) {
        if (response.status === 200) listCountries.value = response._data;
      },
      onResponseError({ response }) {
        $toast.error(response._data);
      },
    });
  }

  async function getCities(county: string) {
    return await useFetch(`${endpoint.value}list_cities/${county}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },

      onResponse({ request, response, options }) {
        if (response.status === 200) listCities.value = response._data;
      },
      onResponseError({ request, response, options }) {
        $toast.error(response._data);
      },
    });
  }

  async function uploadPicture(file: any) {
    let formData = new FormData();
    formData.append("file", file);
    await useFetch(`${endpoint.value}profile_image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
      body: formData,

      onResponse({ request, response, options }) {
        if (response.status === 200) listCountries.value = response._data;
      },
      onResponseError({ request, response, options }) {
        $toast.error(response._data);
      },
    });
  }

  async function deletePicture() {
    await useFetch(`${endpoint.value}profile_image`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },

      onResponse({ request, response, options }) {
        if (response.status === 200) $toast.success("eliminato con successo");
      },
      onResponseError({ request, response, options }) {
        $toast.error(response._data);
      },
    });
  }

  async function loadImage(imgUrl: string) {
    await useFetch(`${imgUrl}`, {
      method: "GET",
      onResponse({ request, response, options }) {
        imageUrl.value = URL.createObjectURL(response._data);

        let image = document.createElement("img") as any;
        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
          let contents = reader.result;
          image.src = contents;
          document.body.appendChild(image);
        });
        if (Blob instanceof Blob) reader.readAsDataURL(response._data);
      },
    });
  }

  return {
    // Getters
    getListCountries,
    getListCities,
    getUserPrompted,
    getProfileImage,
    // actions
    updateUser,
    getCountries,
    getCities,
    uploadPicture,
    deletePicture,
    loadImage,
  };
});
