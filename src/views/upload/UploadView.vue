<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IconArrowLeft, IconPlus } from '@arco-design/web-vue/es/icon';

const router = useRouter();
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
      <div class="empty-state-card__icon">＋</div>
      <h1 class="page-title">上传作品</h1>
      <p class="body-text">这里已经接通到上传入口路由，后续可以继续扩展小说/短剧的创建流程。</p>
      <a-button type="primary" class="yc-large-button">
        <IconPlus />
        新建作品草稿
      </a-button>
    </div>
  </section>
</template>
