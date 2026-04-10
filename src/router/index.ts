import { createRouter, createWebHistory } from 'vue-router';

import CreatorLayout from '@/layouts/CreatorLayout.vue';
import AnalyticsView from '@/views/analytics/AnalyticsView.vue';
import ProfileView from '@/views/profile/ProfileView.vue';
import RevenueDetailView from '@/views/revenue/RevenueDetailView.vue';
import RevenueView from '@/views/revenue/RevenueView.vue';
import SeriesDetailView from '@/views/series/SeriesDetailView.vue';
import SettingsView from '@/views/settings/SettingsView.vue';
import UploadView from '@/views/upload/UploadView.vue';
import PaymentManagementView from '@/views/wallet/PaymentManagementView.vue';
import WalletView from '@/views/wallet/WalletView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/profile'
    },
    {
      path: '/',
      component: CreatorLayout,
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: AnalyticsView
        },
        {
          path: 'revenue',
          name: 'revenue',
          component: RevenueView
        },
        {
          path: 'revenue-detail',
          name: 'revenue-detail',
          component: RevenueDetailView
        },
        {
          path: 'wallet',
          name: 'wallet',
          component: WalletView
        },
        {
          path: 'payment-management',
          name: 'payment-management',
          component: PaymentManagementView
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView
        },
        {
          path: 'upload',
          name: 'upload',
          component: UploadView
        },
        {
          path: 'series/:id',
          name: 'series-detail',
          component: SeriesDetailView
        }
      ]
    }
  ]
});

export default router;
