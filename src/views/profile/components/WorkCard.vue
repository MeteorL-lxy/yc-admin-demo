<script setup lang="ts">
import { computed } from 'vue';

import { useLocale } from '@/composables/useLocale';
import type { WorkItem } from '@/types/profile';

const props = defineProps<{
  item: WorkItem;
}>();

const { t } = useLocale();

const statusLabel = computed(() => (props.item.status === 'published' ? t('profile.workCard.status.published') : t('profile.workCard.status.draft')));
const categoryLabel = computed(() => (props.item.category === 'novel' ? t('profile.workCard.category.novel') : t('profile.workCard.category.drama')));
</script>

<template>
  <a-card class="work-card" :bordered="false" hoverable>
    <div class="work-card__cover">
      <img :src="item.cover" :alt="item.title" />
      <div class="work-card__cover-overlay" />
      <span class="work-card__badge">{{ item.badge }}</span>
      <a-tag
        size="small"
        class="work-card__status yc-status-tag"
        :class="item.status === 'published' ? 'yc-status-tag--published' : 'yc-status-tag--draft'"
      >
        {{ statusLabel }}
      </a-tag>
    </div>

    <div class="work-card__body">
      <div class="work-card__title-row">
        <h3 class="card-title">{{ item.title }}</h3>
        <span class="tag-chip">{{ categoryLabel }}</span>
      </div>
      <p class="body-text work-card__desc">{{ item.description }}</p>

      <div class="work-card__meta">
        <span>{{ item.episodes }} {{ item.category === 'novel' ? t('profile.workCard.novelEpisodeUnit') : t('profile.workCard.dramaEpisodeUnit') }}</span>
        <span v-if="item.words">{{ item.words.toLocaleString() }} {{ t('profile.workCard.wordUnit') }}</span>
      </div>

      <div class="work-card__metrics">
        <span>{{ item.views }} {{ t('profile.workCard.viewsUnit') }}</span>
        <span>{{ item.collects }} {{ t('profile.workCard.collectsUnit') }}</span>
        <span v-if="item.score">★ {{ item.score.toFixed(1) }}</span>
      </div>
    </div>
  </a-card>
</template>
