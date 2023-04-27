export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore();
  if (store.getIsUserLoggedIn) return;
});
