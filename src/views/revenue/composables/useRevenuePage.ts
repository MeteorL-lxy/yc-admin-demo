import { reactive, ref } from 'vue';

import { fetchRevenueDashboard, getDefaultRevenueFilters } from '@/services/revenue.service';
import type { RevenueDashboard, RevenueFilters } from '@/types/revenue';

export function useRevenuePage() {
  const filters = reactive<RevenueFilters>(getDefaultRevenueFilters());
  const dashboard = ref<RevenueDashboard | null>(null);
  const loading = ref(false);
  const error = ref('');

  const loadDashboard = async () => {
    loading.value = true;
    error.value = '';

    try {
      dashboard.value = await fetchRevenueDashboard({ ...filters });
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : 'Failed to load revenue dashboard.';
    } finally {
      loading.value = false;
    }
  };

  const resetFilters = async () => {
    Object.assign(filters, getDefaultRevenueFilters());
    await loadDashboard();
  };

  return {
    filters,
    dashboard,
    loading,
    error,
    loadDashboard,
    resetFilters
  };
}
