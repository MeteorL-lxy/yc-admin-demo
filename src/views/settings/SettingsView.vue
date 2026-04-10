<script setup lang="ts">
import { onMounted } from 'vue';
import { IconRefresh } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';
import PageHeading from '@/components/dashboard/PageHeading.vue';
import { useSettingsPage } from './composables/useSettingsPage';

const { t } = useLocale();
const { snapshot, loading, error, activeTab, loadSettings, changeLanguage, toggleAccountSetting } = useSettingsPage();

onMounted(() => {
  void loadSettings();
});
</script>

<template>
  <div class="dashboard-view">
    <PageHeading :title="t('settings.title')" :subtitle="t('settings.subtitle')" />

    <div v-if="loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('settings.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('settings.loadError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadSettings">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <a-tabs v-else-if="snapshot" v-model:active-key="activeTab" class="dashboard-tabs">
      <a-tab-pane key="basic" :title="t('settings.basic')">
        <section class="settings-language-grid">
          <article
            v-for="option in snapshot.languageOptions"
            :key="option.code"
            class="language-option-card"
            :class="{ 'language-option-card--active': snapshot.language === option.code }"
            @click="changeLanguage(option.code)"
          >
            <div class="language-option-card__icon">{{ option.code.toUpperCase() }}</div>
            <div>
              <h3 class="card-title">{{ option.label }}</h3>
              <p class="description">{{ option.subtitle }}</p>
            </div>
          </article>
        </section>
      </a-tab-pane>

      <a-tab-pane key="account" :title="t('settings.account')">
        <section class="settings-toggle-list">
          <article v-for="item in snapshot.accountSettings" :key="item.id" class="yc-panel account-setting-card">
            <div>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="description">{{ item.description }}</p>
            </div>
            <a-switch :model-value="item.enabled" @change="toggleAccountSetting(item.id, Boolean($event))" />
          </article>
        </section>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
