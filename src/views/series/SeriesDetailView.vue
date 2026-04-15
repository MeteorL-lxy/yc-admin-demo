<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconArrowLeft, IconRefresh } from '@arco-design/web-vue/es/icon';

import { useLocale } from '@/composables/useLocale';
import { fetchWork } from '@/services/work.service';
import type { WorkItem } from '@/types/profile';

const route = useRoute();
const router = useRouter();
const { t } = useLocale();

const work = ref<WorkItem | null>(null);
const loading = ref(false);
const error = ref('');

const loadWork = async () => {
  const id = String(route.params.id ?? '');
  if (!id) {
    error.value = t('series.notFound');
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    work.value = await fetchWork(id);
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('series.loadError');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  void loadWork();
});
</script>

<template>
  <div class="series-detail">
    <div class="series-detail__back">
      <a-button class="yc-secondary-button" @click="router.push('/profile')">
        <IconArrowLeft />
        {{ t('series.backToProfile') }}
      </a-button>
    </div>

    <div v-if="loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">{{ t('series.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-panel yc-panel">
      <h2 class="section-title">{{ t('series.loadError') }}</h2>
      <p class="body-text">{{ error }}</p>
      <a-button class="yc-secondary-button" @click="loadWork">
        <IconRefresh />
        {{ t('common.retry') }}
      </a-button>
    </div>

    <template v-else-if="work">
      <div class="series-hero">
        <div class="series-hero__backdrop">
          <img :src="work.cover" :alt="work.title" class="series-hero__image" />
          <div class="series-hero__overlay" />
          <div class="series-hero__fade" />
        </div>

        <div class="series-hero__content">
          <div class="series-hero__tags">
            <a-tag class="yc-gradient-tag">{{ work.badge }}</a-tag>
            <a-tag
              :class="[
                'yc-status-tag',
                work.status === 'published' ? 'yc-status-tag--published' : 'yc-status-tag--draft'
              ]"
            >
              {{ work.status === 'published' ? t('series.statusPublished') : t('series.statusDraft') }}
            </a-tag>
            <a-tag class="yc-outline-tag">
              {{ work.category === 'novel' ? t('series.categoryNovel') : t('series.categoryDrama') }}
            </a-tag>
          </div>

          <h1 class="page-title series-hero__title">{{ work.title }}</h1>
        </div>
      </div>

      <div class="series-stats yc-panel">
        <div class="series-stats__item">
          <strong>{{ work.episodes }}</strong>
          <span class="series-stats__label">
            {{ work.category === 'novel' ? t('series.novelEpisodeUnit') : t('series.dramaEpisodeUnit') }}
          </span>
        </div>
        <div v-if="work.words" class="series-stats__item">
          <strong>{{ work.words?.toLocaleString() }}</strong>
          <span class="series-stats__label">{{ t('series.wordUnit') }}</span>
        </div>
        <div class="series-stats__item">
          <strong>{{ work.views }}</strong>
          <span class="series-stats__label">{{ t('series.viewsUnit') }}</span>
        </div>
        <div class="series-stats__item">
          <strong>{{ work.collects }}</strong>
          <span class="series-stats__label">{{ t('series.collectsUnit') }}</span>
        </div>
        <div v-if="work.score" class="series-stats__item">
          <strong>{{ work.score }}</strong>
          <span class="series-stats__label">{{ t('series.score') }}</span>
        </div>
      </div>

      <div class="series-body yc-panel">
        <h2 class="card-title">{{ t('series.description') }}</h2>
        <p class="body-text series-body__desc">{{ work.description }}</p>
      </div>
    </template>
  </div>
</template>
