import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import LocateView from '@/views/locate/LocateView.vue';
import LocateRoadmapsView from '@/views/locate/LocateRoadmapsView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';

import { authGuard } from './utils/guards';
import { scrollBehaviour } from './utils/scrollBehaviours';
import LocateRoadmapDetailView from '@/views/locate/LocateRoadmapDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: scrollBehaviour,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: async () =>
        await import(
          /* webpackChunkName: "BasicLayout" */ '@/views/layout/BasicLayout.vue'
        ),
        meta: { authentication: true },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/garage',
          name: 'Garage',
          component: async () =>
            await import(
              /* webpackChunkName: "Garage" */ '@/views/garage/GarageView.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail',
          name: 'Garage Detail',
          component: async () =>
            await import(
              /* webpackChunkName: "GarageDetail" */ '@/views/garage/GarageDetail.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/create_garage',
          name: 'New Garage',
          component: async () =>
            await import(
              /* webpackChunkName: "NewGarage" */ '@/views/garage/NewGarageView.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/:id',
          name: 'GarageDetail',
          component: async () =>
            await import(
              /* webpackChunkName: "GarageDetail" */ '@/views/garage/GarageDetail.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/:garageId/vehicle/:id',
          name: 'Vehicle Detail',
          component: async () =>
            await import(
              /* webpackChunkName: "VehicleDetail" */ '@/views/vehicle/createVehicleStep1.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/view',
          name: 'Garage View',
          component: async () =>
            await import(
              /* webpackChunkName: "GarageViewPage" */ '@/views/garage/tables/GarageViewPage.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/social-media-rumors',
          name: 'Social Media Rumors',
          component: async () =>
            await import(
              /* webpackChunkName: "SocialMediaRumors" */ '@/views/garage/tables/SocialMediaRumors.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/social-media-rumors-detail',
          name: 'Social Media Rumors Detail',
          component: async () =>
            await import(
              /* webpackChunkName: "SocialMediaRumorsDetail" */ '@/views/garage/tables/SocialMediaRumorsDetail.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/auction-alert',
          name: 'Auction Alert',
          component: async () =>
            await import(
              /* webpackChunkName: "AuctionAlert" */ '@/views/garage/tables/AuctionAlert.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/garage/detail/auction-alert-detail/:id',
          name: 'Auction Alert Detail',
          component: async () =>
            await import(
              /* webpackChunkName: "AuctionAlertDetail" */ '@/views/garage/tables/AuctionAlertDetail.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/wallet',
          name: 'Wallet',
          component: async () =>
            await import(
              /* webpackChunkName: "Datas" */ '@/views/wallet/index.vue'
              ),
        },
        {
          path: '/datas',
          name: 'Datas',
          component: async () =>
            await import(
              /* webpackChunkName: "Datas" */ '@/views/datas/index.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/datas/vehicle/detail/:id',
          name: 'VehicleDetail',
          component: async () =>
            await import(
              /* webpackChunkName: "VehicleDetail" */ '@/views/datas/VehicleDetail.vue'
            ),
        meta: { authentication: true },

        },
        {
          path: '/charts',
          name: 'Charts',
          component: async () =>
            await import(
              /* webpackChunkName: "Charts" */ '@/views/charts/index.vue'
            ),
        meta: { authentication: true },
        },
        {
          path: '/charts/filters',
          name: 'Filters',
          component: async () =>
          await import(
          /* webpackChunkName: "FiltersPage" */ '@/views/charts/FiltersPage.vue'
          )
        },
        {
          path: '/charts/filters/brand',
          name: 'Brand',
          component: async () =>
          await import(
          /* webpackChunkName: "BrandPage" */ '@/views/charts/BrandPage.vue'
          )
        },
        {
          path: '/charts/filters/brand/preview',
          name: 'Preview',
          component: async () =>
          await import(
              /* webpackChunkName: "PreviewPage" */ '@/views/charts/PreviewPage.vue'
          ),
        },
        {
          path: '/locate',
          name: 'Locate',
					component: async () =>
						await import(
						/* webpackChunkName: "Login" */ '@/views/layout/LocateLayout.vue'
					),
					children: [
						{
							path: '/locate',
							name: 'Locate ',
							component: LocateView,
						},
						{
							path: '/locate/roadmaps',
							name: 'Locate',
							component: LocateRoadmapsView,
						},
						{
							path: "/locate/roadmap-detail",
							name: 'Locate  ',
							component: LocateRoadmapDetailView,
						}
					],
        },
        {
          path: '/entity',
          name: 'Entity',
          redirect: '/entity/profile',
          meta: { authentication: true },
          component: async () =>
            await import(
              /* webpackChunkName: "Entity" */ '@/views/layout/EntityLayout.vue'
            ),
            children: [
              {
                path: '/entity/profile',
                name: 'EntityProfile',
                component: async () =>
                  await import(
                    /* webpackChunkName: "Profile" */ '@/views/entity/profile/Profile'
                  ),
              },
              {
                path: '/entity/administration',
                name: 'EntityAdministration',
                component: async () =>
                  await import(
                    /* webpackChunkName: "Administration" */ '@/views/entity/Administration'
                  ),
              },
              {
                path: '/entity/services',
                name: 'EntityServices',
                component: async () =>
                  await import(
                    /* webpackChunkName: "Services" */ '@/views/entity/services/Services'
                  ),
              },
              {
                path: '/entity/events',
                name: 'EntityEvents',
                redirect: { name: 'EntityEventsAll' },
                component: async () =>
                  await import(
                    /* webpackChunkName: "EntityEvents" */ '@/views/layout/EntityEventsLayout.vue'
                  ),
                  children: [
                    {
                      path: 'all',
                      name: 'EntityEventsAll',
                      component: async () =>
                        await import(
                          /* webpackChunkName: "EntityEvents" */ '@/views/entity/events/all/EventsAll.vue'
                        ),
                    },
                    {
                      path: 'new',
                      name: 'EntityEventsNew',
                      component: async () =>
                        await import(
                          /* webpackChunkName: "EntityEvents" */ '@/views/entity/events/new/EventsNew.vue'
                        ),
                    },
                    {
                      path: 'event/:id',
                      name: 'EntityEventsEvent',
                      props: true,
                      component: async () =>
                        await import(
                          /* webpackChunkName: "EntityEvents" */ '@/views/entity/events/event/EventsEvent.vue'
                        ),
                    },
                  ]
              },
              {
                path: '/entity/requests',
                name: 'EntityRequests',
                component: async () =>
                  await import(
                    /* webpackChunkName: "Requests" */ '@/views/entity/Requests'
                  ),
              },
            ]
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
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword,
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
  ],
});

router.beforeEach(authGuard);

export default router;
