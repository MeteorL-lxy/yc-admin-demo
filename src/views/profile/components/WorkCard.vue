<script setup lang="ts">
import { computed } from 'vue';
import type { WorkItem } from '@/types/profile';

const props = defineProps<{
  item: WorkItem;
}>();

const statusLabel = computed(() => (props.item.status === 'published' ? '已发布' : '草稿'));
const categoryLabel = computed(() => (props.item.category === 'novel' ? '小说' : '短剧'));
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
        <span>{{ item.episodes }} {{ item.category === 'novel' ? '章' : '集' }}</span>
        <span v-if="item.words">{{ item.words.toLocaleString() }} 字</span>
      </div>

      <div class="work-card__metrics">
        <span>{{ item.views }} 浏览</span>
        <span>{{ item.collects }} 收藏</span>
        <span v-if="item.score">★ {{ item.score.toFixed(1) }}</span>
      </div>
    </div>
  </a-card>
</template>
