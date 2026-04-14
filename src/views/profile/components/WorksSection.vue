<script setup lang="ts">
import { IconPlus, IconRefresh } from '@arco-design/web-vue/es/icon';

import WorkCard from './WorkCard.vue';
import { useLocale } from '@/composables/useLocale';
import { PROFILE_FILTER_OPTIONS } from '@/constants/profile';
import type { WorkFilter, WorkItem } from '@/types/profile';

const props = defineProps<{
  activeFilter: WorkFilter;
  works: WorkItem[];
  loading: boolean;
  error: string;
  empty: boolean;
}>();

const emit = defineEmits<{
  'update:filter': [value: WorkFilter];
  retry: [];
  upload: [];
  openWork: [item: WorkItem];
}>();

const { t } = useLocale();
</script>

<template>
  <section class="content-section">
    <div class="section-header">
      <div>
        <p class="description">{{ t('profile.works.workspace') }}</p>
        <h2 class="section-title">{{ t('profile.works.title') }}</h2>
      </div>

      <div class="section-actions">
        <div class="tab-group">
          <button
            v-for="item in PROFILE_FILTER_OPTIONS"
            :key="item.key"
            type="button"
            class="tab-button"
            :class="{ 'tab-button--active': props.activeFilter === item.key }"
            @click="emit('update:filter', item.key)"
          >
            {{ t(item.labelKey) }}
          </button>
        </div>

        <a-button type="primary" class="yc-small-button" @click="emit('upload')">
          <IconPlus />
          {{ t('profile.works.upload') }}
        </a-button>
      </div>
    </div>

    <div v-if="props.loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('profile.works.loading') }}</p>
    </div>

    <div v-else-if="props.error" class="error-panel yc-panel">
      <h3 class="card-title">{{ t('profile.works.loadError') }}</h3>
      <p class="body-text">{{ props.error }}</p>
      <a-button class="yc-secondary-button" @click="emit('retry')">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <div v-else-if="props.empty" class="empty-state-card">
      <div class="empty-state-card__icon">✦</div>
      <h3 class="card-title">{{ t('profile.works.emptyTitle') }}</h3>
      <p class="body-text">{{ t('profile.works.emptyDescription') }}</p>
      <a-button type="primary" class="yc-small-button" @click="emit('upload')">
        <IconPlus />
        {{ t('profile.works.create') }}
      </a-button>
    </div>

    <div v-else class="works-grid">
      <div
        v-for="item in props.works"
        :key="item.id"
        class="works-grid__item"
        @click="emit('openWork', item)"
      >
        <WorkCard :item="item" />
      </div>
    </div>
  </section>
</template>
