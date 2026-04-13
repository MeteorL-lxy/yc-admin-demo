<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="dashboard-page-heading">
    <div>
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="dashboard-subtitle">{{ subtitle }}</p>
    </div>

    <div v-if="$slots.actions" class="dashboard-page-heading__actions">
      <slot name="actions" />
    </div>
  </section>
</template>

<style scoped lang="less">
.dashboard-page-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.dashboard-page-heading__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dashboard-subtitle {
  margin: 10px 0 0;
  max-width: 780px;
  color: var(--text-body);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .dashboard-page-heading {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
