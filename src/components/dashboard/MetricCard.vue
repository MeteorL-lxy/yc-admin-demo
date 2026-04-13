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

<style scoped lang="less">
.metric-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-card);
  background: linear-gradient(180deg, rgba(24, 24, 24, 0.96), rgba(18, 18, 18, 0.96));
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: var(--shadow-soft);
}

.metric-card--blue {
  background: linear-gradient(180deg, rgba(16, 29, 42, 0.96), rgba(18, 18, 18, 0.96));
}

.metric-card--pink {
  background: linear-gradient(180deg, rgba(42, 18, 34, 0.96), rgba(18, 18, 18, 0.96));
}

.metric-card__label {
  color: var(--text-secondary);
  font-size: 13px;
}

.metric-card__value {
  font-size: 28px;
  line-height: 1.1;
}

.metric-card__meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-card__helper {
  color: var(--text-body);
  font-size: 13px;
  line-height: 1.5;
}

.metric-card__badge {
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.metric-card__badge--up {
  color: #7ef7b1;
  background: rgba(126, 247, 177, 0.12);
}

.metric-card__badge--down {
  color: #ff9c8f;
  background: rgba(255, 156, 143, 0.12);
}

.metric-card__badge--flat {
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.08);
}
</style>
