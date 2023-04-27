import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", () => {
  const endpoint = ref("https://api.pastauction.com/");
  const { $toast } = useNuxtApp();

  const router = useRouter();
  const userStore = useUserStore();

  const registeredUSer = ref();
  const loginEmail = ref();

  const isUserLoggedIn = useStorage("loggedIn", false);
  const accessToken = useStorage("accessToken", "");
  const userInfo = ref();
  const loading = ref(false);
  const emailRequest = ref();
  // Getters
  const getLoading = computed(() => loading.value);
  const getRegisteredUser = computed(() => registeredUSer.value);
  const getIsUserLoggedIn = computed(() => isUserLoggedIn.value);
  const getLoggedUserInfo = computed(() => {
    if (userInfo.value) return JSON.parse(userInfo.value);
    else if (useLocalStorage("userInfo")) {
      return JSON.parse(useLocalStorage("userInfo").value);
    } else return {};
  });
  const getEmail = computed(() => emailRequest.value);
  const getToken = computed(() => accessToken.value);

  // Actions
  async function register(postPayload: any) {
    registeredUSer.value = postPayload;
    let formData = new FormData();
    formData.append("name", postPayload.name);
    formData.append("surname", postPayload.surname);
    formData.append("email", postPayload.email);
    formData.append("password", postPayload.password);

    await useFetch(() => `${endpoint.value}sign_up`, {
      method: "POST",
      body: formData,
      onResponse({ request, response, options }) {
        if (typeof response._data === "object") {
          registeredUSer.value = response._data;
          router.push("/confirm-identity");
          verify(postPayload.email);
        }

        return response._data;
      },
      onResponseError({ request, response, options }) {
        $toast.error(response._data);
      },
    });
  }

  async function verify(email: string) {
    return await useFetch(`${endpoint.value}email_verification/${email}`);
  }

  async function verifyEmail(opt: number) {
    await useFetch(
      `${endpoint.value}email_verification/${getRegisteredUser.value.email}/${opt}`,
      {
        method: "POST",

        onResponse({ request, response, options }) {
          if (response.status === 200) router.push("/privacy");
        },
        onResponseError({ request, response, options }) {
          $toast.error(response._data);
        },
      }
    );
  }

  async function login(payload: any) {
    loading.value = true;
    await useFetch(`${endpoint.value}login`, {
      method: "GET",
      headers: {
        email: payload.email,
        password: payload.password,
      },

      onResponse({ request, response, options }) {
        if (response._data && typeof response._data === "string") {
          accessToken.value = response._data;
          isUserLoggedIn.value = true;

          getUserInfo();
        }

        return response._data;
      },
      onResponseError({ request, response, options }) {
        loading.value = false;
        $toast.error(response._data);
      },
    });
  }

  async function getUserInfo(payload?: any) {
    return await useFetch(`${endpoint.value}user_info`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      onResponse({ request, response, options }) {
        if (typeof response._data === "object") {
          userStore.loadImage(response._data.profile_picture_url);
          localStorage.setItem("userInfo", JSON.stringify(response._data));
          userInfo.value = JSON.stringify(response._data);
        }
        loading.value = false;
        if (!payload) {
          router.push("/home");
        }
        return response._data;
      },
    });
  }

  function confirmIdentity(email: string) {
    loginEmail.value = email;
    verify(email);
    router.push("/confirm-login");
  }

  async function reset(opt: number) {
    await useFetch(
      `${endpoint.value}email_verification/${loginEmail.value}/${opt}`,
      {
        method: "POST",

        onResponse({ request, response, options }) {
          useFetch(`${endpoint.value}password_recovery/${loginEmail.value}`);
          $toast.success("Email sent to reset password");
        },
        onResponseError({ request, response, options }) {
          $toast.error(response._data);
        },
      }
    );
  }

  async function resetConfirm(uuid: string, newPassowrd: string) {
    await useFetch(
      `${endpoint.value}password_recovery/${uuid}/${newPassowrd}`,
      {
        method: "POST",
        onResponse({ request, response, options }) {
          router.push("/login");
          return response._data;
        },
      }
    );
  }

  function logout() {
    isUserLoggedIn.value = false;
    userInfo.value = "";
    accessToken.value = "";
    router.push("/login");
  }

  return {
    userInfo,
    loginEmail,
    //getters
    getLoading,
    getRegisteredUser,
    getIsUserLoggedIn,
    getLoggedUserInfo,
    getEmail,
    getToken,
    // actions
    register,
    verify,
    verifyEmail,

    login,
    reset,
    resetConfirm,
    getUserInfo,
    logout,
    confirmIdentity,
  };
});
