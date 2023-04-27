export default defineNuxtRouteMiddleware(() => {
  const user = useAuthStore();
  if (user.getIsUserLoggedIn) return navigateTo("/home");
});
