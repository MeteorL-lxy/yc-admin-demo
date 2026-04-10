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
