<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>

<template>
  <div class="yc-app">
    <AppSidebar />
    <main class="page-shell">
      <router-view />
    </main>
  </div>
</template>
