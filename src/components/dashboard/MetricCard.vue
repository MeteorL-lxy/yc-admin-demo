<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    value: string;
    helper: string;
    change?: string;
    trend?: 'up' | 'down' | 'flat';
    accent?: 'primary' | 'blue' | 'pink';
  }>(),
  {
    change: '',
    trend: 'flat',
    accent: 'primary'
  }
);

const badgeClass = computed(() => `metric-card__badge metric-card__badge--${props.trend}`);
const accentClass = computed(() => `metric-card metric-card--${props.accent}`);
</script>

<template>
  <article :class="accentClass">
    <span class="metric-card__label">{{ label }}</span>
    <strong class="metric-card__value">{{ value }}</strong>
    <div class="metric-card__meta">
      <span v-if="change" :class="badgeClass">{{ change }}</span>
      <span class="metric-card__helper">{{ helper }}</span>
    </div>
  </article>
</template>
