import { useGlobal } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from 'vue-router';

import { useAuthStore } from '@/store/auth';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: async () =>
      await import(
        /* webpackChunkName: "BasicLayout" */ '@/views/layout/BasicLayout.vue'
      ),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomeView,
      },
      {
        path: '/garage',
        name: 'Garage',
        component: async () =>
          await import(
            /* webpackChunkName: "Garage" */ '@/views/garage/GarageView.vue'
          ),
      },
      {
        path: '/garage/detail',
        name: 'Garage Detail',
        component: async () =>
          await import(
            /* webpackChunkName: "GarageDetail" */ '@/views/garage/GarageDetail.vue'
          ),
      },
      {
        path: '/garage/create_garage',
        name: 'New Garage',
        component: async () =>
          await import(
            /* webpackChunkName: "NewGarage" */ '@/views/garage/NewGarageView.vue'
          ),
      },
      {
        path: '/garage/detail/:id',
        name: 'GarageDetail',
        component: async () =>
          await import(
            /* webpackChunkName: "GarageDetail" */ '@/views/garage/GarageDetail.vue'
          ),
      },
      {
        path: '/garage/detail/:garageId/vehicle/:id',
        name: 'Vehicle Detail',
        component: async () =>
          await import(
            /* webpackChunkName: "VehicleDetail" */ '@/views/vehicle/createVehicleStep1.vue'
          ),
      },
      {
        path: '/garage/detail/view',
        name: 'Garage View',
        component: async () =>
          await import(
            /* webpackChunkName: "GarageViewPage" */ '@/views/garage/tables/GarageViewPage.vue'
          ),
      },
      {
        path: '/garage/detail/social-media-rumors',
        name: 'Social Media Rumors',
        component: async () =>
          await import(
            /* webpackChunkName: "SocialMediaRumors" */ '@/views/garage/tables/SocialMediaRumors.vue'
          ),
      },
      {
        path: '/garage/detail/social-media-rumors-detail',
        name: 'Social Media Rumors Detail',
        component: async () =>
          await import(
            /* webpackChunkName: "SocialMediaRumorsDetail" */ '@/views/garage/tables/SocialMediaRumorsDetail.vue'
          ),
      },
      {
        path: '/garage/detail/auction-alert',
        name: 'Auction Alert',
        component: async () =>
          await import(
            /* webpackChunkName: "AuctionAlert" */ '@/views/garage/tables/AuctionAlert.vue'
          ),
      },
      {
        path: '/garage/detail/auction-alert-detail/:id',
        name: 'Auction Alert Detail',
        component: async () =>
          await import(
            /* webpackChunkName: "AuctionAlertDetail" */ '@/views/garage/tables/AuctionAlertDetail.vue'
          ),
      },
      {
        path: '/datas',
        name: 'Datas',
        component: async () =>
          await import(
            /* webpackChunkName: "Datas" */ '@/views/datas/index.vue'
          ),
      },
      {
        path: '/datas/vehicle/detail/:id',
        name: 'VehicleDetail',
        component: async () =>
          await import(
            /* webpackChunkName: "VehicleDetail" */ '@/views/datas/VehicleDetail.vue'
          ),
      },
      {
        path: '/charts',
        name: 'Charts',
        component: async () =>
          await import(
            /* webpackChunkName: "Charts" */ '@/views/charts/index.vue'
          ),
      },
      {
        path: '/entity',
        name: 'Entity',
        component: async () =>
          await import(
            /* webpackChunkName: "Index" */ '@/views/entity/Index.vue'
          ),
      },
    ],
  },
  {
    path: '/',
    name: 'login',
    component: async () =>
      await import(
        /* webpackChunkName: "Login" */ '@/views/layout/LoginLayout.vue'
      ),
    children: [
      {
        path: '/login',
        name: 'LoginView',
        component: LoginView,
      },
      {
        path: '/sign-up',
        name: 'SignupView',
        component: SignupView,
      },
      {
        path: '/profile',
        name: 'UserDetail',
        component: async () =>
          await import(
            /* webpackChunkName: "UserDetail" */ '@/views/user/UserDetail.vue'
          ),
      },
    ],
  },
];

/** Vue Router */
const router: Router = createRouter({
  /**
   * History Mode
   *
   * @see {@link https://router.vuejs.org/guide/essentials/history-mode.html }
   */
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  /*
  scrollBehavior: (to, _from, savedPosition) => {
    let scrollTo: number | string = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.top;
    }
    return goTo(scrollTo);
  },
  */
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.name !== 'LoginView' && to.name !== 'SignupView' && !store.isUserAuthenticated)
    next({ name: 'LoginView' });
  else next();
});

export default router;
