import { useAuthStore } from "@/store/auth";
import type { NavigationGuard } from "vue-router";

export const authGuard: NavigationGuard = (to, _from, next)  => {
    const store = useAuthStore();
  
    if (to.meta.authentication && !store.isUserAuthenticated) {
      next({ name: 'LoginView' });
    }
    else {
      next();
    }
  };