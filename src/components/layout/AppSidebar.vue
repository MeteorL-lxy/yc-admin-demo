<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconApps, IconBarChart, IconSettings, IconStorage, IconUser } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';

interface NavItem {
  key: string;
  path: string;
  icon: object;
  matchPaths: string[];
}

const route = useRoute();
const router = useRouter();
const { t } = useLocale();

const items: NavItem[] = [
  { key: 'profile', path: '/profile', icon: IconUser, matchPaths: ['/profile', '/upload', '/series'] },
  { key: 'analytics', path: '/analytics', icon: IconApps, matchPaths: ['/analytics'] },
  { key: 'revenue', path: '/revenue', icon: IconBarChart, matchPaths: ['/revenue', '/revenue-detail'] },
  { key: 'wallet', path: '/wallet', icon: IconStorage, matchPaths: ['/wallet', '/payment-management'] },
  { key: 'settings', path: '/settings', icon: IconSettings, matchPaths: ['/settings'] }
];

const activeKey = computed(() => items.find((item) => item.matchPaths.some((path) => route.path.startsWith(path)))?.key ?? 'profile');
</script>

<template>
  <aside class="app-sidebar">
    <div class="brand-block">
      <div class="brand-mark">YC</div>
      <div>
        <p class="brand-title">YC Creator</p>
        <p class="brand-subtitle">Dark story workspace</p>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in items"
        :key="item.key"
        :to="item.path"
        class="nav-item"
        :class="{ 'nav-item--active': activeKey === item.key }"
      >
        <component :is="item.icon" />
        <span>{{ t(`sidebar.${item.key}`) }}</span>
      </router-link>
    </nav>

    <div class="sidebar-promo">
      <p class="sidebar-promo__eyebrow">Creator Pass</p>
      <h3>{{ t('sidebar.promoTitle') }}</h3>
      <p>{{ t('sidebar.promoDesc') }}</p>
      <a-button type="primary" shape="round" class="yc-large-button" @click="router.push('/analytics')">{{ t('sidebar.promoAction') }}</a-button>
    </div>
  </aside>
</template>
