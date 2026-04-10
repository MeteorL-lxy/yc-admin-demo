<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IconArrowLeft } from '@arco-design/web-vue/es/icon';

const route = useRoute();
const router = useRouter();

const workId = computed(() => String(route.params.id ?? ''));
</script>

<template>
  <section class="placeholder-page yc-panel">
    <div class="placeholder-page__actions">
      <a-button class="yc-secondary-button" @click="router.push('/profile')">
        <IconArrowLeft />
        返回主页
      </a-button>
    </div>

    <div class="placeholder-page__content">
      <div class="empty-state-card__icon">✦</div>
      <h1 class="page-title">作品详情占位页</h1>
      <p class="body-text">已接通 `/series/:id` 路由，当前作品 ID 为 {{ workId }}。</p>
    </div>
  </section>
</template>
