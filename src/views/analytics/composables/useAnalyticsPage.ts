import { computed, ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';

import { useLocale } from '@/composables/useLocale';
import { fetchAnalyticsDashboard, generateAnalyticsDiagnosis } from '@/services/analytics.service';
import type { AnalyticsDashboard, AnalyticsRange, AnalyticsTab } from '@/types/analytics';

export function useAnalyticsPage() {
  const { t } = useLocale();
  const dashboard = ref<AnalyticsDashboard | null>(null);
  const loading = ref(false);
  const error = ref('');
  const activeRange = ref<AnalyticsRange>('28d');
  const activeWork = ref('all');
  const activeTab = ref<AnalyticsTab>('overview');
  const diagnosisVisible = ref(false);
  const diagnosisLoading = ref(false);
  const diagnosisResult = ref<string[]>([]);

  const isEmpty = computed(() => !loading.value && !error.value && dashboard.value?.recentActivity.length === 0);

  const loadDashboard = async () => {
    loading.value = true;
    error.value = '';

    try {
      dashboard.value = await fetchAnalyticsDashboard(activeRange.value, activeWork.value);
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : t('analytics.loadError');
    } finally {
      loading.value = false;
    }
  };

  const openDiagnosis = async () => {
    diagnosisVisible.value = true;
    diagnosisLoading.value = true;

    try {
      diagnosisResult.value = await generateAnalyticsDiagnosis(activeRange.value, activeWork.value);
    } catch (fetchError) {
      Message.error(fetchError instanceof Error ? fetchError.message : t('analytics.aiTitle'));
    } finally {
      diagnosisLoading.value = false;
    }
  };

  watch([activeRange, activeWork], () => {
    void loadDashboard();
  });

  return {
    dashboard,
    loading,
    error,
    activeRange,
    activeWork,
    activeTab,
    diagnosisVisible,
    diagnosisLoading,
    diagnosisResult,
    isEmpty,
    loadDashboard,
    openDiagnosis
  };
}
