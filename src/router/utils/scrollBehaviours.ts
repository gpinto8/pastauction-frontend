import type { RouterScrollBehavior } from "vue-router";

export const scrollBehaviour: RouterScrollBehavior = (to, _from, savedPosition)  => {
  if (to.hash) {
    return { el: to.hash };
  } else if (savedPosition) {
   return savedPosition;
  }
  else {
    return { top: 0 };
  }
  };