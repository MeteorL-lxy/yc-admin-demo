<script setup lang="ts">
import { IconPlus, IconRefresh } from '@arco-design/web-vue/es/icon';

import WorkCard from './WorkCard.vue';
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
</script>

<template>
  <section class="content-section">
    <div class="section-header">
      <div>
        <p class="description">Creator workspace</p>
        <h2 class="section-title">我的作品</h2>
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
            {{ item.label }}
          </button>
        </div>

        <a-button type="primary" class="yc-small-button" @click="emit('upload')">
          <IconPlus />
          上传作品
        </a-button>
      </div>
    </div>

    <div v-if="props.loading" class="loading-panel yc-panel">
      <a-spin :size="32" />
      <p class="description">正在加载作品数据...</p>
    </div>

    <div v-else-if="props.error" class="error-panel yc-panel">
      <h3 class="card-title">作品加载失败</h3>
      <p class="body-text">{{ props.error }}</p>
      <a-button class="yc-secondary-button" @click="emit('retry')">
        <IconRefresh />
        重试
      </a-button>
    </div>

    <div v-else-if="props.empty" class="empty-state-card">
      <div class="empty-state-card__icon">✦</div>
      <h3 class="card-title">还没有作品</h3>
      <p class="body-text">先创建一个新作品，把这个主页填满成完整的创作者门面。</p>
      <a-button type="primary" class="yc-small-button" @click="emit('upload')">
        <IconPlus />
        创建作品
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
