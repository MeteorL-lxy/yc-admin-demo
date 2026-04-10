import { reactive, ref } from 'vue';

import { fetchRevenueDetailRows, getDefaultRevenueFilters } from '@/services/revenue.service';
import type { RevenueDetailRow, RevenueFilters } from '@/types/revenue';

export function useRevenueDetailPage() {
  const filters = reactive<RevenueFilters>(getDefaultRevenueFilters());
  const rows = ref<RevenueDetailRow[]>([]);
  const loading = ref(false);
  const error = ref('');

  const loadRows = async () => {
    loading.value = true;
    error.value = '';

    try {
      rows.value = await fetchRevenueDetailRows({ ...filters });
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : 'Failed to load revenue details.';
    } finally {
      loading.value = false;
    }
  };

  const resetFilters = async () => {
    Object.assign(filters, getDefaultRevenueFilters());
    await loadRows();
  };

  return {
    filters,
    rows,
    loading,
    error,
    loadRows,
    resetFilters
  };
}
