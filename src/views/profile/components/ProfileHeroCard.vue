<script setup lang="ts">
import type { CreatorProfile } from '@/types/profile';

defineProps<{
  profile: CreatorProfile;
}>();

defineEmits<{
  edit: [];
}>();
</script>

<template>
  <section class="profile-hero">
    <div class="profile-hero__backdrop">
      <img :src="profile.background" alt="背景图" class="profile-hero__image" />
      <div class="profile-hero__overlay" />
      <div class="profile-hero__fade" />
    </div>

    <div class="profile-hero__content yc-card">
      <div class="profile-hero__identity">
        <div class="avatar-shell avatar-shell--xl">
          <a-avatar :size="100" class="yc-avatar" :image-url="profile.circleAvatar || profile.avatar">
            {{ profile.nickname.slice(0, 1).toUpperCase() }}
          </a-avatar>
        </div>

        <div class="profile-hero__meta">
          <div class="hero-heading-row">
            <div>
              <h1 class="page-title">{{ profile.nickname }}</h1>
              <p class="body-text hero-copy">{{ profile.signature }}</p>
            </div>

            <div class="hero-actions">
              <a-tag class="yc-gradient-tag">Novel</a-tag>
              <a-button type="primary" class="yc-small-button" @click="$emit('edit')">
                编辑资料
              </a-button>
            </div>
          </div>

          <div class="hero-info-line">
            <span>{{ profile.email }}</span>
            <span>{{ profile.phone }}</span>
            <span>邀请码 {{ profile.inviteCode }}</span>
          </div>

          <div class="hero-stats">
            <div v-for="item in profile.stats" :key="item.label" class="hero-stat">
              <span class="hero-stat__label">{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
