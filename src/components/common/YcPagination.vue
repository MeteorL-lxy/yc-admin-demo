<script setup lang="ts">
withDefaults(defineProps<{
  current: number;
  total: number;
  pageSize?: number;
}>(), {
  pageSize: 10
});

const emit = defineEmits<{
  'update:current': [page: number];
}>();
</script>

<template>
  <div class="yc-pagination">
    <a-pagination
      :current="current"
      :total="total"
      :page-size="pageSize"
      show-total
      @change="(page: number) => emit('update:current', page)"
    />
  </div>
</template>
