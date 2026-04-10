import { translate } from '@/composables/useLocale';
import { createAnalyticsDashboard } from '@/mocks/analytics';
import type { AnalyticsDashboard, AnalyticsRange } from '@/types/analytics';

const delay = (ms = 260) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAnalyticsDashboard(range: AnalyticsRange, workId: string): Promise<AnalyticsDashboard> {
  await delay();
  return createAnalyticsDashboard(range, workId);
}

export async function generateAnalyticsDiagnosis(range: AnalyticsRange, workId: string): Promise<string[]> {
  await delay(480);

  const dashboard = createAnalyticsDashboard(range, workId);

  return [
    translate('service.analytics.diagnosisTopSignal', { summary: dashboard.insight.summary }),
    translate('service.analytics.diagnosisLoyalty'),
    translate('service.analytics.diagnosisAction', { action: dashboard.insight.nextAction })
  ];
}
